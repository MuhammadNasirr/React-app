import { AppState } from '../../index';
import { DepositDetailsState } from './reducer';

export const selectDepositDetails = (state: AppState) =>
    state.depositsData.depositDetails.data;

export const selectDepositDetailsLoading = (state: AppState): DepositDetailsState['loading'] =>
    state.depositsData.depositDetails.loading;

export const selectDepositDetailsProcess = (state: AppState): DepositDetailsState['process'] =>
    state.depositsData.depositDetails.process;
