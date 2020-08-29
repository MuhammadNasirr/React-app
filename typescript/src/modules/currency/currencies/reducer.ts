import {
    GET_CURRENCIES_FETCH,
    GET_CURRENCIES_SUCCESS
} from '../../constants';
import { CurrenciesAction } from './actions';

export interface CurrenciesState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialCurrenciesState: CurrenciesState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const currenciesReducer = (state = initialCurrenciesState, action: CurrenciesAction) => {
    switch (action.type) {
        case GET_CURRENCIES_FETCH:
            return {
                ...state
            };
        case GET_CURRENCIES_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        default:
            return {
                ...state,
            };
    }
};
