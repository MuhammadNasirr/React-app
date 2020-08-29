import * as actions from './actions';

describe('Permission actions', () => {
    it('should check getPermissions action creator', () => {
        const payload = {
            page: 0,
            limit: 10
        };
        const expectedAction = { type: 'GET_PERMISSIONS_FETCH', payload };
        expect(actions.getPermissions(payload)).toEqual(expectedAction);
    });

    it('should check getPermissionSuccess action creator', () => {
        const payload = {
            list: [],
            page: 1,
            total: 0
        };
        const expectedAction = { type: 'GET_PERMISSIONS_SUCCESS', payload };
        expect(actions.getPermissionSuccess(payload)).toEqual(expectedAction);
    });

    it('should check deletePermission action creator', () => {
        const payload = {
            id: 0
        };
        const expectedAction = { type: 'DELETE_PERMISSION_FETCH', payload };
        expect(actions.deletePermission(payload)).toEqual(expectedAction);
    });

    it('should check editPermission action creator', () => {
        const payload = {
            id: 1,
            role: '',
            verb: '',
            path: '',
            action: '',
            topic: ''
        };
        const expectedAction = { type: 'EDIT_PERMISSION_FETCH', payload };
        expect(actions.editPermission(payload)).toEqual(expectedAction);
    });

    it('should check addPermission action creator', () => {
        const payload = {
            role: '',
            verb: '',
            path: '',
            action: '',
            topic: ''
        };
        const expectedAction = { type: 'ADD_PERMISSION_FETCH', payload };
        expect(actions.addPermission(payload)).toEqual(expectedAction);
    });
});
