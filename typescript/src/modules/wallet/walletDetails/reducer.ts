import {
    ADD_WALLETS_FETCH,
    EDIT_WALLETS_FETCH,
    GET_WALLETS_DETAILS_FETCH,
    GET_WALLETS_DETAILS_SUCCESS,
} from '../../constants';
import { WalletDetailsAction } from './actions';

export interface WalletDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    walletAdded: boolean;
    walletEdited: boolean;
}

export const initialWalletDetailsState: WalletDetailsState = {
    data: {},
    loading: true,
    walletAdded: false,
    walletEdited: false
};

export const walletDetailsReducer = (state = initialWalletDetailsState, action: WalletDetailsAction) => {
    switch (action.type) {
        case GET_WALLETS_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_WALLETS_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ADD_WALLETS_FETCH:
            return {
                ...state,
                walletAdded: true
            };
        case EDIT_WALLETS_FETCH:
            return {
                ...state,
                walletEdited: true
            };
        default:
            return {
                ...state,
            };
    }
};
