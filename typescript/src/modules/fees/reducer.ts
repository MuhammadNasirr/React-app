import {
    ADD_FEES_FETCH,
    DELETE_FEES_FETCH,
    EDIT_FEES_FETCH,
    GET_FEES_FETCH,
    GET_FEES_SUCCESS
} from '../constants';
import { FeesAction } from './actions';

export interface FeesState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
    feesAdded: boolean;
    feesEdited: boolean;
    feesDeleted: boolean;
}

export const initialFeesState: FeesState = {
    list: [],
    loading: true,
    page: 0,
    total: 0,
    feesAdded: false,
    feesEdited: false,
    feesDeleted: false,
};

export const feesReducer = (state = initialFeesState, action: FeesAction) => {
    switch (action.type) {
        case GET_FEES_FETCH:
            return {
                ...state
            };
        case GET_FEES_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case ADD_FEES_FETCH:
            return {
                ...state,
                feesAdded: true
            };
        case EDIT_FEES_FETCH:
            return {
                ...state,
                feesEdited: true
            };
        case DELETE_FEES_FETCH:
            return {
                ...state,
                feesDeleted: true
            };
        default:
            return {
                ...state,
            };
    }
};
