import * as actions from './actions';

describe('UserData actions', () => {
    it('should check getUserData action creator', () => {
        const payload = {
            uid: '',
        };
        const expectedAction = { type: 'GET_USER_DATA_FETCH', payload };
        expect(actions.getUserData(payload)).toEqual(expectedAction);
    });

    it('should check getUserDataSuccess action creator', () => {
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
        const expectedAction = { type: 'GET_USER_DATA_SUCCESS', payload };
        expect(actions.getUserDataSuccess(payload)).toEqual(expectedAction);
    });
});
