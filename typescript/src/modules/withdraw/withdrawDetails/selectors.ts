import { AppState } from '../../index';
import { WithdrawDetailsState } from './reducer';

export const selectWithdrawDetails = (state: AppState) =>
    state.withdrawsData.withdrawDetails.data;

export const selectWithdrawDetailsLoading = (state: AppState): WithdrawDetailsState['loading'] =>
    state.withdrawsData.withdrawDetails.loading;

export const selectWithdrawDetailsProcess = (state: AppState): WithdrawDetailsState['process'] =>
    state.withdrawsData.withdrawDetails.process;
