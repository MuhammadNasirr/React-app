import * as actions from './actions';
import { gatewayReducer, initialGatewayState } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialGatewayState,
        };
        expect(gatewayReducer(initialGatewayState, actions.getGateway())).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        // tslint:disable-next-line:no-any
        const payload: any = {
            list: assetsData,
        };
        const expectedState = {
            ...initialGatewayState,
            loading: false
        };
        expect(gatewayReducer(initialGatewayState, actions.gatewayData(payload))).toEqual(expectedState);
    });
});
