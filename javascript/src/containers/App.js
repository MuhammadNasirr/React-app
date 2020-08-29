/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WalletPage from './WalletPage';
import TradePage from './TradePage';
import { IntlProvider } from 'react-intl';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPage from './ForgotPage';
import ConfirmationPage from './ConfirmationPage';
import Help from './Help';
import Faq from './Faq';
import TermsAndCondition from './TermsAndCondition';
import AboutUs from './AboutUs';
import VerificationPage from './VerificationPage';
import ProfilePage from './ProfilePage';
import ConfirmPage from './ConfirmPage';
import ResetPasswordPage from './ResetPasswordPage';
import TradingPage from './TradingPage';
import History from './History';
import SupportPage from './Support';
import SecurityPage from './Security';
import AccountManagementPage from './AccountManagement';
// import Home from './Home';
// import TransactionList from './TransactionList';
// import AccountFunding from './AccountFunding';
import actions from "../actions";
import PrivateRoute from '../components/PrivateRoute';
import TradeRoute from '../components/TradeRoute';
import SnackBar from '../components/SnackBar';
import { history } from '../history';
import { color, muiTheme } from '../styles/main'
import * as ReactGA from 'react-ga';
import { gaTrackerKey, gtmKey } from '../config';
import TagManager from 'react-gtm-module'

const publicRoutes = [
  'login',
  'signup',
  'forgot',
  'accounts',
  'email-verification',
  'faq',
  'support',
  'account-management',
  'security',
  ''
];

const tagManagerArgs = {
  gtmId: gtmKey()
}
TagManager.initialize(tagManagerArgs)

const gaKey = gaTrackerKey();

if (gaKey) {
  ReactGA.initialize(gaKey);
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}


class App extends Component {

  componentDidMount() {
    const pathname = this.getCurrentRoute();
    if (!publicRoutes.includes(pathname)) {
      this.props.actions.fetchUser();
    }
    ReactGA.pageview(location.pathname);
  }

  getCurrentRoute = () => {
    var pathname = window.location.pathname;
    pathname.indexOf(1);
    pathname.toLowerCase();
    pathname = pathname.split("/")[1];
    return pathname
  }

  render() {
    const { isFetching, user, locale } = this.props;
    const { lang, messages } = locale;
    let isAuthenticated = false;
    if (user) {
      isAuthenticated = user.email && user.state === 'active';
    }

    return (
      <IntlProvider locale={lang} messages={messages} key={lang}>
        <MuiThemeProvider theme={muiTheme}>
          <SnackBar />
          <div style={{ backgroundColor: color.backgroundColorDark }}>
            <Switch>
              <Route exact path="/" render={() => <LandingPage history={history} />} />
              <Redirect exact from='/' to='/wallets' />
              <Route exact path="/login" render={() => <LoginPage history={history} />} />
              <Route exact path="/support" render={() => <SupportPage history={history} />} />
              <Route exact path="/security" render={() => <SecurityPage history={history} />} />
              <Route exact path="/account-management" render={() => <AccountManagementPage history={history} />} />
              <Route exact path="/signup" render={() => <RegisterPage history={history} />} />
              <Route exact path="/forgot" render={() => <ForgotPage history={history} />} />
              <Route exact path="/accounts/password_reset" render={() => <ResetPasswordPage history={history} />} />
              <Route exact path="/accounts/confirmation" render={() => <ConfirmationPage history={history} />} />
              <Route exact path="/email-verification" render={() => <VerificationPage history={history} />} />
              <Route exact path="/faq" render={() => <Faq history={history} />} />
              <Route path="/terms" render={() => <TermsAndCondition history={history} />} isLoading={isFetching} />
              <Route path="/about-us" render={() => <AboutUs history={history} />} isLoading={isFetching} />
              <TradeRoute exact path="/trading/:market" render={() => <TradingPage history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              {/* <PrivateRoute path="/wallets/fund/dai" render={() => <AccountFunding history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} /> */}
              {/* <PrivateRoute path="/wallets/history" render={() => <TransactionList history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} /> */}
              {/* <PrivateRoute path="/wallets" render={() => <Home history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} /> */}
              <PrivateRoute path="/wallets" render={() => <WalletPage history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <PrivateRoute path="/help" render={() => <Help history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <PrivateRoute path="/history" render={() => <History history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <PrivateRoute exact path="/trade" render={() => <TradePage history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <PrivateRoute path="/profile" render={() => <ProfilePage history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <PrivateRoute path="/confirm" render={() => <ConfirmPage history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <Route path='*' exact render={() => <TradingPage history={history} />} isAuthenticated={isAuthenticated} isLoading={isFetching} />
              <Redirect from='*' to="/trading/:market" />
            </Switch>
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}


export default withRouter(connect(state => ({
  user: state.user.data,
  isFetching: state.user.isFetching,
  locale: state.i18n,
}), actions)(App));
