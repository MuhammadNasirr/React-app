import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { displayNumber } from './utils';

import { withStyles } from '@material-ui/core';
import { styles } from '../../styles/main';

class Total extends Component {

  render() {
    const { state, classes, totalPrice, safePrice, price_precision, exchange, amount } = this.props;

    return (
      <Paper elevation={3} className={classes.totalModal}>
        <Typography variant="h2" className={classes.primaryTextBold}>
          {this.props.intl.formatMessage({ id: 'page.body.market.details.header' })}
        </Typography>

        <div className={classes.detailItems}>
          <p className={classes.primaryText}>
            {
              state.type === 'buy' ?
                this.props.intl.formatMessage({ id: 'page.body.market.details.buying' })
                :
                this.props.intl.formatMessage({ id: 'page.body.market.details.selling' })
            }
          </p>
          <p className={classes.primaryText}>
            <span className={classes.primaryNumber}>
              {state.type === 'buy' ? displayNumber(exchange || 0) : displayNumber(amount || 0)}
            </span>
            <span> {state.market.toUpperCase()}</span>
          </p>
        </div>
        <Divider />

        <div className={classes.detailItems}>
          <p className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.market.details.price' })}</p>
          <p className={classes.primaryText}>≈
            <span className={classes.primaryNumber}> {parseFloat(safePrice).toFixed(price_precision)}</span>
            <span> {state.base.toUpperCase()}</span>
          </p>
        </div>
        <Divider className={classes.divider} />

        <div className={classes.detailItems}>
          <p className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.market.details.pre' })}-{this.props.intl.formatMessage({ id: 'page.body.market.details.total' })} </p>
          <p className={classes.primaryText}>
            <span className={classes.primaryNumber}>{parseFloat(totalPrice).toFixed(price_precision)}</span>
            <span> {state.base.toUpperCase()}</span>
          </p>
        </div>
        <Divider />

        <div className={classes.detailItems}>
          <p className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.market.details.trade_fee' })}</p>
          <p className={classes.primaryText}>
            <span className={classes.primaryNumber}>{state.type === 'buy' ? state.bid_fee : state.ask_fee}</span>
            <span> {state.base.toUpperCase()}</span>
          </p>
        </div>
        <Divider className={classes.divider} />

        <div className={classes.detailItems}>
          <p className={classes.primaryTextBold}>{this.props.intl.formatMessage({ id: 'page.body.market.details.total' })} </p>
          <p className={classes.primaryTextBold}>
            <span className={classes.primaryNumber}>{(totalPrice + (state.type === 'buy' ? parseFloat(state.bid_fee) : parseFloat(state.ask_fee))).toFixed(price_precision)}</span>
            <span> {state.base.toUpperCase()}</span>
            {/* {(parseFloat(state.amount) + (state.type == 'buy' ? parseFloat(state.bid_fee) : parseFloat(state.ask_fee))).toFixed(4)} */}
            {/* {displayNumber(parseFloat(state.amount) + (state.type == 'buy' ? state.bid_fee : state.ask_fee)) } {state.base} */}
          </p>
        </div>
        <Divider />

      </Paper>
    );

  }

}

export default withStyles(styles)(Total);
