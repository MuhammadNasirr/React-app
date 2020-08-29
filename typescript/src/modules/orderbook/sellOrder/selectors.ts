import { AppState } from '../../index';
import { SellOrdersState } from './reducer';

export const selectSellOrders = (state: AppState) =>
    state.orderData.sellOrders.list;

export const selectSellOrdersTotalNumber = (state: AppState): SellOrdersState['total'] =>
    state.orderData.sellOrders.total;

export const selectSellOrdersCurrentPage = (state: AppState): SellOrdersState['page'] =>
    state.orderData.sellOrders.page;

export const selectSellOrdersLoading = (state: AppState): SellOrdersState['loading'] =>
    state.orderData.sellOrders.loading;
