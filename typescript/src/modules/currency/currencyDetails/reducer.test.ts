import * as actions from './actions';
import { currencyDetailsReducer, initialCurrenciesDetailsState } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
        name: '',
        symbol: '',
        type: '',
        deposit_enabled: false,
        withdrawal_enabled: false,
        deposit_fee: 0,
        min_deposit_amount: 0,
        withdraw_fee: 0,
        min_withdraw_amount: 0,
        withdraw_limit_24h: 0,
        withdraw_limit_72h: 0,
        base_factor: 1,
        precision: 1,
        icon_url: '',
        min_confirmations: 0,
        code: '',
        blockchain_key: '',
        min_collection_amount: 0,
        position: 0,
        visible: false,
        subunits: 0,
        options: '',
        created_at: '',
        updated_at: '',
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialCurrenciesDetailsState,
        };
        const payload = {
            currency: ''
        };
        expect(currencyDetailsReducer(initialCurrenciesDetailsState, actions.getCurrenciesDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.CurrenciesDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialCurrenciesDetailsState,
            loading: false
        };
        expect(currencyDetailsReducer(initialCurrenciesDetailsState, actions.currenciesDetailsData(payload))).toEqual(expectedState);
    });
});
