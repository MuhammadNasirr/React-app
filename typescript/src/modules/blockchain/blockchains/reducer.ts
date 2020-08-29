import {
    GET_BLOCKCHAINS_FETCH,
    GET_BLOCKCHAINS_SUCCESS
} from '../../constants';
import { BlockchainsAction } from './actions';

export interface BlockchainsState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialBlockchainsState: BlockchainsState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const blockchainsReducer = (state = initialBlockchainsState, action: BlockchainsAction) => {
    switch (action.type) {
        case GET_BLOCKCHAINS_FETCH:
            return {
                ...state
            };
        case GET_BLOCKCHAINS_SUCCESS:
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
