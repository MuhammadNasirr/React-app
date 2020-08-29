import {
    GET_EXPENSES_FETCH,
    GET_EXPENSES_SUCCESS
} from '../constants';
import { ExpensesAction } from './actions';

export interface ExpensesState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialExpensesState: ExpensesState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const expensesReducer = (state = initialExpensesState, action: ExpensesAction) => {
    switch (action.type) {
        case GET_EXPENSES_FETCH:
            return {
                ...state
            };
        case GET_EXPENSES_SUCCESS:
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
