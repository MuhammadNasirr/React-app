/* eslint-disable */
import { ReactReduxContext } from 'react-redux'
import React, { Component } from 'react';
import compose from 'recompose/compose';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  orderType,
  marketSelection,
  marketPrice,
  amountInput,
  exchangeInput,
  createOrder,
  fetchMarkets,
  fetchBalances,
  closeModal,
  failOrder,
  setBase,
  setFee,
  setPrecision,
  fetchTickers
} from '../../actions/trade';
import { setMarket, fetchAllTickers, fetchDepth } from '../../actions/tradeV2';
import { fetchWalletData } from '../../actions/wallet';

import Wallet from '../../components/Trade/Wallet.js';
import Market from '../../components/Trade/Market.js';
import Order from '../../components/Trade/Order.js';
import Total from '../../components/Trade/Total.js';
import Loader from '../../components/Loader';
import Grid from '@material-ui/core/Grid/Grid';

import { withStyles } from '@material-ui/core';
import { styles } from '../../styles/main';

import Layout from '../Layout';
import { getTotalPrice, getInversedTotalPrice } from '../../utils/getTotalPrice';
import { convertExponentialToDecimal } from '../../utils/cleanPositiveFloatInput';
import { rangerConnectFetch } from '../../actions/ranger';
import Typography from '@material-ui/core/Typography/Typography';

class TradePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      exchange: 0,
      totalPrice: 0,
      safePrice: 0,
      totalAmount: 0
    }
  }

  componentDidMount = async () => {
    this.props.setMarket('');
    this.props.fetchWalletData();
    this.props.fetchMarkets();
    this.props.fetchBalances();
    this.props.fetchAllTickers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.confirmation) {
      this.setState({ amount: 0, exchange: 0 })
    }
    if (nextProps.markets.length) {
      let currentMarket = nextProps.markets.length && nextProps.markets[0];
      if (!this.props.currentMarket) {
        this.props.setMarket(currentMarket)                // setting current market obj in reducer
      }
    }
    if (nextProps.currentMarket.id !== this.props.currentMarket.id && nextProps.currentMarket) {
      if (!this.props.connected) {
        this.props.rangerConnect({ withAuth: false });
      }
      if (Object.entries(this.props.orderBook.data).length === 0) {
        this.props.fetchDepth(nextProps.currentMarket.id)
      }
    }
    if (nextProps.orderBook.data.timestamp && nextProps.orderBook.data.timestamp !== this.props.orderBook.data.timestamp) {
      const { amount } = this.state;
      const { orderBook: { data: { asks, bids } }, type, amount_precision, quote_currency, wallets } = nextProps;
      const proposals = type === 'buy' ? asks : bids;
      const totalAmount = convertExponentialToDecimal(getInversedTotalPrice(amount, proposals));
      let quote_precision = 8;
      let base_precision = 8;
      if (Object.keys(wallets).length) {
        quote_precision = type === 'buy' ? wallets[quote_currency]['precision'] : amount_precision;
        base_precision = type === 'buy' ? amount_precision : wallets[quote_currency]['precision'];
      }
      this.setState({
        amount: amount && parseFloat(amount).toFixed(quote_precision),
        exchange: totalAmount && totalAmount.toFixed(base_precision)
      })
    }
  }

  groupBy = (objectArray, property) => {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  handleChangeAmount = (value) => {
    const { orderBook: { data: { asks, bids } }, type, amount_precision, quote_currency, wallets } = this.props;
    const proposals = type === 'buy' ? asks : bids;
    let totalAmount = 0;
    if (type === 'buy') {
      totalAmount = convertExponentialToDecimal(getInversedTotalPrice(value, proposals));
    }
    else {
      totalAmount = convertExponentialToDecimal(getTotalPrice(value, proposals));
    }
    const precision = type === 'buy' ? amount_precision : wallets[quote_currency]['precision'];
    this.setState({
      amount: value,
      exchange: totalAmount && totalAmount.toFixed(precision)
    })
  }

  handleChangeExchange = (value) => {
    const { orderBook: { data: { asks, bids } }, type, amount_precision, quote_currency, wallets } = this.props;
    const proposals = type === 'buy' ? asks : bids;
    let totalPrice = 0;
    if (type === 'buy') {
      totalPrice = convertExponentialToDecimal(getTotalPrice(value, proposals));
    }
    else {
      totalPrice = convertExponentialToDecimal(getInversedTotalPrice(value, proposals));
    }
    const precision = type === 'buy' ? wallets[quote_currency]['precision'] : amount_precision;
    this.setState({
      exchange: value,
      amount: totalPrice && totalPrice.toFixed(precision)
    })
  }

  handleSwitchCurrencies(type) {
    const { amount } = this.state;
    const { orderBook: { data: { asks, bids } }, amount_precision, quote_currency, wallets } = this.props;
    const proposals = type === 'buy' ? asks : bids;
    let totalAmount = 0;
    if (type === 'buy') {
      totalAmount = convertExponentialToDecimal(getInversedTotalPrice(amount, proposals));
    }
    else {
      totalAmount = convertExponentialToDecimal(getTotalPrice(amount, proposals));
    }
    const quote_precision = type === 'buy' ? wallets[quote_currency]['precision'] : amount_precision;
    const base_precision = type === 'buy' ? amount_precision : wallets[quote_currency]['precision'];
    this.setState({
      amount: parseFloat(amount).toFixed(quote_precision),
      exchange: totalAmount && parseFloat(totalAmount).toFixed(base_precision)
    })
  }

  handleChangeMarket = (market) => {
    this.props.setMarket(market);
    this.props.marketSelection(market.base_unit)                                        // Selecting ask value
    this.props.fetchDepth(market.id);                                                   // Getting asks and bid depths
    this.props.setBase(market.quote_unit)                                               // Setting bid value
    this.props.setFee(0, 0);
    this.props.setPrecision(market.amount_precision, market.price_precision)            // Setting ask fee and bid fee
    this.props.fetchTickers(market.id)
  }

  render() {
    const {
      classes,
      markets,
      wallets,
      currentMarket,
      type,
      price,
      balances,
      orderBook,
      price_precision
    } = this.props;

    const { exchange, amount } = this.state;

    const { asks, bids } = orderBook.data;

    let totalPrice = 0;
    let safePrice = 0;
    if (asks && asks.length && bids && bids.length) {
      const proposals = type === 'buy' ? asks : bids;
      if (type === 'buy') {
        totalPrice = convertExponentialToDecimal(getTotalPrice(exchange, proposals));
        safePrice = (totalPrice / exchange) || 0;
      }
      else {
        totalPrice = parseFloat(exchange);
        safePrice = (totalPrice / amount) || 0;
      }
    }

    return (
      <Layout>
        {
          !markets || !markets.length || !balances || !Object.keys(balances).length || !currentMarket ?
            <Loader classes={this.props.classes} />
            :
            <ReactReduxContext.Consumer>
              {({ store }) => (
                <div className={classes.tradeRoot}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} style={{ textAlign: 'center' }}>
                      <Typography className={clsx(classes.primaryText, classes.tradeBoxHeading)} variant="h2">
                        {this.props.intl.formatMessage({ id: 'page.body.market.order.header' })}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={8}>
                      <Order
                        wallets={wallets}
                        marketSelection={this.props.marketSelection}
                        markets={markets}
                        exchangeInput={this.handleChangeExchange}
                        amountInput={this.handleChangeAmount}
                        exchange={exchange}
                        amount={amount}
                        createOrder={this.props.createOrder}
                        orderType={this.props.orderType}
                        onSwitchCurrencies={this.handleSwitchCurrencies.bind(this)}
                        marketPrice={this.props.marketPrice}
                        price={this.props.price}
                        state={store.getState().trade}
                        balances={this.props.balances}
                        failOrder={this.props.failOrder}
                        quote_currency={this.props.quote_currency}
                        base_currency={this.props.base_currency}
                        quote_currencies={this.groupBy(markets, 'quote_unit')}
                        base_currencies={this.groupBy(markets.filter(x => x.quote_unit === this.props.quote_currency), 'base_unit')}
                        onChangeMarket={this.handleChangeMarket}
                        asks={asks}
                        bids={bids}
                        store={store}
                        totalPrice={totalPrice}
                        safePrice={safePrice}
                        price_precision={price_precision}
                        intl={this.props.intl}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={4}>
                      <Total
                        exchange={exchange}
                        amount={amount}
                        price={price}
                        totalPrice={totalPrice}
                        safePrice={safePrice}
                        price_precision={price_precision}
                        state={store.getState().trade}
                        intl={this.props.intl}
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
            </ReactReduxContext.Consumer>
        }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.trade.open,
    confirmation: state.trade.confirmation,
    exchange: state.trade.exchange,
    base_currency: state.trade.market,
    quote_currency: state.trade.base,
    amount: state.trade.amount,
    price: state.trade.price,
    balances: state.trade.balances,
    tickers: state.tradev2.allTickers,
    order_err: state.trade.order_err,
    type: state.trade.type,
    asks: state.depth.asks,
    bids: state.depth.bids,
    markets: state.trade.markets,
    currentMarket: state.tradev2.market,
    orderBook: state.tradev2.depth,
    wallets: state.wallet.list,
    price_precision: state.trade.price_precision,
    amount_precision: state.trade.amount_precision,
    connected: state.ranger.connected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createOrder: (exchange) => dispatch(createOrder(exchange)),
    failOrder: err => dispatch(failOrder(err)),
    closeModal: order => dispatch(closeModal()),
    // exchangeInput: (exchange, asks, bids) => dispatch(exchangeInput(exchange, asks, bids)),
    marketSelection: market => dispatch(marketSelection(market)),
    // amountInput: (amount, asks, bids) => dispatch(amountInput(amount, asks, bids)),
    marketPrice: price => dispatch(marketPrice(price)),
    orderType: type => dispatch(orderType(type)),
    fetchMarkets: type => dispatch(fetchMarkets()),
    fetchBalances: type => dispatch(fetchBalances()),
    fetchWalletData: () => dispatch(fetchWalletData()),

    setBase: base => dispatch(setBase(base)),
    setFee: (ask_fee, bid_fee) => dispatch(setFee(ask_fee, bid_fee)),
    setPrecision: (amount_precision, price_precision) => dispatch(setPrecision(amount_precision, price_precision)),
    fetchTickers: market => dispatch(fetchTickers(market)),
    rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
    setMarket: (market) => dispatch(setMarket(market)),
    fetchAllTickers: () => dispatch(fetchAllTickers()),
    fetchDepth: market => dispatch(fetchDepth(market))
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(injectIntl(TradePage));
