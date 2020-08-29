import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { rootSaga } from '../../../index';
import { buyOrdersData, getBuyOrders } from '../actions';

const debug = false;

describe('Admin activity', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    afterEach(() => {
        mockAxios.reset();
    });

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, debug)();
        sagaMiddleware.run(rootSaga);
    });

    describe('Fetch admin activity data', () => {
        const payload = [
            {
                id: 1,
                side: 'sell',
                ord_type: 'limit',
                price: '8651.45',
                avg_price: '8651.45',
                state: 'wait',
                market: 'btcusd',
                created_at: '2020-01-23T14:50:20+01:00',
                updated_at: '2020-01-23T14:50:30+01:00',
                origin_volume: '0.002',
                remaining_volume: '0.0018',
                executed_volume: '0.0002',
                trades_count: 1,
                email: 'sunil@myce.world',
                uid: 'ID9082C6B12D'
            },
            {
                id: 2,
                side: 'sell',
                ord_type: 'limit',
                price: '8651.45',
                avg_price: '8651.45',
                state: 'wait',
                market: 'btcusd',
                created_at: '2020-01-23T14:50:20+01:00',
                updated_at: '2020-01-23T14:50:30+01:00',
                origin_volume: '0.002',
                remaining_volume: '0.0018',
                executed_volume: '0.0002',
                trades_count: 1,
                email: 'sunil@myce.world',
                uid: 'ID9082C6B12D'
            }
        ];

        const parsedPayload = [
            {
                id: 1,
                side: 'sell',
                ord_type: 'limit',
                price: '8651.45',
                avg_price: '8651.45',
                state: 'wait',
                market: 'btcusd',
                created_at: '2020-01-23T14:50:20+01:00',
                updated_at: '2020-01-23T14:50:30+01:00',
                origin_volume: '0.002',
                remaining_volume: '0.0018',
                executed_volume: '0.0002',
                trades_count: 1,
                email: 'sunil@myce.world',
                uid: 'ID9082C6B12D'
            },
            {
                id: 2,
                side: 'sell',
                ord_type: 'limit',
                price: '8651.45',
                avg_price: '8651.45',
                state: 'wait',
                market: 'btcusd',
                created_at: '2020-01-23T14:50:20+01:00',
                updated_at: '2020-01-23T14:50:30+01:00',
                origin_volume: '0.002',
                remaining_volume: '0.0018',
                executed_volume: '0.0002',
                trades_count: 1,
                email: 'sunil@myce.world',
                uid: 'ID9082C6B12D'
            }
        ];

        const fakeHeaders = { total: 1 };

        const fakeSuccessPayloadFirstPage = { list: parsedPayload, page: 1, total: fakeHeaders.total };
        const fakeFetchPayloadFirstPage = { page: 1, limit: 25, state: 'wait', type: '', market: '', order_by: '', ordering: '' };

        const mockAdminActivityFetch = () => {
            mockAxios.onGet('/admin/activities/admin?page=1&limit=2').reply(200, payload, fakeHeaders);
        };

        const expectedActionsFetchWithFirstPage = [
            getBuyOrders(fakeFetchPayloadFirstPage),
            buyOrdersData(fakeSuccessPayloadFirstPage),
        ];

        it('should fetch user activity for 1 page in success flow', async () => {
            mockAdminActivityFetch();

            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === expectedActionsFetchWithFirstPage.length) {
                        expect(actions).toEqual(expectedActionsFetchWithFirstPage);
                        resolve();
                    }
                });
            });
            store.dispatch(getBuyOrders(fakeFetchPayloadFirstPage));
            return promise;
        });
    });
});
