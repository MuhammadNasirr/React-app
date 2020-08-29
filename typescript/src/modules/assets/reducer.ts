import {
    GET_ASSETS_FETCH,
    GET_ASSETS_SUCCESS
} from '../constants';
import { AssetsAction } from './actions';

export interface AssetsState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialAssetsState: AssetsState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const assetsReducer = (state = initialAssetsState, action: AssetsAction) => {
    switch (action.type) {
        case GET_ASSETS_FETCH:
            return {
                ...state
            };
        case GET_ASSETS_SUCCESS:
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
