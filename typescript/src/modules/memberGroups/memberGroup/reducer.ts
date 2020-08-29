import {
    GET_MEMBER_GROUP_FETCH,
    GET_MEMBER_GROUP_SUCCESS
} from '../../constants';
import { MemberGroupAction } from './actions';

export interface MemberGroupState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
}

export const initialMemberGroupState: MemberGroupState = {
    data: {},
    loading: true
};

export const memberGroupReducer = (state = initialMemberGroupState, action: MemberGroupAction) => {
    switch (action.type) {
        case GET_MEMBER_GROUP_FETCH:
            return {
                ...state
            };
        case GET_MEMBER_GROUP_SUCCESS:
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
