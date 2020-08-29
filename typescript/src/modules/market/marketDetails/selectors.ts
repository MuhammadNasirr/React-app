import { AppState } from '../../index';
import { MarketsDetailsState } from './reducer';

export const selectMarketsDetails = (state: AppState) =>
    state.marketData.marketDetails.data;

export const selectMarketsDetailsLoading = (state: AppState): MarketsDetailsState['loading'] =>
    state.marketData.marketDetails.loading;
