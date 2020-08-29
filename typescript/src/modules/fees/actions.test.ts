import * as actions from './actions';

describe('Permission actions', () => {
    it('should check getFees action creator', () => {
        const payload = {
            page: 0,
            limit: 10
        };
        const expectedAction = { type: 'GET_FEES_FETCH', payload };
        expect(actions.getFees(payload)).toEqual(expectedAction);
    });

    it('should check getFees action creator', () => {
        const payload = {
            list: [],
            page: 1,
            total: 0
        };
        const expectedAction = { type: 'GET_FEES_SUCCESS', payload };
        expect(actions.getFeesSuccess(payload)).toEqual(expectedAction);
    });
});
