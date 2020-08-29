// RESOURCES ENDPOINTS
export const currentUser = 'api/v2/barong/resource/users/me';
export const verification = 'api/v2/barong/resource/labels';
export const activity = 'api/v2/barong/resource/users/activity/all';
export const updatePassword = 'api/v2/barong/resource/users/password';
export const otp = 'api/v2/barong/resource/otp/enable';
export const disable_otp = 'api/v2/barong/resource/otp/disable';
export const phones = 'api/v2/barong/resource/phones';
export const resend_code = 'api/v2/barong/resource/phones/send_code';
export const verifyPhones = 'api/v2/barong/resource/phones/verify';
export const profiles = 'api/v2/barong/resource/profiles';
export const documents = 'api/v2/barong/resource/documents';
export const apikeys = 'api/v2/barong/resource/api_keys';
export const generate_qrcode = 'api/v2/barong/resource/otp/generate_qrcode';

// IDENTITY ENDPOINTS
export const user = '/api/v2/barong/identity/users';
export const generateCode = 'api/v2/barong/identity/users/password/generate_code';
export const confirmCode = 'api/v2/barong/identity/users/password/confirm_code';
export const emailConfirmCode = 'api/v2/barong/identity/users/email/confirm_code';

// PUBLIC ENDPOINTS
export const markets = 'api/v2/peatio/public/markets';
export const tradeHistory = 'api/v2/peatio/market/trades';
export const balances = 'api/v2/peatio/account/balances';
export const currencies = 'api/v2/peatio/public/currencies';
export const marketOrders = 'api/v2/peatio/market/orders';


//NEWS ENDPOINT
export const newsHost = 'https://newsapi.org';
export const news = '/v2/top-headlines?sources=crypto-coins-news&page=0&pageSize=12&apiKey=03e91efe53924bceb2ee9fdf84b1a136';

//CRYPTOCOMPARE ENDPOINT
export const  cryptoHost = 'https://min-api.cryptocompare.com';
export const cryptoCompare = '/data/price';

//GOOGLE AUTHENTICATOR QRCODE
export const googleQRCode = "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";

