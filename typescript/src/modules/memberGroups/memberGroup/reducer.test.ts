import * as actions from './actions';
import { initialMemberGroupState, memberGroupReducer } from './reducer';

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
            ...initialMemberGroupState,
        };
        expect(memberGroupReducer(initialMemberGroupState, actions.getMemberGroup())).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.MemberGroupSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialMemberGroupState,
            loading: false
        };
        expect(memberGroupReducer(initialMemberGroupState, actions.memberGroupData(payload))).toEqual(expectedState);
    });
});
