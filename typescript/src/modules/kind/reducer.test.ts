import * as actions from './actions';
import { initialKindState, kindReducer } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialKindState,
        };
        expect(kindReducer(initialKindState, actions.getKind())).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        // tslint:disable-next-line:no-any
        const payload: any = {
            list: assetsData,
        };
        const expectedState = {
            ...initialKindState,
            loading: false
        };
        expect(kindReducer(initialKindState, actions.kindData(payload))).toEqual(expectedState);
    });
});
