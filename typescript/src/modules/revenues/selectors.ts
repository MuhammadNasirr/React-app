import { AppState } from '../index';
import { RevenuesState } from './reducer';

export const selectRevenues = (state: AppState) =>
    state.revenues.list;

export const selectRevenuesLoading = (state: AppState): RevenuesState['loading'] =>
    state.revenues.loading;

export const selectRevenuesTotalNumber = (state: AppState): RevenuesState['total'] =>
    state.revenues.total;

export const selectRevenuesCurrentPage = (state: AppState): RevenuesState['page'] =>
    state.revenues.page;
