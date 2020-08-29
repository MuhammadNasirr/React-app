import { AppState, ChangeUserState } from '../';

export const selectEditMode = (state: AppState): ChangeUserState['editMode'] =>
    state.changeUserState.editMode;
