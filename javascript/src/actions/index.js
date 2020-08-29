import { bindActionCreators } from 'redux';
import * as userActions from './user';
import * as walletActions from './wallet';
import * as trade from './trade';
import * as historyActions from './history';
import * as withdrawActions from './withdraw';
import * as authActions from './auth';
import * as depthActions from './depth';
import * as tradeV2Actions from './tradeV2';
import * as rangerActions from './ranger';
import * as alertActions from './alert';
import * as documentActions from './document';
import * as depositActions from './deposit';

export default dispatch => ({
  actions: bindActionCreators({
    ...historyActions,
    ...userActions,
    ...walletActions,
    ...trade,
    ...withdrawActions,
    ...authActions,
    ...depthActions,
    ...tradeV2Actions,
    ...rangerActions,
    ...alertActions,
    ...documentActions,
    ...depositActions
  }, dispatch)
});
