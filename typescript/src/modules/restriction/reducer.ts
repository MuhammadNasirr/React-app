import {
    ADD_RESTRICTION_FETCH,
    DELETE_RESTRICTION_FETCH,
    EDIT_RESTRICTION_FETCH,
    GET_RESTRICTION_FETCH,
    GET_RESTRICTION_SUCCESS
} from '../constants';
import { RestrictionAction } from './actions';

export interface RestrictionState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
    restrictionAdded: boolean;
    restrictionEdited: boolean;
    restrictionDeleted: boolean;
}

export const initialRestrictionState: RestrictionState = {
    list: [],
    loading: true,
    page: 0,
    total: 0,
    restrictionAdded: false,
    restrictionEdited: false,
    restrictionDeleted: false,
};

export const restrictionReducer = (state = initialRestrictionState, action: RestrictionAction) => {
    switch (action.type) {
        case GET_RESTRICTION_FETCH:
            return {
                ...state
            };
        case GET_RESTRICTION_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case ADD_RESTRICTION_FETCH:
            return {
                ...state,
                restrictionAdded: true
            };
        case EDIT_RESTRICTION_FETCH:
            return {
                ...state,
                restrictionEdited: true
            };
        case DELETE_RESTRICTION_FETCH:
            return {
                ...state,
                restrictionDeleted: true
            };
        default:
            return {
                ...state,
            };
    }
};
