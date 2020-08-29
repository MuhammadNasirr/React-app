import {
    ADD_MARKETS_FETCH,
    EDIT_MARKETS_FETCH,
    GET_MARKETS_DETAILS_FETCH,
    GET_MARKETS_DETAILS_SUCCESS,
} from '../../constants';

interface MarketsDetailsFetchPayload {
    id: string;
}

export interface MarketsDetailsSuccessPayload {
    data: MarketsDetailsDataInterface;
}

export interface MarketsDetailsDataInterface {
    id: string;
    name: string;
    base_unit: string;
    quote_unit: string;
    min_price: string;
    max_price: string;
    min_amount: string;
    amount_precision: number;
    price_precision: number;
    state: string;
    position: number;
    created_at: string;
    updated_at: string;
}

export interface AddMarketsFetchPayload {
    base_currency: string;
    quote_currency: string;
    min_price: number;
    max_price: number;
    min_amount: number;
    amount_precision: number;
    price_precision: number;
    state: string;
    position: number;
}

export interface EditMarketsFetchPayload {
    id: string;
    min_price: number;
    max_price: number;
    min_amount: number;
    state: string;
    position: number;
}

export interface GetMarketsDetailsFetch {
    type: typeof GET_MARKETS_DETAILS_FETCH;
    payload: MarketsDetailsFetchPayload;
}

export interface GetMarketsDetailsSuccess {
    type: typeof GET_MARKETS_DETAILS_SUCCESS;
    payload: MarketsDetailsSuccessPayload;
}

export interface AddMarketsFetch {
    type: typeof ADD_MARKETS_FETCH;
    payload: AddMarketsFetchPayload;
}

export interface EditMarketsFetch {
    type: typeof EDIT_MARKETS_FETCH;
    payload: EditMarketsFetchPayload;
}

export type MarketsDetailsAction =
    GetMarketsDetailsFetch
    | GetMarketsDetailsSuccess
    | AddMarketsFetch
    | EditMarketsFetch;

export const getMarketsDetails = (payload: MarketsDetailsFetchPayload): GetMarketsDetailsFetch => ({
    type: GET_MARKETS_DETAILS_FETCH,
    payload,
});

export const marketsDetailsData = (payload: GetMarketsDetailsSuccess['payload']): GetMarketsDetailsSuccess => ({
    type: GET_MARKETS_DETAILS_SUCCESS,
    payload,
});

export const addMarkets = (payload: AddMarketsFetch['payload']): AddMarketsFetch => ({
    type: ADD_MARKETS_FETCH,
    payload,
});

export const editMarkets = (payload: EditMarketsFetch['payload']): EditMarketsFetch => ({
    type: EDIT_MARKETS_FETCH,
    payload,
});
