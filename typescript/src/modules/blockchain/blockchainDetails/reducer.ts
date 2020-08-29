import {
    ADD_BLOCKCHAINS_FETCH,
    EDIT_BLOCKCHAINS_FETCH,
    GET_BLOCKCHAINS_DETAILS_FETCH,
    GET_BLOCKCHAINS_DETAILS_SUCCESS,
} from '../../constants';
import { BlockchainDetailsAction } from './actions';

export interface BlockchainDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    blockchainAdded: boolean;
    blockchainEdited: boolean;
}

export const initialBlockchainDetailsState: BlockchainDetailsState = {
    data: {},
    loading: true,
    blockchainAdded: false,
    blockchainEdited: false
};

export const blockchainDetailsReducer = (state = initialBlockchainDetailsState, action: BlockchainDetailsAction) => {
    switch (action.type) {
        case GET_BLOCKCHAINS_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_BLOCKCHAINS_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ADD_BLOCKCHAINS_FETCH:
            return {
                ...state,
                blokchainAdded: true
            };
        case EDIT_BLOCKCHAINS_FETCH:
            return {
                ...state,
                blockchainEdited: true
            };
        default:
            return {
                ...state,
            };
    }
};
