import * as actions from './actions';
import { blockchainsReducer, initialBlockchainsState } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            id: 0,
            key: '',
            name: '',
            client: '',
            server: '',
            height: 0,
            explorer_address: '',
            explorer_transaction: '',
            min_confirmations: '',
            status: '',
            created_at: '',
            updated_at: '',
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialBlockchainsState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(blockchainsReducer(initialBlockchainsState, actions.getBlockchains(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.BlockchainsSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialBlockchainsState,
            loading: false
        };
        expect(blockchainsReducer(initialBlockchainsState, actions.blockchainsData(payload))).toEqual(expectedState);
    });
});
