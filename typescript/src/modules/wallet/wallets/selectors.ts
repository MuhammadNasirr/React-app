import { AppState } from '../../index';
import { WalletsState } from './reducer';

export const selectWallets = (state: AppState) =>
    state.walletData.wallets.list;

export const selectWalletsLoading = (state: AppState): WalletsState['loading'] =>
    state.walletData.wallets.loading;

export const selectWalletsTotalNumber = (state: AppState): WalletsState['total'] =>
    state.walletData.wallets.total;

export const selectWalletsCurrentPage = (state: AppState): WalletsState['page'] =>
    state.walletData.wallets.page;
