import {
    GET_MEMBER_DETAILS_FETCH,
    GET_MEMBER_DETAILS_SUCCESS
} from '../../constants';
import { MemberDetailsAction } from './actions';

export interface MemberDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
}

export const initialMemberDetailsState: MemberDetailsState = {
    data: {},
    loading: true
};

export const memberDetailsReducer = (state = initialMemberDetailsState, action: MemberDetailsAction) => {
    switch (action.type) {
        case GET_MEMBER_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_MEMBER_DETAILS_SUCCESS:
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
