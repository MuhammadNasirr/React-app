import {
    ADD_MARKETS_FETCH,
    EDIT_MARKETS_FETCH,
    GET_MARKETS_DETAILS_FETCH,
    GET_MARKETS_DETAILS_SUCCESS,
} from '../../constants';
import { MarketsDetailsAction } from './actions';

export interface MarketsDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    marketAdded: boolean;
    marketEdited: boolean;
}

export const initialMarketsDetailsState: MarketsDetailsState = {
    data: {},
    loading: true,
    marketAdded: false,
    marketEdited: false
};

export const marketDetailsReducer = (state = initialMarketsDetailsState, action: MarketsDetailsAction) => {
    switch (action.type) {
        case GET_MARKETS_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_MARKETS_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ADD_MARKETS_FETCH:
            return {
                ...state,
                marketAdded: true
            };
        case EDIT_MARKETS_FETCH:
            return {
                ...state,
                marketEdited: true
            };
        default:
            return {
                ...state,
            };
    }
};
