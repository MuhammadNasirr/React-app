import { AppState } from '../../index';
import { BlockchainDetailsState } from './reducer';

export const selectBlockchainDetails = (state: AppState) =>
    state.blockchainData.blockchainDetails.data;

export const selectBlockchainDetailsLoading = (state: AppState): BlockchainDetailsState['loading'] =>
    state.blockchainData.blockchainDetails.loading;
