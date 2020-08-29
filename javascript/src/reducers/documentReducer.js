import {
    SEND_DOCUMENTS_DATA,
    SEND_DOCUMENTS_ERROR,
    SEND_DOCUMENTS_FETCH,
} from '../constants/actions';


export const initialDocumentsState = { loading: false };

function documentsReducer(state = initialDocumentsState, action) {
    switch (action.type) {
        case SEND_DOCUMENTS_FETCH:
            return {
                ...state,
                success: undefined,
                error: undefined,
                loading: true,
            };
        case SEND_DOCUMENTS_DATA:
            return {
                ...state,
                success: action.payload.message,
                error: undefined,
                loading: false,
            };
        case SEND_DOCUMENTS_ERROR:
            return {
                success: undefined,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default documentsReducer;