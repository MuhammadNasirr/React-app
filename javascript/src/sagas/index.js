import { all } from 'redux-saga/effects';
import { fetchUserSaga } from './user';
import { fetchWalletSaga, setActiveWalletSaga, fetchWalletAddressSaga,fetchCompoundSaga,fetchMxnSaga } from './wallet';
import { fetchHistorySaga } from './history';
import { createTradeSaga, fetchMarketsSaga, fetchBalancesSaga, fetchTickersSaga } from './trade';
import { fetchSubmitWithdrawSaga } from './withdraw';
import { fetchLogoutSaga, fetchLoginSaga } from './auth';
import { fetchDepthSaga } from './depth';
import { fetchSubmitDepositSaga ,fetchAcountSaga} from './deposit';
import { fetchInvestmentSaga } from './investment';
import {
  fetchOrderBookSaga,
  fetchTradeHistorySaga,
  fetchOpenOrderSaga,
  fetchOrderHistorySaga,
  fetchAllTickersSaga,
  fetchCancelOrderSaga,
  fetchCreateOrderSaga,
  fetchklineSaga,
  fetchDepthsSaga
} from './tradev2';
import { rangerSaga } from './ranger';
import { handleKlineFetchSaga } from './kline';
import { handleAlertSaga } from './alert';
import { rootSendDocumentsSaga } from './document';

export default function* rootSaga() {
  yield all([
    fetchUserSaga(),
    fetchWalletSaga(),
    fetchCompoundSaga(),
    setActiveWalletSaga(),
    fetchWalletAddressSaga(),
    createTradeSaga(),
    rootSendDocumentsSaga(),
    fetchMarketsSaga(),
    fetchBalancesSaga(),
    fetchTickersSaga(),
    fetchHistorySaga(),
    fetchSubmitWithdrawSaga(),
    fetchLogoutSaga(),
    fetchLoginSaga(),
    fetchDepthSaga(),
    fetchOrderBookSaga(),
    fetchTradeHistorySaga(),
    fetchOpenOrderSaga(),
    fetchOrderHistorySaga(),
    fetchAllTickersSaga(),
    fetchCancelOrderSaga(),
    fetchCreateOrderSaga(),
    fetchklineSaga(),
    fetchDepthsSaga(),
    handleKlineFetchSaga(),
    handleAlertSaga(),
    fetchMxnSaga(),
    rangerSaga(),
    fetchSubmitDepositSaga(),
    fetchInvestmentSaga(),
    fetchAcountSaga(),
  ]);
}
