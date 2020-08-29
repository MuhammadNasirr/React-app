import { AppState } from '../../index';
import { DepositState } from './reducer';

export const selectDepositsMXN = (state: AppState) =>
    state.depositsData.depositsMXN.list;

export const selectDepositsMXNLoading = (state: AppState): DepositState['loading'] =>
    state.depositsData.depositsMXN.loading;

export const selectDepositsMXNTotalNumber = (state: AppState): DepositState['total'] =>
    state.depositsData.depositsMXN.total;

export const selectDepositsMXNCurrentPage = (state: AppState): DepositState['page'] =>
    state.depositsData.depositsMXN.page;

export const selectDeposits = (state: AppState) =>
    state.depositsData.deposits.list;

export const selectDepositsLoading = (state: AppState): DepositState['loading'] =>
    state.depositsData.deposits.loading;

export const selectDepositsTotalNumber = (state: AppState): DepositState['total'] =>
    state.depositsData.deposits.total;

export const selectDepositsCurrentPage = (state: AppState): DepositState['page'] =>
    state.depositsData.deposits.page;
