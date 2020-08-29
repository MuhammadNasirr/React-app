import { AppState } from '../../index';
import { MarketsState } from './reducer';

export const selectMarkets = (state: AppState) =>
    state.marketData.markets.list;

export const selectMarketsLoading = (state: AppState): MarketsState['loading'] =>
    state.marketData.markets.loading;

export const selectMarketsTotalNumber = (state: AppState): MarketsState['total'] =>
    state.marketData.markets.total;

export const selectMarketsCurrentPage = (state: AppState): MarketsState['page'] =>
    state.marketData.markets.page;
