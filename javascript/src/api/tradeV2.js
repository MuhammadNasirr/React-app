import { API } from './';

export const getOrderBook = (market) => {
    return API.get(`/public/markets/${market}/order-book`, 'peatio')
        .then(response => response.data)
};

export const getTradeHistory = (market) => {
    return API.get(`/public/markets/${market}/trades?limit=30`, 'peatio')
        .then(response => response.data)
};

export const getOrder = (market, state) => {
    return API.get(`/market/orders?market=${market}&state=${state}`, 'peatio')
        .then(response => response.data)
};

export const getOrderHistory = async (market) => {
    return await Promise.all([getOrder(market, 'cancel'), getOrder(market, 'done')]);
};

export const getAllTickers = () => {
    return API.get(`/public/markets/tickers`, 'peatio')
        .then(response => response.data);
};

export const cancelOrder = (id) => {
    return API.post(`/market/orders/${id}/cancel`, 'peatio')
        .then(response => response.data);
};

export const createOrder = (market, side, volume, ord_type, price) => {
    return API.post('/market/orders', {
        market, side, volume, ord_type, price
    }, 'peatio').then(response => response.data)
};

export const getKline = (market, resolution, from, to) => {
    return API.get(`/public/markets/${market}/k-line?period=${resolution}&time_from=${from}&time_to=${to}`, 'peatio')
        .then(response => response.data)
};
