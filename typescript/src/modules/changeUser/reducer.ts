import {
    CHANGE_EDIT_MODE,
    CHANGE_USER_OTP_FETCH,
    CHANGE_USER_PROFILE_FETCH,
    CHANGE_USER_ROLE_FETCH,
    CHANGE_USER_STATE_FETCH
} from '../constants';
import { ChangeUserAction } from './actions';

export interface ChangeUserState {
    editMode: boolean;
    OTPChanged: boolean;
    roleChanged: boolean;
    stateChanged: boolean;
    profileChanged: boolean;
}

export const initialChangeUserState: ChangeUserState = {
    editMode: false,
    OTPChanged: false,
    roleChanged: false,
    stateChanged: false,
    profileChanged: false,
};

export const changeUserReducer = (state = initialChangeUserState, action: ChangeUserAction) => {
    switch (action.type) {
        case CHANGE_USER_OTP_FETCH:
            return {
                ...state,
                OTPChanged: true,
            };
        case CHANGE_USER_ROLE_FETCH:
            return {
                ...state,
                roleChanged: true,
            };
        case CHANGE_USER_STATE_FETCH:
            return {
                ...state,
                stateChanged: true,
            };
        case CHANGE_EDIT_MODE:
            return {
                ...state,
                editMode: action.payload.mode,
            };
        case CHANGE_USER_PROFILE_FETCH:
            return {
                ...state,
                profileChanged: true,
            };
        default:
            return {
                ...state,
            };
    }
};
