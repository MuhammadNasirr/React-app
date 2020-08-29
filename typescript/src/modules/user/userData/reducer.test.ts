import * as actions from './actions';
import { initialUserDataState, userDataReducer } from './reducer';

describe('UserData reducer', () => {
    it('should handle GET_USER_DATA_FETCH', () => {
        const expectedState = {
            ...initialUserDataState,
            getUserData: false,
        };
        const payload = {
            uid: '',
        };
        expect(userDataReducer(initialUserDataState, actions.getUserData(payload))).toEqual(expectedState);
    });

    it('should handle GET_USER_DATA_SUCCESS', () => {
        const expectedState = {
            ...initialUserDataState,
            userData: {
                user: {
                    created_at: '',
                    email: '',
                    id: 0,
                    level: 0,
                    otp: false,
                    role: '',
                    state: '',
                    uid: '',
                    updated_at: '',
                },
            },
            getUserData: true,
        };
        const payload = {
            user: {
                created_at: '',
                email: '',
                id: 0,
                level: 0,
                otp: false,
                role: '',
                state: '',
                uid: '',
                updated_at: '',
            },
        };
        expect(userDataReducer(initialUserDataState, actions.getUserDataSuccess(payload))).toEqual(expectedState);
    });
});
