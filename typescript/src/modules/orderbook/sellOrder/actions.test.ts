import {
    CANCEL_ORDERS_FETCH,
    GET_ORDERS_FETCH,
    GET_ORDERS_SUCCESS,
} from '../../constants';
import * as actions from './actions';

describe('Open Orders actions', () => {
    it('should check getOpenOrders action creator', () => {
        const payload = {
            page: 1,
            limit: 25,
            state: 'wait',
            market: 'ethbtc',
            type: 'buy',
            order_by: 'price',
            ordering: 'desc',
        };
        const expectedAction = { type: GET_ORDERS_FETCH, payload };
        expect(actions.getSellOrders(payload)).toEqual(expectedAction);
    });

    it('should check openOrdersData action creator', () => {
        const payload = { list: [], page: 2, total: 0 };
        const expectedAction = { type: GET_ORDERS_SUCCESS, payload };
        expect(actions.sellOrdersData(payload)).toEqual(expectedAction);
    });

    it('should check cancelOpenOrdersData action creator', () => {
        const payload = { id: 0, market: '' };
        const expectedAction = { type: CANCEL_ORDERS_FETCH, payload };
        expect(actions.cancelSellOrder(payload)).toEqual(expectedAction);
    });
});
