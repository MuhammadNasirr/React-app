import { AppState } from '../index';
import { LiabilitiesState } from './reducer';

export const selectLiabilities = (state: AppState) =>
    state.liabilities.list;

export const selectLiabilitiesLoading = (state: AppState): LiabilitiesState['loading'] =>
    state.liabilities.loading;

export const selectLiabilitiesTotalNumber = (state: AppState): LiabilitiesState['total'] =>
    state.liabilities.total;

export const selectLiabilitiesCurrentPage = (state: AppState): LiabilitiesState['page'] =>
    state.liabilities.page;
