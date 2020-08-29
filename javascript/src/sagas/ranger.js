import { delay, eventChannel } from 'redux-saga';
import { all, call, cancel, fork, put, race, select, take, takeEvery } from 'redux-saga/effects';
import { rangerDisconnectData, rangerDisconnectFetch, rangerSubscribeMarket, rangerUnsubscribeMarket, rangerUserOrderUpdate, subscriptionsUpdate } from '../actions/ranger';
import { successDepth, successAllTickers, klinePush } from '../actions/tradeV2';
import { RANGER_CONNECT_DATA, RANGER_CONNECT_FETCH, RANGER_DIRECT_WRITE, RANGER_DISCONNECT_DATA, RANGER_DISCONNECT_FETCH, SET_MARKET, RANGER_USER_ORDER_UPDATE } from '../constants/actions';
import { formatTicker, generateSocketURI, streamsBuilder } from '../utils/helper';
import { userOpenOrdersUpdate, userOrdersHistoryRangerData } from '../actions/tradeV2';
import { alertPush } from '../actions/alert'
import store from '../store';
import { rangerUrl } from '../config'

// const truncatedUrl = host.replace(/(^\w+:|^)\/\//, '');
// const rangerUrl = `wss://${truncatedUrl}/api/v2/ranger`;

const initRanger = ({ withAuth }, market, prevSubs, buffer) => {
    const baseUrl = `${rangerUrl()}/${withAuth ? 'private' : 'public'}`;
    const streams = streamsBuilder(withAuth, prevSubs, market);
    const ws = new WebSocket(generateSocketURI(baseUrl, streams));
    console.log('web socket url', ws.url)
    const channel = eventChannel(emitter => {
        ws.onopen = () => {
            emitter({ type: RANGER_CONNECT_DATA });
            while (buffer.messages.length > 0) {
                const message = buffer.messages.shift();
                ws.send(JSON.stringify(message));
            }
        };
        ws.onerror = error => {
            window.console.log(`WebSocket error ${error}`);
            window.console.dir(error);
        };
        ws.onclose = event => {
            channel.close();
        };
        ws.onmessage = ({ data }) => {
            let payload = {};
            try {
                payload = JSON.parse(data);
            }
            catch (e) {
                window.console.error(`Error parsing : ${e.data}`);
            }
            for (const routingKey in payload) {
                if (payload.hasOwnProperty(routingKey)) {
                    const event = payload[routingKey];
                    const currentMarket = store.getState().tradev2.market
                    const orderBookMatch = routingKey.match(/([^.]*)\.update/);
                    // public
                    if (orderBookMatch) {
                        if (currentMarket && orderBookMatch[1] === currentMarket.id) {
                            emitter(successDepth(event));
                        }
                        return;
                    }
                    // public
                    const klineMatch = String(routingKey).match(/([^.]*)\.kline-(.+)/);
                    if (klineMatch) {
                        // emitter(successKline([event]))
                        emitter(klinePush({
                            marketId: klineMatch[1],
                            kline: event,
                            period: klineMatch[2],
                        }));
                        return;
                    }
                    // public
                    const tradesMatch = String(routingKey).match(/([^.]*)\.trades/);
                    if (tradesMatch) {
                        // emitter(recentTradesPush({
                        //     trades: event.trades,
                        //     market: tradesMatch[1],
                        // }));
                        return;
                    }
                    switch (routingKey) {
                        // public
                        case 'global.tickers':
                            emitter(successAllTickers(formatTicker(event)));
                            return;
                        // public
                        case 'success':
                            switch (event.message) {
                                case 'subscribed':
                                case 'unsubscribed':
                                    emitter(subscriptionsUpdate({ subscriptions: event.streams }));
                                    return;
                                default:
                            }
                            return;
                        // private
                        case 'order':
                            emitter(rangerUserOrderUpdate(event));
                            return;
                        // private
                        case 'trade':
                            // emitter(pushHistoryEmit(event));
                            return;
                        default:
                    }
                    window.console.log(`Unhandeled websocket channel: ${routingKey}`);
                }
            }
        };
        // unsubscribe function
        return () => {
            emitter(rangerDisconnectData());
        };
    });
    return [channel, ws];
};

function* writter(socket, buffer) {
    while (true) {
        const data = yield take(RANGER_DIRECT_WRITE);
        if (socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify(data.payload));
        }
        else {
            buffer.messages.push(data.payload);
        }
    }
}
function* reader(channel) {
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

const switchMarket = () => {
    let previousMarket;
    return function* (action) {
        if (previousMarket && previousMarket.id !== action.payload.id) {
            yield put(rangerUnsubscribeMarket(previousMarket));
        }
        previousMarket = action.payload;
        yield put(rangerSubscribeMarket(action.payload));
    };
};

function* watchDisconnect(socket, channel) {
    yield take(RANGER_DISCONNECT_FETCH);
    socket.close();
}

function* bindSocket(channel, socket, buffer) {
    return yield all([call(reader, channel), call(writter, socket, buffer), call(watchDisconnect, socket, channel)]);
}

function* dispatchCurrentMarketOrderUpdates(action) {
    let market;
    try {
        const state = yield select();
        market = state.tradev2.market
        // market = yield select(selectCurrentMarket);
    }
    catch (error) {
        market = undefined;
    }
    if (market && action.payload.market === market.id) {
        yield put(userOpenOrdersUpdate(action.payload));
        if (action.payload.state === 'done') {
            yield put(alertPush({ message: ['success.order.confirmed'], type: 'success', open: true }));
            yield put(userOrdersHistoryRangerData(action.payload));
        }
    }
}

// function* dispatchOrderHistoryUpdates(action) {
//     yield put(userOrdersHistoryRangerData(action.payload));
// }

function* getSubscriptions() {
    try {
        return yield select().ranger.subscriptions;
        // return yield select(selectSubscriptions);
    }
    catch (error) {
        return [];
    }
}

export function* rangerSaga() {
    let initialized = false;
    let connectFetchPayload;
    const buffer = { messages: [] };
    let pipes;
    yield takeEvery(SET_MARKET, switchMarket());
    yield takeEvery(RANGER_USER_ORDER_UPDATE, dispatchCurrentMarketOrderUpdates);
    // yield takeEvery(RANGER_USER_ORDER_UPDATE, dispatchOrderHistoryUpdates);

    while (true) {
        const { connectFetch, disconnectData } = yield race({
            connectFetch: take(RANGER_CONNECT_FETCH),
            disconnectData: take(RANGER_DISCONNECT_DATA),
        });
        let market;
        if (connectFetch) {
            if (initialized) {
                yield put(rangerDisconnectFetch());
                yield take(RANGER_DISCONNECT_DATA);
            }
            connectFetchPayload = connectFetch.payload;
        }
        if (disconnectData) {
            yield call(delay, 1000);
        }
        try {
            const state = yield select();
            market = state.tradev2.market && state.tradev2.market;
        }
        catch (error) {
            market = undefined;
        }
        if (connectFetchPayload) {
            const prevSubs = yield getSubscriptions();
            const [channel, socket] = yield call(initRanger, connectFetchPayload, market, prevSubs, buffer);
            initialized = true;
            if (pipes) {
                yield cancel(pipes);
            }
            pipes = yield fork(bindSocket, channel, socket, buffer);
        }
    }
}
