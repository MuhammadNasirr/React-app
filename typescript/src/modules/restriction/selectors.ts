import { AppState } from '../index';
import { RestrictionState } from './reducer';

export const selectRestrictions = (state: AppState) =>
    state.restrictions.list;

export const selectRestrictionLoading = (state: AppState): RestrictionState['loading'] =>
    state.restrictions.loading;

export const selectRestrictionTotalNumber = (state: AppState): RestrictionState['total'] =>
    state.restrictions.total;

export const selectRestrictionCurrentPage = (state: AppState): RestrictionState['page'] =>
    state.restrictions.page;
