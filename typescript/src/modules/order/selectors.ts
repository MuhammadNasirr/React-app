import { AppState } from '../index';
import { OrdersState } from './reducer';

export const selectOrders = (state: AppState) =>
    state.orders.list;

export const selectOrdersTotalNumber = (state: AppState): OrdersState['total'] =>
    state.orders.total;

export const selectOrdersCurrentPage = (state: AppState): OrdersState['page'] =>
    state.orders.page;

export const selectOrdersLoading = (state: AppState): OrdersState['loading'] =>
    state.orders.loading;
