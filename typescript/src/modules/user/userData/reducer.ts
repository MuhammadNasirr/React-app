import {
    GET_USER_DATA_FETCH,
    GET_USER_DATA_SUCCESS,
} from '../../constants';
import { UserDataAction } from './actions';

export interface UserDataState {
    // tslint:disable-next-line:no-any
    userData: any;
    getUserData: boolean;
}

export const initialUserDataState: UserDataState = {
    userData: undefined,
    getUserData: false,
};

export const userDataReducer = (state = initialUserDataState, action: UserDataAction) => {
    switch (action.type) {
        case GET_USER_DATA_FETCH:
            return {
                ...state
            };
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                getUserData: true,
            };
        default:
            return {
                ...state,
            };
    }
};
