import {
    ACTION_WITHDRAW_FETCH,
    GET_WITHDRAW_DETAILS_FETCH,
    GET_WITHDRAW_DETAILS_SUCCESS,
    PROCESS_WITHDRAW_FIAT_FETCH
} from '../../constants';
import { WithdrawDetailsAction } from './actions';

export interface WithdrawDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    process: boolean;
    actionDone: boolean;
    processFiatDone: boolean;
}

export const initialWithdrawDetailsState: WithdrawDetailsState = {
    data: {},
    loading: true,
    process: false,
    actionDone: false,
    processFiatDone: false
};

export const withdrawDetailsReducer = (state = initialWithdrawDetailsState, action: WithdrawDetailsAction) => {
    switch (action.type) {
        case GET_WITHDRAW_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_WITHDRAW_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                process: false
            };
        case ACTION_WITHDRAW_FETCH:
            return {
                ...state,
                actionDone: true,
                process: true
            };
        case PROCESS_WITHDRAW_FIAT_FETCH:
            return {
                ...state,
                processFiatDone: true,
                process: true
            };
        default:
            return {
                ...state,
            };
    }
};
