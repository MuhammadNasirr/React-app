import {
    GET_DEPOSITS_FETCH,
    GET_DEPOSITS_MXN_FETCH,
    GET_DEPOSITS_MXN_SUCCESS,
    GET_DEPOSITS_SUCCESS,
    UPDATE_DEPOSIT_MXN_FETCH
} from '../../constants';
import { DepositsAction, DepositsMXNAction } from './actions';

export interface DepositState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export interface DepositMXNState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialDepositsState: DepositState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const initialDepositMXNState: DepositMXNState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};


export const depositsReducer = (state = initialDepositsState, action: DepositsAction) => {
    switch (action.type) {
        case GET_DEPOSITS_FETCH:
            return {
                ...state
            };
        case GET_DEPOSITS_SUCCESS:
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

export const DepositsMXNReducer = (state = initialDepositMXNState, action: DepositsMXNAction) => {
    switch (action.type) {
        case GET_DEPOSITS_MXN_FETCH:
            return {
                ...state
            };
        case GET_DEPOSITS_MXN_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case UPDATE_DEPOSIT_MXN_FETCH:
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
