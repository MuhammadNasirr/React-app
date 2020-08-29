import { AppState } from '../../index';
import { WalletDetailsState } from './reducer';

export const selectWalletDetails = (state: AppState) =>
    state.walletData.walletDetails.data;

export const selectWalletDetailsLoading = (state: AppState): WalletDetailsState['loading'] =>
    state.walletData.walletDetails.loading;
