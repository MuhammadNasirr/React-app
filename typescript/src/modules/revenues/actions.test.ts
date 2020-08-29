import * as actions from './actions';

describe('Trade actions', () => {
    it('should check getTrades action creator', () => {
        const payload = {
            page: 0,
            limit: 10
        };
        const expectedAction = { type: 'GET_TRADES_FETCH', payload };
        expect(actions.getRevenues(payload)).toEqual(expectedAction);
    });

    it('should check getTrades action creator', () => {
        const payload = {
            list: [],
            page: 1,
            total: 0
        };
        const expectedAction = { type: 'GET_TRADES_SUCCESS', payload };
        expect(actions.revenuesData(payload)).toEqual(expectedAction);
    });
});
