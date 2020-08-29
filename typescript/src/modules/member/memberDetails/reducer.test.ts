import * as actions from './actions';
import { initialMemberDetailsState, memberDetailsReducer } from './reducer';

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
            ...initialMemberDetailsState,
        };
        const payload = {
            uid: ''
        };
        expect(memberDetailsReducer(initialMemberDetailsState, actions.getMemberDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.MemberDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialMemberDetailsState,
            loading: false
        };
        expect(memberDetailsReducer(initialMemberDetailsState, actions.memberDetailsData(payload))).toEqual(expectedState);
    });
});
