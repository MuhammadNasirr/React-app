import { DEPTH_DATA, DEPTH_ERROR, DEPTH_FETCH } from '../constants/actions';
// TODO: Move market depth to his own module

export const initialDepth = {
    asks: [],
    bids: [],
    loading: false,
    error: false
};

function depthReducer(state = initialDepth, action) {
    switch (action.type) {
        case DEPTH_FETCH:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case DEPTH_DATA:
            const { asks, bids } = action.payload;
            return {
                ...state,
                asks,
                bids,
                loading: false,
                error: undefined,
            };
        case DEPTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default depthReducer;


