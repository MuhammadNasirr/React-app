import {
    GET_EXPENSES_FETCH,
    GET_EXPENSES_SUCCESS
} from '../constants';

interface ExpensesFetchPayload {
    page: number;
    limit: number;
    ordering?: string;
    reference_type?: string;
    rid?: string;
    code?: string;
    currency?: string;
    from?: string | null;
    to?: string | null;
}

export interface ExpensesSuccessPayload {
    list: ExpensesDataInterface[];
    page: number;
    total: number;
}

export interface ExpensesDataInterface {
    id: number;
    code: number;
    currency: string;
    credit: string;
    debit: string;
    account_kind: string;
    rid: number;
    reference_type: string;
    created_at: string;
}

export interface GetExpensesFetch {
    type: typeof GET_EXPENSES_FETCH;
    payload: ExpensesFetchPayload;
}

export interface GetExpensesSuccess {
    type: typeof GET_EXPENSES_SUCCESS;
    payload: ExpensesSuccessPayload;
}

export type ExpensesAction =
    GetExpensesFetch
    | GetExpensesSuccess;

export const getExpenses = (payload: ExpensesFetchPayload): GetExpensesFetch => ({
    type: GET_EXPENSES_FETCH,
    payload,
});

export const expensesData = (payload: GetExpensesSuccess['payload']): GetExpensesSuccess => ({
    type: GET_EXPENSES_SUCCESS,
    payload,
});
