import {
    ADD_PERMISSION_FETCH,
    DELETE_PERMISSION_FETCH,
    EDIT_PERMISSION_FETCH,
    GET_PERMISSIONS_FETCH,
    GET_PERMISSIONS_SUCCESS
} from '../constants';
import { PermissionAction } from './actions';

export interface PermissionState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    permissionDeleted: boolean;
    permissionEdited: boolean;
    permissionAdded: boolean;
}

export const initialPermissionState: PermissionState = {
    list: [],
    loading: false,
    page: 0,
    limit: 50,
    total: 0,
    permissionDeleted: false,
    permissionEdited: false,
    permissionAdded: false,
};

export const permissionReducer = (state = initialPermissionState, action: PermissionAction) => {
    switch (action.type) {
        case GET_PERMISSIONS_FETCH:
            return {
                ...state
            };
        case GET_PERMISSIONS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
            };
        case DELETE_PERMISSION_FETCH:
            return {
                ...state,
                permissionDeleted: true,
            };
        case EDIT_PERMISSION_FETCH:
            return {
                ...state,
                permissionEdited: true,
            };
        case ADD_PERMISSION_FETCH:
            return {
                ...state,
                permissionAdded: true,
            };
        default:
            return {
                ...state,
            };
    }
};
