import makeRequest from './requestBuilder';
import { barongUrl, peatioUrl, fiatlogicUrl,compoundUrl } from '../config';

const getAPI = () => ({
    barong: `${barongUrl()}`,
    fiatlogic: `${fiatlogicUrl()}`,
    peatio: `${peatioUrl()}`,
    compound: `${compoundUrl()}`
});

const api = getAPI();

export const API = {
    get: (url, apiVersion) =>
        makeRequest({
            method: 'get',
            url,
            baseURL: api[apiVersion]
        }),

    post: (url, data, apiVersion) =>
        makeRequest({
            method: 'post',
            data,
            url,
            baseURL: api[apiVersion]
        }),

    patch: (url, data, apiVersion) =>
        makeRequest({
            method: 'patch',
            data,
            url,
            baseURL: api[apiVersion]
        }),

    put: (url, data, apiVersion) =>
        makeRequest({
            method: 'put',
            data,
            url,
            baseURL: api[apiVersion]
        }),

    delete: (url, apiVersion) =>
        makeRequest({
            method: 'delete',
            url,
            baseURL: api[apiVersion]
        }),
};
