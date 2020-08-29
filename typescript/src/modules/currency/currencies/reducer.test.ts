import * as actions from './actions';
import { currenciesReducer, initialCurrenciesState } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            name: '',
            symbol: '',
            type: '',
            deposit_enabled: false,
            withdrawal_enabled: false,
            deposit_fee: '',
            min_deposit_amount: '',
            withdraw_fee: '',
            min_withdraw_amount: '',
            withdraw_limit_24h: '',
            withdraw_limit_72h: '',
            base_factor: 1,
            precision: 1,
            icon_url: '',
            min_confirmations: 0,
            code: '',
            blockchain_key: '',
            min_collection_amount: '',
            position: 0,
            visible: false,
            subunits: 0,
            options: '',
            created_at: '',
            updated_at: '',
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialCurrenciesState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(currenciesReducer(initialCurrenciesState, actions.getCurrencies(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.CurrenciesSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialCurrenciesState,
            loading: false
        };
        expect(currenciesReducer(initialCurrenciesState, actions.currenciesData(payload))).toEqual(expectedState);
    });
});
