import {
    GET_MEMBER_DATA_FETCH,
    GET_MEMBER_DATA_SUCCESS
} from '../../constants';
import { MemberDataAction } from './actions';

export interface MemberDataState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
}

export const initialMemberDataState: MemberDataState = {
    data: {},
    loading: true
};

export const memberDataReducer = (state = initialMemberDataState, action: MemberDataAction) => {
    switch (action.type) {
        case GET_MEMBER_DATA_FETCH:
            return {
                ...state
            };
        case GET_MEMBER_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        default:
            return {
                ...state,
            };
    }
};
