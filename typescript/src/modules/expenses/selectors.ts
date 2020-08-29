import { AppState } from '../index';
import { ExpensesState } from './reducer';

export const selectExpenses = (state: AppState) =>
    state.expenses.list;

export const selectExpensesLoading = (state: AppState): ExpensesState['loading'] =>
    state.expenses.loading;

export const selectExpensesTotalNumber = (state: AppState): ExpensesState['total'] =>
    state.expenses.total;

export const selectExpensesCurrentPage = (state: AppState): ExpensesState['page'] =>
    state.expenses.page;
