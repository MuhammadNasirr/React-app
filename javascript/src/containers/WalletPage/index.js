/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Helmet } from "react-helmet";
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid/Grid';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import Loader from '../../components/Loader'
import { connect } from 'react-redux';
import SideBar from '../../components/Wallet/Sidebar';
import WalletLayout from '../../components/Wallet/WalletLayout';
import Deposit from '../../components/Wallet/Deposit';
import Withdraw from '../../components/Wallet/Withdraw';
import History from '../../components/Wallet/History';
import Layout from '../Layout';
import { fetchWalletData, fetchWalletAddress, setActiveWallet, filterCoins, fetchCurrencyMxn } from '../../actions/wallet';
import { fetchMarkets } from '../../actions/trade'
import { fetchHistory, fetchHistoryMXN } from '../../actions/history';
import { fetchInvestment } from '../../actions/investment';
import { handleChangeWithdraw, fetchSubmitWithdraw, closeSnackbar } from '../../actions/withdraw';
import { fetchSubmitDeposit, handleChangeCompoundModal, clearDepositModalState } from '../../actions/deposit';
import { generateQRCode } from '../../api/user';
import { getMxn } from '../../api/wallet';
import { setOtp } from '../../actions/user';
import { setMarket, fetchAllTickers } from '../../actions/tradeV2';
import { alertPush } from '../../actions/alert'
import { styles } from '../../styles/main'
import { tidioID } from '../../config';
import Typography from '@material-ui/core/Typography/Typography';

class WalletPage extends Component {
  timer
  state = {
    qrcode: '',
  }

