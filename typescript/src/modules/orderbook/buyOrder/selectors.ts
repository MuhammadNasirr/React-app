import { AppState } from '../../index';
import { BuyOrdersState } from './reducer';

export const selectBuyOrders = (state: AppState) =>
    state.orderData.buyOrders.list;

export const selectBuyOrdersTotalNumber = (state: AppState): BuyOrdersState['total'] =>
    state.orderData.buyOrders.total;

export const selectBuyOrdersCurrentPage = (state: AppState): BuyOrdersState['page'] =>
    state.orderData.buyOrders.page;

export const selectBuyOrdersLoading = (state: AppState): BuyOrdersState['loading'] =>
    state.orderData.buyOrders.loading;
