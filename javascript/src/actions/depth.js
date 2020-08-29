import { DEPTH_DATA, DEPTH_ERROR, DEPTH_FETCH } from '../constants/actions';


export const depthFetch = (payload) => ({
    type: DEPTH_FETCH,
    payload,
});
export const depthData = (payload) => ({
    type: DEPTH_DATA,
    payload,
});
export const depthError = (error) => ({
    type: DEPTH_ERROR,
    error,
});

