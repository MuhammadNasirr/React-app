import {
    GET_WITHDRAWALS_FETCH,
    GET_WITHDRAWALS_MXN_FETCH,
    GET_WITHDRAWALS_MXN_SUCCESS,
    GET_WITHDRAWALS_SUCCESS,
    UPDATE_WITHDRAW_MXN_FETCH
} from '../../constants';
import { WithdrawalsAction, WithdrawalsMXNAction } from './actions';

export interface WithdrawalState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export interface WithdrawalMXNState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialWithdrawalState: WithdrawalState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const initialWithdrawalMXNState: WithdrawalMXNState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const withdrawalsReducer = (state = initialWithdrawalState, action: WithdrawalsAction) => {
    switch (action.type) {
        case GET_WITHDRAWALS_FETCH:
            return {
                ...state
            };
        case GET_WITHDRAWALS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        default:
            return {
                ...state,
            };
    }
};

export const WithdrawalsMXNReducer = (state = initialWithdrawalMXNState, action: WithdrawalsMXNAction) => {
    switch (action.type) {
        case GET_WITHDRAWALS_MXN_FETCH:
            return {
                ...state
            };
        case GET_WITHDRAWALS_MXN_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case UPDATE_WITHDRAW_MXN_FETCH:
            return {
                ...state,
                loading: false,
            };
        default:
            return {
                ...state,
            };

    }
};
