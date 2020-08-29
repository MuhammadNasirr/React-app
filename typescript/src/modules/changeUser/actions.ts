import {
    CHANGE_EDIT_MODE,
    CHANGE_USER_OTP_FETCH,
    CHANGE_USER_PROFILE_FETCH,
    CHANGE_USER_ROLE_FETCH,
    CHANGE_USER_STATE_FETCH
} from '../constants';

export interface ChangeUserOTPFetch {
    type: typeof CHANGE_USER_OTP_FETCH;
    payload: {
        uid: string;
        otp: boolean;
    };
}

export interface ChangeUserRoleFetch {
    type: typeof CHANGE_USER_ROLE_FETCH;
    payload: {
        uid: string;
        role: string;
    };
}

export interface ChangeUserStateFetch {
    type: typeof CHANGE_USER_STATE_FETCH;
    payload: {
        uid: string;
        state: string;
    };
}

export interface ChangeEditModeSet {
    type: typeof CHANGE_EDIT_MODE;
    payload: {
        mode: boolean
    };
}

export interface ChangeUserProfileFetch {
    type: typeof CHANGE_USER_PROFILE_FETCH;
    // tslint:disable-next-line:no-any
    payload: any;
}

export type ChangeUserAction =
    ChangeEditModeSet
    | ChangeUserOTPFetch
    | ChangeUserRoleFetch
    | ChangeUserStateFetch
    | ChangeUserProfileFetch;

export const changeUserOTP = (payload: ChangeUserOTPFetch['payload']): ChangeUserOTPFetch => ({
    type: CHANGE_USER_OTP_FETCH,
    payload,
});

export const changeUserRole = (payload: ChangeUserRoleFetch['payload']): ChangeUserRoleFetch => ({
    type: CHANGE_USER_ROLE_FETCH,
    payload,
});

export const changeUserState = (payload: ChangeUserStateFetch['payload']): ChangeUserStateFetch => ({
    type: CHANGE_USER_STATE_FETCH,
    payload,
});

export const changeEditMode = (payload: ChangeEditModeSet['payload']): ChangeEditModeSet => ({
    type: CHANGE_EDIT_MODE,
    payload,
});

export const changeUserProfile = (payload: ChangeUserProfileFetch['payload']): ChangeUserProfileFetch => ({
    type: CHANGE_USER_PROFILE_FETCH,
    payload,
});
