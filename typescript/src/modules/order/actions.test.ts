import {
    CANCEL_ORDERS_FETCH,
    GET_ORDERS_FETCH,
    GET_ORDERS_SUCCESS,
} from '../constants';
import * as actions from './actions';

describe('Open Orders actions', () => {
    it('should check getOpenOrders action creator', () => {
        const payload = {
            page: 1,
            limit: 25,
            state: 'wait',
            ordering: 'desc',
            uid: 'ID9082C6B12D'
        };
        const expectedAction = { type: GET_ORDERS_FETCH, payload };
        expect(actions.getOrders(payload)).toEqual(expectedAction);
    });

    it('should check openOrdersData action creator', () => {
        const payload = { list: [], page: 2, total: 0 };
        const expectedAction = { type: GET_ORDERS_SUCCESS, payload };
        expect(actions.ordersData(payload)).toEqual(expectedAction);
    });

    it('should check cancelOpenOrdersData action creator', () => {
        const payload = { id: 0, uid: '123' };
        const expectedAction = { type: CANCEL_ORDERS_FETCH, payload };
        expect(actions.cancelOrders(payload)).toEqual(expectedAction);
    });
});