  componentDidMount() {
    this.props.fetchWalletData();
    this.props.fetchMarkets();
    this.props.fetchHistoryMXN();
    this.props.fetchAllTickers();
    if (!this.props.user.otp) {                      // Calling when 2fa is disabled
      this.getQRCode()
    }
    this.props.fetchCurrencyMxn();
    this.timer = setInterval(() => {
      this.props.fetchCurrencyMxn();
    }, 1000 * 60 * 20);
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('currency');
    if (param === "compound") {
      this.props.fetchInvestment('deposits');
    }
    else {
      this.props.fetchHistory();
    }
    if (document.getElementById("tidio-chat")) {
      document.getElementById("tidio-chat").style.display = "block";
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    if (document.getElementById("tidio-chat")) {
      document.getElementById("tidio-chat").style.display = "none";
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markets.length) {
      let currentMarket = nextProps.markets.length && nextProps.markets[0];
      if (!this.props.currentMarket) {
        this.props.setMarket(currentMarket)                // setting current market obj in reducer
      }
    }
  }

  getQRCode = () => {
    generateQRCode().then(res => {
      if (res.status === 201) {
        this.setState({ qrcode: res.data.data });
      }
    })
      .catch(res => {
      })
  };

  onClose = (event) => {
    this.props.handleSnackbar()
  };

  submitDeposit = (amount) => {
    this.props.fetchSubmitDeposit(amount)
  };

  //FIXME: query the correct history
  filterHistory = list => list.filter(item => item.currency === this.props.activeWallet);

  render() {
    const {
      location,
      activeWallet,
      wallets,
      rid,
      amount,
      otp,
      withdrawIsFetching,
      withdrawHistory,
      depositHistory,
      setActiveWallet,
      fetchWalletAddress,
      fetchSubmitWithdraw,
      fetchSubmitDeposit,
      handleChangeWithdraw,
      handleChangeCompoundModal,
      user,
      depositInvestment,
      withdrawInvestment,
      setOtp,
      filterCoins,
      coins,
      compoundError,
      isCompoundFetching,
      depositAmount,
      depositDone,
      clearDepositModalState,
      mxn,
      withdrawsMXNHistory,
      depositMXNHistory,
      amountMXN
    } = this.props;
    let isAuthenticated = false;
    if (user) {
      isAuthenticated = user.email && user.state === 'active';
    }
    const getKey = tidioID();
    return (
      <Layout>
        {
          (isAuthenticated && getKey) ?
            <Helmet>
              <script src={`//code.tidio.co/${getKey}.js`} async></script>
            </Helmet>
            :
            <Helmet>
              <noscript></noscript>
            </Helmet>
        }
        {
          !Object.keys(wallets).length ?
            <Loader classes={this.props.classes} />
            :
            <React.Fragment>
              <SideBar
                wallets={wallets}
                activeWallet={activeWallet}
                setActiveWallet={setActiveWallet}
                fetchWalletAddress={fetchWalletAddress}
                filterCoins={filterCoins}
                coins={coins}
                mxn={mxn}
              />
              <WalletLayout location={location} activeWallet={activeWallet} wallets={wallets} intl={this.props.intl}>
                <Switch>
                  <Route
                    path="/wallets/deposit"
                    render={() => (
                      wallets[activeWallet] && activeWallet ? <div>
                        <Deposit
                          currency={wallets[activeWallet]}
                          wallet={wallets[activeWallet]}
                          intl={this.props.intl}
                          amount={amountMXN}
                          depositAmount={depositAmount}
                          depositDone={depositDone}
                          clearDepositModalState={clearDepositModalState}
                          onChangeModal={handleChangeCompoundModal}
                          submitDeposit={this.submitDeposit}
                          loading={this.props.loading}
                          onChange={handleChangeWithdraw}
                          onClick={fetchSubmitDeposit}
                          dai={wallets["dai"]}
                          mxn={mxn}
                          user={user}
                          alertPush={this.props.alertPush}
                          isCompoundFetching={isCompoundFetching}
                        />
                        {
                          activeWallet === 'mxn' ?
                            <React.Fragment>
                              {
                                depositMXNHistory && depositMXNHistory.length > 0 &&
                                <History
                                  type={'deposit'}
                                  historyType={"mxn"}
                                  history={depositMXNHistory}
                                  intl={this.props.intl}
                                />
                              }
                            </React.Fragment>
                            :
                            <React.Fragment>
                              {
                                (
                                  (wallets[activeWallet].type === 'compound' && depositInvestment.length > 0) ||
                                  (wallets[activeWallet].type !== 'compound' && this.filterHistory(depositHistory).length > 0)) &&
                                <History
                                  type={'deposit'}
                                  history={wallets[activeWallet].type === 'compound' ? depositInvestment.slice(0, 2) : this.filterHistory(depositHistory)}
                                  coinType={wallets[activeWallet].type}
                                  intl={this.props.intl}
                                />
                              }
                            </React.Fragment>
                        }

                      </div>
                        :
                        <div />
                    )}
                  />
                  <Route
                    path="/wallets/withdrawal"
                    render={() => (
                      wallets[activeWallet] && activeWallet ? <div>
                        <React.Fragment>
                          {
                            withdrawIsFetching ?
                              <Grid container justify="center" alignItems="center" className={this.props.classes.withdrawLoader}>
                                <Loader classes={this.props.classes} />
                              </Grid>
                              :
                              <div>
                                {
                                  wallets[activeWallet].type === 'compound' && compoundError ?
                                    <Typography variant="h2" className={this.props.classes.primaryText} >{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.compound.error' })}</Typography>
                                    :
                                    <>
                                      <Withdraw
                                        currency={wallets[activeWallet]}
                                        onChange={handleChangeWithdraw}
                                        rid={rid}
                                        amount={amount}
                                        dai={wallets["dai"]}
                                        mxn={mxn}
                                        otp={otp}
                                        submitting={withdrawIsFetching}
                                        onSubmitWithdraw={fetchSubmitWithdraw}
                                        onClick={fetchSubmitWithdraw}
                                        user={user}
                                        qrcode={this.state.qrcode}
                                        setOtp={setOtp}
                                        intl={this.props.intl}
                                        alertPush={this.props.alertPush}
                                      />
                                      {
                                        activeWallet === 'mxn' ?
                                          <React.Fragment>
                                            {
                                              withdrawsMXNHistory.length > 0 &&
                                              <History
                                                type={'withdraw'}
                                                historyType={"mxn"}
                                                history={withdrawsMXNHistory}
                                                intl={this.props.intl}
                                              />
                                            }
                                          </React.Fragment>
                                          :
                                          <React.Fragment>
                                            {
                                              (
                                                (wallets[activeWallet].type === 'compound' && withdrawInvestment.length > 0) ||
                                                (wallets[activeWallet].type !== 'compound' && this.filterHistory(withdrawHistory).length > 0)) &&
                                              <History
                                                type={'withdraw'}
                                                history={wallets[activeWallet].type === 'compound' ? withdrawInvestment.slice(0, 2) : this.filterHistory(withdrawHistory)}
                                                coinType={wallets[activeWallet].type}
                                                intl={this.props.intl}
                                              />
                                            }
                                          </React.Fragment>
                                      }
                                    </>
                                }
                              </div>
                          }
                        </React.Fragment>
                      </div>
                        :
                        <div />
                    )}
                  />
                </Switch>
              </WalletLayout>
            </React.Fragment>
        }

      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.wallet.list,
    mxn: state.wallet.mxn,
    activeWallet: state.wallet.activeWallet,
    depositHistory: state.history.deposits,
    depositInvestment: state.investment.deposits,
    withdrawInvestment: state.investment.withdraws,
    compoundError: state.wallet.compoundError,
    compoundDone: state.wallet.compoundDone,
    isCompoundFetching: state.wallet.isCompoundFetching,
    depositMXNHistory: state.history.depositsMXN,
    withdrawHistory: state.history.withdraws,
    withdrawsMXNHistory: state.history.withdrawsMXN,
    rid: state.withdraw.rid,
    open: state.withdraw.open,
    variant: state.withdraw.variant,
    error: state.withdraw.error,
    amount: state.withdraw.amount,
    amountMXN: state.withdraw.amountMXN,
    otp: state.withdraw.otp,
    withdrawIsFetching: state.withdraw.isFetching,
    user: state.user.data,
    markets: state.trade.markets,
    currentMarket: state.tradev2.market,
    coins: state.wallet.coins,
    loading: state.deposit.loading,
    depositAmount: state.deposit.amount,
    depositDone: state.deposit.depositDone,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWalletData: () => dispatch(fetchWalletData()),
    setActiveWallet: id => dispatch(setActiveWallet(id)),
    fetchWalletAddress: id => dispatch(fetchWalletAddress(id)),
    fetchHistory: () => dispatch(fetchHistory()),
    fetchInvestment: () => dispatch(fetchInvestment()),
    fetchHistoryMXN: () => dispatch(fetchHistoryMXN()),
    fetchSubmitWithdraw: () => dispatch(fetchSubmitWithdraw()),
    fetchSubmitDeposit: () => dispatch(fetchSubmitDeposit()),
    handleSnackbar: () => dispatch(closeSnackbar()),
    handleChangeWithdraw: (field, value) => dispatch(handleChangeWithdraw(field, value)),
    clearDepositModalState: () => dispatch(clearDepositModalState()),
    handleChangeCompoundModal: (field, value) => dispatch(handleChangeCompoundModal(field, value)),
    setOtp: (value) => dispatch(setOtp(value)),
    alertPush: (value) => dispatch(alertPush(value)),
    fetchMarkets: type => dispatch(fetchMarkets()),
    setMarket: (market) => dispatch(setMarket(market)),
    fetchAllTickers: () => dispatch(fetchAllTickers()),
    filterCoins: (value) => dispatch(filterCoins(value)),
    fetchCurrencyMxn: () => dispatch(fetchCurrencyMxn())
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(injectIntl(WalletPage));
