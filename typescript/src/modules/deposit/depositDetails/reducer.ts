import {
    ACTION_DEPOSIT_FETCH,
    ADD_DEPOSIT_FETCH,
    GET_DEPOSIT_DETAILS_FETCH,
    GET_DEPOSIT_DETAILS_SUCCESS
} from '../../constants';
import { DepositDetailsAction } from './actions';

export interface DepositDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    process: boolean;
    actionDone: boolean;
    depositAdded: boolean;
}

export const initialDepositDetailsState: DepositDetailsState = {
    data: {},
    loading: true,
    process: false,
    actionDone: false,
    depositAdded: false
};

export const depositDetailsReducer = (state = initialDepositDetailsState, action: DepositDetailsAction) => {
    switch (action.type) {
        case GET_DEPOSIT_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_DEPOSIT_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                process: false,
            };
        case ACTION_DEPOSIT_FETCH:
            return {
                ...state,
                actionDone: true,
                process: true
            };
        case ADD_DEPOSIT_FETCH:
            return {
                ...state,
                depositAdded: true
            };
        default:
            return {
                ...state,
            };
    }
};
