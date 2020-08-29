import {
    ADD_CURRENCIES_FETCH,
    EDIT_CURRENCIES_FETCH,
    GET_CURRENCIES_DETAILS_FETCH,
    GET_CURRENCIES_DETAILS_SUCCESS,
} from '../../constants';
import { CurrenciesDetailsAction } from './actions';

export interface CurrenciesDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    currencyAdded: boolean;
    currencyEdited: boolean;
}

export const initialCurrenciesDetailsState: CurrenciesDetailsState = {
    data: {},
    loading: true,
    currencyAdded: false,
    currencyEdited: false
};

export const currencyDetailsReducer = (state = initialCurrenciesDetailsState, action: CurrenciesDetailsAction) => {
    switch (action.type) {
        case GET_CURRENCIES_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_CURRENCIES_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ADD_CURRENCIES_FETCH:
            return {
                ...state,
                currencyAdded: true
            };
        case EDIT_CURRENCIES_FETCH:
            return {
                ...state,
                currencyEdited: true
            };
        default:
            return {
                ...state,
            };
    }
};
