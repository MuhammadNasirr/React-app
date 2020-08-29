import {
    GET_ADJUSTMENTS_FETCH,
    GET_ADJUSTMENTS_SUCCESS
} from '../../constants';
import { AdjustmentsAction } from './actions';

export interface AdjustmentsState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialAdjustmentsState: AdjustmentsState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const adjustmentsReducer = (state = initialAdjustmentsState, action: AdjustmentsAction) => {
    switch (action.type) {
        case GET_ADJUSTMENTS_FETCH:
            return {
                ...state
            };
        case GET_ADJUSTMENTS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        default:
            return {
                ...state,
            };
    }
};
