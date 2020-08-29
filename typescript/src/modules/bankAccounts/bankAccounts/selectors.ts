import { AppState } from '../../index';
import { BankAccountsState } from './reducer';

export const selectBankAccounts = (state: AppState) =>
    state.bankAccountsData.bankAccounts.list;

export const selectBankAccountsLoading = (state: AppState): BankAccountsState['loading'] =>
    state.bankAccountsData.bankAccounts.loading;

export const selectBankAccountsTotalNumber = (state: AppState): BankAccountsState['total'] =>
    state.bankAccountsData.bankAccounts.total;

export const selectBankAccountsCurrentPage = (state: AppState): BankAccountsState['page'] =>
    state.bankAccountsData.bankAccounts.page;
