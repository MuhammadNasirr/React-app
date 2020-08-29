import { AppState } from '../../index';
import { BlockchainsState } from './reducer';

export const selectBlockchains = (state: AppState) =>
    state.blockchainData.blockchains.list;

export const selectBlockchainsLoading = (state: AppState): BlockchainsState['loading'] =>
    state.blockchainData.blockchains.loading;

export const selectBlockchainsTotalNumber = (state: AppState): BlockchainsState['total'] =>
    state.blockchainData.blockchains.total;

export const selectBlockchainsCurrentPage = (state: AppState): BlockchainsState['page'] =>
    state.blockchainData.blockchains.page;
