import { AppState } from '../../index';
import { WithdrawalState } from './reducer';

export const selectWithdrawalsMXN = (state: AppState) =>
    state.withdrawsData.withdrawalsMXN.list;

export const selectWithdrawalsMXNLoading = (state: AppState): WithdrawalState['loading'] =>
    state.withdrawsData.withdrawalsMXN.loading;

export const selectWithdrawalsMXNTotalNumber = (state: AppState): WithdrawalState['total'] =>
    state.withdrawsData.withdrawalsMXN.total;

export const selectWithdrawalsMXNCurrentPage = (state: AppState): WithdrawalState['page'] =>
    state.withdrawsData.withdrawalsMXN.page;


export const selectWithdrawals = (state: AppState) =>
    state.withdrawsData.withdrawals.list;

export const selectWithdrawalsLoading = (state: AppState): WithdrawalState['loading'] =>
    state.withdrawsData.withdrawals.loading;

export const selectWithdrawalsTotalNumber = (state: AppState): WithdrawalState['total'] =>
    state.withdrawsData.withdrawals.total;

export const selectWithdrawalsCurrentPage = (state: AppState): WithdrawalState['page'] =>
    state.withdrawsData.withdrawals.page;
