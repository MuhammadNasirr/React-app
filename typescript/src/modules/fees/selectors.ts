import { AppState } from '../index';
import { FeesState } from './reducer';

export const selectFees = (state: AppState) =>
    state.fees.list;

export const selectFeesLoading = (state: AppState): FeesState['loading'] =>
    state.fees.loading;

export const selectFeesTotalNumber = (state: AppState): FeesState['total'] =>
    state.fees.total;

export const selectFeesCurrentPage = (state: AppState): FeesState['page'] =>
    state.fees.page;
