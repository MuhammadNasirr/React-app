import {
    GET_LIABILITIES_FETCH,
    GET_LIABILITIES_SUCCESS
} from '../constants';
import { LiabilitiesAction } from './actions';

export interface LiabilitiesState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialLiabilitiesState: LiabilitiesState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const liabilitiesReducer = (state = initialLiabilitiesState, action: LiabilitiesAction) => {
    switch (action.type) {
        case GET_LIABILITIES_FETCH:
            return {
                ...state
            };
        case GET_LIABILITIES_SUCCESS:
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
