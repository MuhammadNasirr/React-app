import { AppState } from '../../index';
import { BankAccountsDetailsState } from './reducer';

export const selectBankAccountsDetails = (state: AppState) =>
    state.bankAccountsData.bankAccountsDetails.data;

export const selectBankAccountsDetailsLoading = (state: AppState): BankAccountsDetailsState['loading'] =>
    state.bankAccountsData.bankAccountsDetails.loading;
