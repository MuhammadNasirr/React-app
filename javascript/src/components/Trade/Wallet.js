import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { styles } from '../../styles/main';
import Avatar from '@material-ui/core/Avatar';

class Wallet extends Component {

  onClickExchange = (value) => {
    const { asks, bids } = this.props
    this.props.exchangeInput(value, asks, bids)
  }

  onClickAmount = (value) => {
    const { asks, bids } = this.props
    this.props.amountInput(value, asks, bids)
  }

  render() {
    const { classes, fiat, market, balances, markets } = this.props;
    const currentBalance1 = balances && balances[fiat.toLowerCase()]
    const currentBalance2 = balances && balances[market.toLowerCase()];

    let options = []
    markets.forEach(function (market) {
      options.push({ value: market.base_unit, label: market.name })
    })

    return (
      <Grid container direction="row" layout="fluid" justify="space-between">

        <Grid xs={12} sm={6} item>
          <Paper elevation={3} className={classes.walletRoot}>
            <div className="walletRoot" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <Avatar src={currentBalance1.icon_url} aria-label="recipe" classes={{ img: classes.buyAvatarImg }} className={classes.avatar} />
              <span className={classes.componentText} onClick={() => this.onClickAmount(parseFloat(currentBalance1.balance).toFixed(4))}>
                <Typography className={classes.primaryText} style={{ fontSize: 18 }} variant="h6" display="block">
                  <span className={classes.primaryNumber}>{parseFloat(currentBalance1 && currentBalance1.balance).toFixed(4)}</span>
                  <span> {fiat.toUpperCase()}</span>
                </Typography>
              </span>
            </div>
          </Paper>
        </Grid>

        <Grid xs={12} sm={6} item >
          <Paper elevation={3} className={classes.walletRoot}>
            <div className="walletRoot" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <Avatar src={currentBalance2.icon_url} aria-label="recipe" classes={{ img: classes.buyAvatarImg }} className={classes.avatar} />
              <span className={classes.componentText} onClick={() => this.onClickExchange(parseFloat(currentBalance2 && currentBalance2.balance).toFixed(4))}>
                <Typography className={classes.primaryText} style={{ fontSize: 18 }} variant="h6" display="block">
                  <span className={classes.primaryNumber}>{parseFloat(currentBalance2 && currentBalance2.balance).toFixed(4)}</span>
                  <span> {market.toUpperCase()}</span>
                </Typography>
              </span>
            </div>
          </Paper>
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Wallet);
