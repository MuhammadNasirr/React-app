import {
    ACTION_ADJUSTMENT_FETCH,
    ADD_ADJUSTMENT_FETCH,
    GET_ADJUSTMENTS_DETAILS_FETCH,
    GET_ADJUSTMENTS_DETAILS_SUCCESS
} from '../../constants';
import { AdjustmentDetailsAction } from './actions';

export interface AdjustmentDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    actionDone: boolean;
    adjustmentAdded: boolean;
}

export const initialAdjustmentDetailsState: AdjustmentDetailsState = {
    data: {},
    loading: true,
    actionDone: false,
    adjustmentAdded: false
};

export const adjustmentDetailsReducer = (state = initialAdjustmentDetailsState, action: AdjustmentDetailsAction) => {
    switch (action.type) {
        case GET_ADJUSTMENTS_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_ADJUSTMENTS_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ACTION_ADJUSTMENT_FETCH:
            return {
                ...state,
                actionDone: true
            };
        case ADD_ADJUSTMENT_FETCH:
            return {
                ...state,
                adjustmentAdded: true
            };
        default:
            return {
                ...state,
            };
    }
};
