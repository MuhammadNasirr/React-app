import * as actions from './actions';
import { initialWithdrawalState, withdrawalsReducer } from './reducer';

describe('Withdrawals reducer', () => {
    const withdrawalsData = [
        {
            id: 1,
            currency: 'eth',
            type: 'coin',
            amount: '0.001',
            fee: '0.0',
            blockchain_txid: '0xb7eada44966c7cae24cc88d021ba05193b123a760103952c8744826cb1066518',
            rid: '0x3439ac263b386b3e10f4f9e41fc17f27e102ef46',
            state: 'succeed',
            confirmations: 223876,
            note: 'null',
            created_at: '2019-12-27T13:35:17+01:00',
            updated_at: '2019-12-27T13:35:58+01:00',
            done_at: '2019-12-27T13:35:58+01:00',
            member: 1,
            uid: 'ID5D7EC8D9C4',
            email: 'sunil@bitcoinsfacil.com',
            account: 2,
            block_number: 5687387,
            sum: '0.001',
            tid: 'TID6203E43F2A',
            completed_at: '2019-12-27T13:35:58+01:00'
        }
    ];

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialWithdrawalState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(withdrawalsReducer(initialWithdrawalState, actions.getWithdrawals(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.WithdrawalsSuccessPayload = {
            list: withdrawalsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialWithdrawalState,
            loading: false
        };
        expect(withdrawalsReducer(initialWithdrawalState, actions.WithdrawalsData(payload))).toEqual(expectedState);
    });
});
