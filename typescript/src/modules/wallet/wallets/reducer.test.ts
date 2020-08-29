import * as actions from './actions';
import {
    initialWalletsState,
    walletsReducer,
} from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            id: 0,
            name: '',
            kind: '',
            currency: '',
            address: '',
            gateway: '',
            max_balance: '',
            blockchain_key: '',
            settings: {},
            status: '',
            created_at: '',
            updated_at: '',
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialWalletsState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(walletsReducer(initialWalletsState, actions.getWallets(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.WalletsSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialWalletsState,
            loading: false
        };
        expect(walletsReducer(initialWalletsState, actions.walletsData(payload))).toEqual(expectedState);
    });
});
