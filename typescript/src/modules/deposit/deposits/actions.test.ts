import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            page: 0,
            limit: 10
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getDeposits(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            list: [],
            page: 1,
            total: 0
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.depositsData(payload)).toEqual(expectedAction);
    });
});
