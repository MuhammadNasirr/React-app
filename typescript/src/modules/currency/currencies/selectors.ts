import { AppState } from '../../index';
import { CurrenciesState } from './reducer';

export const selectCurrencies = (state: AppState) =>
    state.currencyData.currencies.list;

export const selectCurrenciesLoading = (state: AppState): CurrenciesState['loading'] =>
    state.currencyData.currencies.loading;

export const selectCurrenciesTotalNumber = (state: AppState): CurrenciesState['total'] =>
    state.currencyData.currencies.total;

export const selectCurrenciesCurrentPage = (state: AppState): CurrenciesState['page'] =>
    state.currencyData.currencies.page;
