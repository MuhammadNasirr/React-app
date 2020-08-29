import {
    GET_WALLETS_FETCH,
    GET_WALLETS_SUCCESS
} from '../../constants';
import { WalletsAction } from './actions';

export interface WalletsState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialWalletsState: WalletsState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const walletsReducer = (state = initialWalletsState, action: WalletsAction) => {
    switch (action.type) {
        case GET_WALLETS_FETCH:
            return {
                ...state
            };
        case GET_WALLETS_SUCCESS:
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
