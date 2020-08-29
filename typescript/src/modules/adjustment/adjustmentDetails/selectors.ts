import { AppState } from '../../index';
import { AdjustmentDetailsState } from './reducer';

export const selectAdjustmentDetails = (state: AppState) =>
    state.adjustmentsData.adjustmentDetails.data;

export const selectAdjustmentDetailsLoading = (state: AppState): AdjustmentDetailsState['loading'] =>
    state.adjustmentsData.adjustmentDetails.loading;
