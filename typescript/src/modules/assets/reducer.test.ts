import * as actions from './actions';
import { assetsReducer, initialAssetsState } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            id: 0,
            code: 0,
            currency: '',
            credit: '',
            debit: '',
            account_kind: '',
            rid: 0,
            reference_type: '',
            created_at: ''
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialAssetsState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(assetsReducer(initialAssetsState, actions.getAssets(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.AssetsSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialAssetsState,
            loading: false
        };
        expect(assetsReducer(initialAssetsState, actions.assetsData(payload))).toEqual(expectedState);
    });
});
