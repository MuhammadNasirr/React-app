import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import TextInput from './Input';

// import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';

import { withStyles } from '@material-ui/core';
import { styles } from '../../styles/main';
import Confirmation from './Confirmation';
import { cleanPositiveFloatInput } from '../../utils/cleanPositiveFloatInput';
import { toMaxFixed } from '../../utils/toMaxFixed';

const selected = "solid 0.25em #04479C"

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      type: 'buy',
      open: false,
      asks_total_quote_volume: '',
      bids_total_quote_volume: '',
      asks_total_volume: '',
      bids_total_volume: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asks && nextProps.bids && nextProps.asks.length && nextProps.bids.length) {
      const { asks, bids } = nextProps;
      const asks_total_quote_volume = asks && asks.length && asks.reduce((a, b) => parseFloat(a) + ((parseFloat(b[0]) * parseFloat(b[1])) || 0), 0);
      const bids_total_quote_volume = bids && bids.length && bids.reduce((a, b) => parseFloat(a) + ((parseFloat(b[0]) * parseFloat(b[1])) || 0), 0);
      const asks_total_volume = asks && asks.length && asks.reduce((a, b) => parseFloat(a) + (parseFloat(b[1]) || 0), 0);
      const bids_total_volume = bids && bids.length && bids.reduce((a, b) => parseFloat(a) + (parseFloat(b[1]) || 0), 0);
      this.setState({
        asks_total_quote_volume,
        bids_total_quote_volume,
        asks_total_volume,
        bids_total_volume
      })
    }
  }

  switchCurrencies = () => {
    const { type } = this.state;
    this.setState({ type: type === "buy" ? "sell" : "buy" },
      () => {
        this.props.orderType(this.state.type);
        this.props.onSwitchCurrencies(this.state.type)
      })
  }

  logAmount(value) {
    const { asks, bids } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (!isNaN(value) && this.props.amount !== value) {
      this.props.amountInput(convertedValue, asks, bids)
    }
  }

  logExchange = (value) => {
    const { asks, bids } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (!isNaN(value) && this.props.exchange !== value) {
      this.props.exchangeInput(convertedValue, asks, bids)
    }
  }

  createOrder = () => {
    this.setState({ open: false })
    const { balances, quote_currency, state, exchange, amount } = this.props
    const quote_unit = balances && balances[quote_currency.toLowerCase()];

    if (parseFloat(quote_unit.balance) === 0 || parseFloat(amount) === 0) {
      this.props.failOrder({ message: "The operation cannot be completed now. Please try again later!" })
      return false
    }

    if (!isNaN(exchange) && !isNaN(amount)) {
      this.props.createOrder(state.type === "buy" ? exchange : amount);
    }
  }

  setSelection = (element) => {
    document.getElementsByClassName(element)[0].style.borderBottom = selected;
  }

  onOpen = () => {
    this.setState({ open: true })
  };

  onClose = () => {
    this.setState({ open: false })
  };

  getIcon(currency, wallets) {
    return wallets[currency] ? wallets[currency].icon_url : ''
  }

  onChangeQuoteCurrency = (e) => {
    const quote_currency = e.target.value;
    const { quote_currencies, markets } = this.props;
    const base_currency = quote_currencies[quote_currency][0].base_unit;
    const marketId = base_currency + quote_currency;
    const market = markets.find(x => x.id === marketId);
    this.props.onChangeMarket(market);
  }

  onChangBaseCurrency = (e) => {
    const base_currency = e.target.value;
    const { quote_currency, markets } = this.props;
    const marketId = base_currency + quote_currency;
    const market = markets.find(x => x.id === marketId);
    this.props.onChangeMarket(market);
  }

  render() {
    const { state, classes, totalPrice, safePrice, price_precision, balances, quote_currency, base_currency, quote_currencies, base_currencies, exchange, amount, wallets } = this.props;
    const { open, asks_total_quote_volume, bids_total_volume } = this.state;

    const currentBalance1 = balances && balances[state.type === 'buy' ? quote_currency.toLowerCase() : base_currency.toLowerCase()]
    const currentBalance2 = balances && balances[state.type === 'buy' ? base_currency.toLowerCase() : quote_currency.toLowerCase()];

    const amountIsValid = parseFloat(amount) <= parseFloat(currentBalance1.balance).toFixed(8);
    const exchangeIsValid = parseFloat(exchange) <= parseFloat(currentBalance2.balance).toFixed(8) || state.type === 'buy' || state.type === 'sell';

    const volumeIsValid =
      (state.type === 'buy' && amount <= asks_total_quote_volume) ||
      (state.type === 'sell' && amount <= bids_total_volume);

    return (
      <Paper elevation={3} className={classes.orderModal}>

        <Grid container>
          <Grid item sm={12} xs={12} md={5}>
            <div>
              <FormControl variant="outlined" className={classes.orderformControl}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className={classes.primaryText}>{this.props.intl.formatMessage({ id: `page.body.market.order.trade` })}</label>
                  <label>
                    <span className={classes.primaryNumber}>{toMaxFixed(currentBalance1.balance, currentBalance1.precision)}</span>
                    <span className={classes.primaryText}> {this.props.intl.formatMessage({ id: `page.body.market.order.available` })}</span>
                  </label>
                </div>
                <TextInput
                  isValid={amountIsValid}
                  helperText={this.props.intl.formatMessage({ id: 'page.body.market.order.insufficientBalance' })}
                  onChange={this.logAmount.bind(this)}
                  onChangeCurrency={state.type === "buy" ? this.onChangeQuoteCurrency : this.onChangBaseCurrency}
                  position="endAdornment"
                  selectedCurrency={state.type === "buy" ? quote_currency : base_currency}
                  value={amount}
                  iconUrl={state.type === "buy" ? this.getIcon(quote_currency, wallets) : this.getIcon(base_currency, wallets)}
                  groupedMarkets={state.type === "buy" ? quote_currencies : base_currencies}
                  variant="standard"
                />
              </FormControl>
            </div>
          </Grid>

          <Grid item md={2} xs={12} sm={12} lg={2} classes={{ root: classes.switchButton }}>
            <IconButton
              aria-label="switch"
              onClick={this.switchCurrencies}
            >
              <SwapHorizontalCircleIcon className={classes.swapIcon} fontSize="large" />
            </IconButton>
          </Grid>

          <Grid item sm={12} xs={12} md={5}>
            <div>
              <FormControl variant="outlined" className={classes.orderformControl}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className={classes.primaryText}>{this.props.intl.formatMessage({ id: `page.body.market.order.receive` })}</label>
                  <label>
                    <span className={classes.primaryNumber}>{toMaxFixed(currentBalance2.balance, currentBalance2.precision)}</span>
                    <span className={classes.primaryText}> {this.props.intl.formatMessage({ id: `page.body.market.order.available` })}</span>
                  </label>
                </div>
                <TextInput
                  isValid={exchangeIsValid}
                  helperText={this.props.intl.formatMessage({ id: 'page.body.market.order.insufficientBalance' })}
                  onChange={this.logExchange.bind(this)}
                  onChangeCurrency={state.type === "buy" ? this.onChangBaseCurrency : this.onChangeQuoteCurrency}
                  position="endAdornment"
                  selectedCurrency={state.type === "buy" ? base_currency : quote_currency}
                  value={exchange}
                  iconUrl={state.type === "buy" ? this.getIcon(base_currency, wallets) : this.getIcon(quote_currency, wallets)}
                  groupedMarkets={state.type === "buy" ? base_currencies : quote_currencies}
                  variant="standard"
                />
                {
                  (!volumeIsValid && amount && exchange)
                  &&
                  <div style={{ paddingLeft: 5 }}>
                    <span className={classes.errorText} style={{ fontSize: '0.75rem' }}>{this.props.intl.formatMessage({ id: 'page.body.tradeOrder.thisIs' })}</span>
                  </div>
                }
              </FormControl>

            </div>
          </Grid>
        </Grid>

        <FormControl variant="outlined" className={classes.orderformControl}>
          <Button
            disabled={amount > 0 && amountIsValid && exchangeIsValid && volumeIsValid ? false : true}
            variant="contained"
            className={classes.buyButton}
            classes={{ disabled: classes.disabledBuy }}
            // className={classes.submit}
            // classes={{
            //   disabled: classes.disabledButton
            // }}
            onClick={this.onOpen}
          >
            {this.props.intl.formatMessage({ id: `page.body.market.order.change` })}
          </Button>
        </FormControl>

        <Confirmation
          exchange={exchange}
          amount={amount}
          open={open}
          onClose={this.onClose}
          type={state.type}
          onConfirm={this.createOrder}
          market={state.market}
          totalPrice={totalPrice}
          safePrice={safePrice}
          state={state}
          price_precision={price_precision}
          intl={this.props.intl}
        />

      </Paper>
    );
  }
}

export default withStyles(styles)(Order);
