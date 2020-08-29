import * as actions from './actions';
import { initialMemberDataState, memberDataReducer } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
        id: 1,
        uid: '',
        state: '',
        role: '',
        level: 1,
        created_at: '',
        updated_at: '',
        accounts: [],
        email: ''
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialMemberDataState,
        };
        const payload = {
            uid: ''
        };
        expect(memberDataReducer(initialMemberDataState, actions.getMemberData(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.MemberDataSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialMemberDataState,
            loading: false
        };
        expect(memberDataReducer(initialMemberDataState, actions.memberDataData(payload))).toEqual(expectedState);
    });
});
