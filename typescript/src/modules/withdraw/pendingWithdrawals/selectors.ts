import { AppState } from '../../index';
import { PendingWithdrawalState } from './reducer';

export const selectPendingWithdrawalsMXN = (state: AppState) =>
    state.withdrawsData.pendingWithdrawalsMXN.list;

export const selectPendingWithdrawalsMXNLoading = (state: AppState): PendingWithdrawalState['loading'] =>
    state.withdrawsData.pendingWithdrawalsMXN.loading;

export const selectPendingWithdrawalsMXNTotalNumber = (state: AppState): PendingWithdrawalState['total'] =>
    state.withdrawsData.pendingWithdrawalsMXN.total;

export const selectPendingWithdrawalsMXNCurrentPage = (state: AppState): PendingWithdrawalState['page'] =>
    state.withdrawsData.pendingWithdrawalsMXN.page;

export const selectPendingWithdrawals = (state: AppState) =>
    state.withdrawsData.pendingWithdrawals.list;

export const selectPendingWithdrawalsLoading = (state: AppState): PendingWithdrawalState['loading'] =>
    state.withdrawsData.pendingWithdrawals.loading;

export const selectPendingWithdrawalsTotalNumber = (state: AppState): PendingWithdrawalState['total'] =>
    state.withdrawsData.pendingWithdrawals.total;

export const selectPendingWithdrawalsCurrentPage = (state: AppState): PendingWithdrawalState['page'] =>
    state.withdrawsData.pendingWithdrawals.page;
