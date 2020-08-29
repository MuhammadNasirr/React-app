import { CHANGE_LANGUAGE, } from '../constants/actions';
export const changeLanguage = (payload) => ({
    type: CHANGE_LANGUAGE,
    payload,
});