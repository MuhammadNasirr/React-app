import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            uid: ''
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getMemberDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
                id: 1,
                uid: '',
                state: '',
                role: '',
                level: 1,
                created_at: '',
                updated_at: '',
                accounts: [],
                email: ''
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.memberDetailsData(payload)).toEqual(expectedAction);
    });
});
