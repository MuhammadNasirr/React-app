import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            currency: ''
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getCurrenciesDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
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
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.currenciesDetailsData(payload)).toEqual(expectedAction);
    });
});
