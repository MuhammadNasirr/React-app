import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions/wallet';
import * as types from '../constants/actions';
import { getWalletData, getWalletAddress, getCompoundData, getMxn } from '../api/wallet';
import { push } from 'connected-react-router';
import { fetchHistory, fetchHistoryMXN } from '../actions/history';
import { fetchInvestment } from '../actions/investment';
import { alertPush } from '../actions/alert'

// Saga sets available wallets
export function* fetchCompound() {
  try {
    const [accounts, investment, rate, annualPercent] = yield call(getCompoundData);
    const wallets = yield select(state => state.wallet.list);
    // Adding compound wallet data
    if (accounts.length && rate.length
      && Object.keys(wallets).length
    ) {
    const id = accounts[0].currency_id;
    const balance = accounts[0].balance;
    const c_balance = accounts[0].c_balance;
    const exchange_rate = rate[0].dai_cdai;
    const investment_balance = c_balance * exchange_rate;
    const earned = investment_balance - balance;
    const available_balance = wallets['dai'].balance;
    const precision = wallets['dai'].precision;
    const apy = annualPercent.apy;
    const currency = annualPercent.currency;

    wallets.compound = {
      id: id,
      name: "Earn Interests Daily",
      symbol: "D",
      balance: balance,
      c_balance: c_balance,
      investment_balance: investment_balance,
      available_balance: available_balance,
      earned: earned,
      precision: precision,
      icon_url: "https://compound.finance/images/compound-mark.svg",
      type: "compound",
      investment: investment,
      withdrawal_enabled: true,
      withdraw_fee: 0,
      apy: apy,
      currency: currency
    }

    yield put(actions.successCompoundData(wallets));
    }
  } catch (error) {
    yield put(actions.failCompoundData());
  }
}

export function* fetchCompoundSaga() {
  yield takeEvery(types.FETCH_COMPOUND_DATA, fetchCompound);
}
export function* fetchWallet() {
  try {
    const [balances, currencies] = yield call(getWalletData);
    const walletData = balances.reduce((prev, { currency: id, balance, locked }) => {
      const currency = currencies.find(item => id === item.id);
      if (!currency) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...currency,
          withdraw_fee: parseFloat(currency.withdraw_fee),
          balance: +balance,
          locked: +locked,
          address: null,
        }
      };
    }, {});

    walletData.compound = {
      id: "dai",
      name: "Earn Interests Daily",
      symbol: "D",
      balance: 0,
      investment_balance: 0,
      available_balance: 0,
      earned: 0,
      icon_url: "https://compound.finance/images/compound-mark.svg",
      locked: 0,
      precision: 2,
      type: "compound",
      investment: 0,
      withdrawal_enabled: true,
      withdraw_fee: 0,
      apy: 0,
      currency: 'cDAI'
    }

    yield put(actions.successWalletData(walletData));
    yield put(actions.fetchCompoundData());
    if (window.location.pathname !== '/trade' && window.location.pathname.indexOf('/trading') === -1) {
      const id = Object.keys(walletData)[0];
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('currency');
      if(myParam !== id){
        yield put(push(`/wallets/deposit?currency=${id}`));
      }
      if (myParam !== "compound") {
        yield put(push(`/wallets/deposit?currency=${id}`));
        yield put(actions.setActiveWallet(Object.keys(walletData)[0]));
      }
    }
  } catch (error) {
    yield put(actions.failWalletData());
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* fetchWalletSaga() {
  yield takeEvery(types.FETCH_WALLET_DATA, fetchWallet);
}

// Saga sets active wallet
function* setActiveWallet({ payload: { id } }) {
  if (id !== undefined) {
    yield put(push(`/wallets/deposit?currency=${id}`));
    const wallets = yield select(state => state.wallet.list);

    if (!wallets[id].address) {
      yield put(actions.fetchWalletAddress(id));
    }
    if (id === 'compound') {
      yield put(fetchInvestment('deposits')); // investments fetch first by default
    }
    else {
      yield put(fetchHistory('deposits')); // deposits fetch first by default
      if (id === 'mxn') {
        yield put(fetchHistoryMXN());
      }
    }
  }
}

export function* setActiveWalletSaga() {
  yield takeEvery(types.SET_ACTIVE_WALLET, setActiveWallet);
}

// Saga sets wallet address
function* fetchWalletAddress({ payload: { id } }) {
  const wallets = yield select(state => state.wallet.list);

  try {
    const type = wallets[id].type;
    const deposit_enabled = wallets[id].deposit_enabled;
    if (type === 'coin' && deposit_enabled) {
      const { address } = yield call(getWalletAddress, id);
      wallets[id].address = address;
    }
    yield put(actions.successWalletAddress(wallets));
  } catch (error) {
    wallets[id].address = null;
    yield put(actions.failWalletAddress(wallets));
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}


function* fetchMxn() {
  try {
    const res = yield call(getMxn);
    yield put(actions.successCurrencyMxn(res));
  } catch (error) {
    yield put(actions.failCurrencyMxn());
    // yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* fetchMxnSaga() {
  yield takeEvery(types.FETCH_MXN_CURRENCY, fetchMxn);
}

export function* fetchWalletAddressSaga() {
  yield takeEvery(types.FETCH_WALLET_ADDRESS, fetchWalletAddress);
}

