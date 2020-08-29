import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import walletReducer from './walletReducer';
import userReducer from './userReducer';
import historyReducer from './historyReducer';
import withdrawReducer from './withdrawReducer';
import authReducer from './authReducer';
import tradeReducer from './tradeReducer';
import depthReducer from './depthReducer';
import tradeV2Reducer from './tradeV2Reducer';
import rangerReducer from './rangerReducer';
import klineReducer from './klineReducer';
import translationReducer from './translationReducer';
import alertReducer from './alertReducer';
import documentsReducer from './documentReducer';
import depositReducer from './depositReducer';
import investmentReducer from './investmentReducer';

export default combineReducers({
  wallet: walletReducer,
  user: userReducer,
  history: historyReducer,
  withdraw: withdrawReducer,
  trade: tradeReducer,
  auth: authReducer,
  depth: depthReducer,
  tradev2: tradeV2Reducer,
  ranger: rangerReducer,
  kline: klineReducer,
  i18n: translationReducer,
  alert: alertReducer,
  documents: documentsReducer,
  deposit: depositReducer,
  investment: investmentReducer,
  router: connectRouter(history)
});
