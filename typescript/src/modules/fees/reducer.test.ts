import * as actions from './actions';
import { feesReducer, initialFeesState } from './reducer';

describe('Fees reducer', () => {
    const feesData = [
        {
            id: 1,
            group: '',
            market_id: '',
            maker: '',
            taker: '',
            created_at: '',
            updated_at: ''
        }
    ];
    it('should handle GET_FEES_FETCH', () => {
        const expectedState = {
            ...initialFeesState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(feesReducer(initialFeesState, actions.getFees(payload))).toEqual(expectedState);
    });

    it('should handle GET_FEES_SUCCESS', () => {
        const payload: actions.FeesSuccessPayload = {
            list: feesData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialFeesState,
            loading: false
        };
        expect(feesReducer(initialFeesState, actions.getFeesSuccess(payload))).toEqual(expectedState);
    });
});
