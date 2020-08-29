import * as actions from './actions';

describe('Restriction actions', () => {
    it('should check getRestriction action creator', () => {
        const payload = {
            page: 0,
            limit: 10
        };
        const expectedAction = { type: 'GET_FEES_FETCH', payload };
        expect(actions.getRestrictions(payload)).toEqual(expectedAction);
    });

    it('should check getFees action creator', () => {
        const payload = {
            list: [],
            page: 1,
            total: 0
        };
        const expectedAction = { type: 'GET_FEES_SUCCESS', payload };
        expect(actions.getRestrictionSuccess(payload)).toEqual(expectedAction);
    });
});
