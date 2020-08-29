import {
    ADD_CURRENCIES_FETCH,
    EDIT_CURRENCIES_FETCH,
    GET_CURRENCIES_DETAILS_FETCH,
    GET_CURRENCIES_DETAILS_SUCCESS,
} from '../../constants';

interface CurrenciesDetailsFetchPayload {
    currency: string;
}

export interface CurrenciesDetailsSuccessPayload {
    data: CurrenciesDetailsDataInterface;
}

export interface CurrenciesDetailsDataInterface {
    name: string;
    symbol: string;
    type: string;
    deposit_enabled: boolean;
    withdrawal_enabled: boolean;
    deposit_fee: number;
    min_deposit_amount: number;
    withdraw_fee: number;
    min_withdraw_amount: number;
    withdraw_limit_24h: number;
    withdraw_limit_72h: number;
    base_factor: number;
    precision: number;
    icon_url: string;
    min_confirmations: number;
    code: string;
    blockchain_key: string;
    min_collection_amount: number;
    position: number;
    visible: boolean;
    subunits: number;
    // tslint:disable-next-line:no-any
    options: any;
    created_at: string;
    updated_at: string;
}

export interface AddCurrenciesFetchPayload {
    name: string;
    symbol: string;
    type: string;
    deposit_enabled: boolean;
    withdrawal_enabled: boolean;
    deposit_fee: number;
    min_deposit_amount: number;
    withdraw_fee: number;
    min_withdraw_amount: number;
    withdraw_limit_24h: number;
    withdraw_limit_72h: number;
    precision: number;
    icon_url: string;
    code: string;
    blockchain_key: string;
    min_collection_amount: number;
    position: number;
    visible: boolean;
    subunits: number;
    // tslint:disable-next-line:no-any
    options?: any;
}

export interface EditCurrenciesFetchPayload {
    name: string;
    symbol: string;
    type: string;
    deposit_enabled: boolean;
    withdrawal_enabled: boolean;
    deposit_fee: number;
    min_deposit_amount: number;
    withdraw_fee: number;
    min_withdraw_amount: number;
    withdraw_limit_24h: number;
    withdraw_limit_72h: number;
    precision: number;
    icon_url: string;
    code: string;
    blockchain_key: string;
    min_collection_amount: number;
    position: number;
    visible: boolean;
    subunits: number;
    // tslint:disable-next-line:no-any
    options?: any;
}

export interface GetCurrenciesDetailsFetch {
    type: typeof GET_CURRENCIES_DETAILS_FETCH;
    payload: CurrenciesDetailsFetchPayload;
}

export interface GetCurrenciesDetailsSuccess {
    type: typeof GET_CURRENCIES_DETAILS_SUCCESS;
    payload: CurrenciesDetailsSuccessPayload;
}

export interface AddCurrenciesFetch {
    type: typeof ADD_CURRENCIES_FETCH;
    payload: AddCurrenciesFetchPayload;
}

export interface EditCurrenciesFetch {
    type: typeof EDIT_CURRENCIES_FETCH;
    payload: EditCurrenciesFetchPayload;
}

export type CurrenciesDetailsAction =
    GetCurrenciesDetailsFetch
    | GetCurrenciesDetailsSuccess
    | AddCurrenciesFetch
    | EditCurrenciesFetch;

export const getCurrenciesDetails = (payload: CurrenciesDetailsFetchPayload): GetCurrenciesDetailsFetch => ({
    type: GET_CURRENCIES_DETAILS_FETCH,
    payload,
});

export const currenciesDetailsData = (payload: GetCurrenciesDetailsSuccess['payload']): GetCurrenciesDetailsSuccess => ({
    type: GET_CURRENCIES_DETAILS_SUCCESS,
    payload,
});

export const addCurrencies = (payload: AddCurrenciesFetch['payload']): AddCurrenciesFetch => ({
    type: ADD_CURRENCIES_FETCH,
    payload,
});

export const editCurrencies = (payload: EditCurrenciesFetch['payload']): EditCurrenciesFetch => ({
    type: EDIT_CURRENCIES_FETCH,
    payload,
});
