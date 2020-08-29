import {
    GET_PENDING_WITHDRAWALS_FETCH,
    GET_PENDING_WITHDRAWALS_MXN_FETCH,
    GET_PENDING_WITHDRAWALS_MXN_SUCCESS,
    GET_PENDING_WITHDRAWALS_SUCCESS,
    UPDATE_WITHDRAW_PENDING_MXN_FETCH
} from '../../constants';
import { PendingWithdrawalsAction, PendingWithdrawalsMXNAction } from './actions';

export interface PendingWithdrawalState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}
export interface PendingWithdrawalMXNState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialPendingWithdrawalState: PendingWithdrawalState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};
export const initialPendingWithdrawalMXNState: PendingWithdrawalMXNState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const pendingWithdrawalsReducer = (state = initialPendingWithdrawalState, action: PendingWithdrawalsAction) => {
    switch (action.type) {
        case GET_PENDING_WITHDRAWALS_FETCH:
            return {
                ...state
            };
        case GET_PENDING_WITHDRAWALS_SUCCESS:
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

export const pendingWithdrawalsMXNReducer = (state = initialPendingWithdrawalMXNState, action: PendingWithdrawalsMXNAction) => {
    switch (action.type) {
        case GET_PENDING_WITHDRAWALS_MXN_FETCH:
            return {
                ...state
            };
        case GET_PENDING_WITHDRAWALS_MXN_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
            case UPDATE_WITHDRAW_PENDING_MXN_FETCH:
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
