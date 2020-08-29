import * as actions from './actions';

describe('Label actions', () => {
    it('should check addNewLabel action creator', () => {
        const payload = {
            uid: '',
            key: '',
            value: '',
            scope: '',
        };
        const expectedAction = { type: 'ADD_USER_LABEL_FETCH', payload };
        expect(actions.addNewLabel(payload)).toEqual(expectedAction);
    });

    it('should check deleteLabel action creator', () => {
        const payload = {
            uid: '',
            key: '',
            scope: '',
        };
        const expectedAction = { type: 'DELETE_USER_LABEL_FETCH', payload };
        expect(actions.deleteLabel(payload)).toEqual(expectedAction);
    });

    it('should check editLabel action creator', () => {
        const payload = {
            uid: '',
            key: '',
            value: '',
            scope: '',
        };
        const expectedAction = { type: 'EDIT_USER_LABEL_FETCH', payload };
        expect(actions.editLabel(payload)).toEqual(expectedAction);
    });
});
