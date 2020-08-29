import * as actions from './actions';
import { initialLabelState, labelReducer } from './reducer';

describe('Label reducer', () => {
    it('should handle ADD_USER_LABEL_FETCH', () => {
        const expectedState = {
            ...initialLabelState,
            labelAdded: true,
        };
        const payload = {
            uid: '',
            key: '',
            value: '',
            scope: '',
        };
        expect(labelReducer(initialLabelState, actions.addNewLabel(payload))).toEqual(expectedState);
    });

    it('should handle DELETE_USER_LABEL_FETCH', () => {
        const expectedState = {
            ...initialLabelState,
            labelDeleted: true,
        };
        const payload = {
            uid: '',
            key: '',
            scope: '',
        };
        expect(labelReducer(initialLabelState, actions.deleteLabel(payload))).toEqual(expectedState);
    });

    it('should handle EDIT_USER_LABEL_FETCH', () => {
        const expectedState = {
            ...initialLabelState,
            labelEdited: true,
        };
        const payload = {
            uid: '',
            key: '',
            value: '',
            scope: '',
        };
        expect(labelReducer(initialLabelState, actions.editLabel(payload))).toEqual(expectedState);
    });
});
