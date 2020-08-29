import * as actions from './actions';
import {
    initialSellOrderState,
    sellOrdersReducer,
} from './reducer';

describe('AdminActivity reducer', () => {
    const openOrdersyData = [
        {
            id: 3,
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

    it('should handle ADMIN_ACTIVITY_FETCH', () => {
        const expectedState = {
            ...initialSellOrderState,
            loading: true,
        };
        const payload = { page: 1, limit: 25, state: 'wait', type: '', market: '', order_by: '', ordering: '' };
        expect(sellOrdersReducer(initialSellOrderState, actions.getSellOrders(payload))).toEqual(expectedState);
    });

    it('should handle ADMIN_ACTIVITY_DATA', () => {
        const payload: actions.SellOrderSuccessPayload = {
            list: openOrdersyData,
            page: 1,
            total: 2,
        };

        const expectedState = {
            ...initialSellOrderState,
            ...payload,
            loading: false,
        };

        expect(sellOrdersReducer(initialSellOrderState, actions.sellOrdersData(payload))).toEqual(expectedState);
    });
});
