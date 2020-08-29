import * as actions from './actions';

describe('Trade actions', () => {
    it('should check getTrades action creator', () => {
        const expectedAction = { type: 'GET_TRADES_FETCH' };
        expect(actions.getGateway()).toEqual(expectedAction);
    });

    it('should check getTrades action creator', () => {
        const payload = {
            list: [],
        };
        const expectedAction = { type: 'GET_TRADES_SUCCESS', payload };
        expect(actions.gatewayData(payload)).toEqual(expectedAction);
    });
});
