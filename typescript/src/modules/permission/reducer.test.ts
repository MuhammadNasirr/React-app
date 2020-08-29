import * as actions from './actions';
import { initialPermissionState, permissionReducer } from './reducer';

describe('Permission reducer', () => {
    const permissionData = [
        {
            id: 1,
            role: '',
            verb: '',
            path: '',
            action: '',
            topic: ''
        }
    ];
    it('should handle GET_PERMISSIONS_FETCH', () => {
        const expectedState = {
            ...initialPermissionState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(permissionReducer(initialPermissionState, actions.getPermissions(payload))).toEqual(expectedState);
    });

    it('should handle GET_PERMISSIONS_SUCCESS', () => {
        const payload: actions.PermissionSuccessPayload = {
            list: permissionData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialPermissionState,
            loading: false
        };
        expect(permissionReducer(initialPermissionState, actions.getPermissionSuccess(payload))).toEqual(expectedState);
    });

    it('should handle DELETE_PERMISSION_FETCH', () => {
        const expectedState = {
            ...initialPermissionState,
            labelDeleted: true,
        };
        const payload = {
            id: 0
        };
        expect(permissionReducer(initialPermissionState, actions.deletePermission(payload))).toEqual(expectedState);
    });

    it('should handle EDIT_PERMISSION_FETCH', () => {
        const expectedState = {
            ...initialPermissionState,
            labelEdited: true,
        };
        const payload = {
            id: 1,
            role: '',
            verb: '',
            path: '',
            action: '',
            topic: ''
        };
        expect(permissionReducer(initialPermissionState, actions.editPermission(payload))).toEqual(expectedState);
    });
});
