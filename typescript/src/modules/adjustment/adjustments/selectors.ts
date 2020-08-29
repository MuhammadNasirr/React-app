import { AppState } from '../../index';
import { AdjustmentsState } from './reducer';

export const selectAdjustments = (state: AppState) =>
    state.adjustmentsData.adjustments.list;

export const selectAdjustmentsLoading = (state: AppState): AdjustmentsState['loading'] =>
    state.adjustmentsData.adjustments.loading;

export const selectAdjustmentsTotalNumber = (state: AppState): AdjustmentsState['total'] =>
    state.adjustmentsData.adjustments.total;

export const selectAdjustmentsCurrentPage = (state: AppState): AdjustmentsState['page'] =>
    state.adjustmentsData.adjustments.page;
