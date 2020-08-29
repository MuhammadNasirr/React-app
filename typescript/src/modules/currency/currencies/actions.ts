import {
    GET_CURRENCIES_FETCH,
    GET_CURRENCIES_SUCCESS
} from '../../constants';

interface CurrenciesFetchPayload {
    page: number;
    limit: number;
}

export interface CurrenciesSuccessPayload {
    list: CurrenciesDataInterface[];
    page: number;
    total: number;
}

export interface CurrenciesDataInterface {
    name: string;
    symbol: string;
    type: string;
    deposit_enabled: boolean;
    withdrawal_enabled: boolean;
    deposit_fee: string;
    min_deposit_amount: string;
    withdraw_fee: string;
    min_withdraw_amount: string;
    withdraw_limit_24h: string;
    withdraw_limit_72h: string;
    base_factor: number;
    precision: number;
    icon_url: string;
    min_confirmations: number;
    code: string;
    blockchain_key: string;
    min_collection_amount: string;
    position: number;
    visible: boolean;
    subunits: number;
    // tslint:disable-next-line:no-any
    options: any;
    created_at: string;
    updated_at: string;
}

export interface GetCurrenciesFetch {
    type: typeof GET_CURRENCIES_FETCH;
    payload: CurrenciesFetchPayload;
}

export interface GetCurrenciesSuccess {
    type: typeof GET_CURRENCIES_SUCCESS;
    payload: CurrenciesSuccessPayload;
}

export type CurrenciesAction =
    GetCurrenciesFetch
    | GetCurrenciesSuccess;

export const getCurrencies = (payload: CurrenciesFetchPayload): GetCurrenciesFetch => ({
    type: GET_CURRENCIES_FETCH,
    payload,
});

export const currenciesData = (payload: GetCurrenciesSuccess['payload']): GetCurrenciesSuccess => ({
    type: GET_CURRENCIES_SUCCESS,
    payload,
});
