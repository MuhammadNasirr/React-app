import * as actions from './actions';
import { clientReducer, initialClientState } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialClientState,
        };
        expect(clientReducer(initialClientState, actions.getClient())).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
    // tslint:disable-next-line:no-any
        const payload: any = {
            list: assetsData,
        };
        const expectedState = {
            ...initialClientState,
            loading: false
        };
        expect(clientReducer(initialClientState, actions.clientData(payload))).toEqual(expectedState);
    });
});
