import { AppState } from '../index';
import { TradeState } from './reducer';

export const selectTrades = (state: AppState) =>
    state.trades.list;

export const selectTradesLoading = (state: AppState): TradeState['loading'] =>
    state.trades.loading;

export const selectTradesTotalNumber = (state: AppState): TradeState['total'] =>
    state.trades.total;

export const selectTradesCurrentPage = (state: AppState): TradeState['page'] =>
    state.trades.page;
