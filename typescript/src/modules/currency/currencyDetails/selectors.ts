import { AppState } from '../../index';
import { CurrenciesDetailsState } from './reducer';

export const selectCurrenciesDetails = (state: AppState) =>
    state.currencyData.currencyDetails.data;

export const selectCurrenciesDetailsLoading = (state: AppState): CurrenciesDetailsState['loading'] =>
    state.currencyData.currencyDetails.loading;
