import {
    ADD_PERMISSION_FETCH,
    DELETE_PERMISSION_FETCH,
    EDIT_PERMISSION_FETCH,
    GET_PERMISSIONS_FETCH,
    GET_PERMISSIONS_SUCCESS
} from '../constants';

interface PermissionFetchPayload {
    page?: number;
    limit?: number;
}

interface DeletePermissionFetchPayload {
    id: number;
}

interface EditPermissionFetchPayload {
    id: number;
    role: string;
    verb: string;
    path: string;
    action: string;
    topic: string;
}

interface AddPermissionFetchPayload {
    role: string;
    verb: string;
    path: string;
    action: string;
    topic: string;
}

export interface GetPermissionsFetch {
    type: typeof GET_PERMISSIONS_FETCH;
    payload: PermissionFetchPayload;
}

export interface GetPermissionsSuccess {
    type: typeof GET_PERMISSIONS_SUCCESS;
    payload: PermissionSuccessPayload;
}

export interface DeletePermissionFetch {
    type: typeof DELETE_PERMISSION_FETCH;
    payload: DeletePermissionFetchPayload;
}

export interface EditPermissionFetch {
    type: typeof EDIT_PERMISSION_FETCH;
    payload: EditPermissionFetchPayload;
}

export interface AddPermissionFetch {
    type: typeof ADD_PERMISSION_FETCH;
    payload: AddPermissionFetchPayload;
}

export interface PermissionSuccessPayload {
    list: PermissionDataInterface[];
    page: number | undefined;
    limit?: number;
    total: number;
}

export interface PermissionDataInterface {
    id: number;
    role: string;
    verb: string;
    path: string;
    action: string;
    topic: string;
}

export type PermissionAction = GetPermissionsFetch
    | GetPermissionsSuccess
    | DeletePermissionFetch
    | EditPermissionFetch
    | AddPermissionFetch;

export const getPermissions = (payload: GetPermissionsFetch['payload']): GetPermissionsFetch => ({
    type: GET_PERMISSIONS_FETCH,
    payload,
});

export const getPermissionSuccess = (payload: GetPermissionsSuccess['payload']): GetPermissionsSuccess => ({
    type: GET_PERMISSIONS_SUCCESS,
    payload,
});


export const deletePermission = (payload: DeletePermissionFetch['payload']): DeletePermissionFetch => ({
    type: DELETE_PERMISSION_FETCH,
    payload,
});

export const editPermission = (payload: EditPermissionFetch['payload']): EditPermissionFetch => ({
    type: EDIT_PERMISSION_FETCH,
    payload,
});

export const addPermission = (payload: AddPermissionFetch['payload']): AddPermissionFetch => ({
    type: ADD_PERMISSION_FETCH,
    payload,
});
