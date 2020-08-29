import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { styles } from '../../styles/main';


class Market extends Component {

  renderIcons = (market) => {
    switch (market) {
      case 'eth':
        return 'https://steemitimages.com/DQmWCT7YDRNEQ7zbUmd9GSzymtTZD88n7UCgeMxv5m5NovS/ethereum-symbol.png'

      case 'usd':
        return 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'

      default:
        return 'https://upload.wikimedia.org/wikipedia/commons/9/9a/BTC_Logo.svg'
    }
  }

  render() {
    const { state, classes, tickers, market } = this.props;
    const { list } = tickers;
    const { ticker } = list && Object.entries(list).length !== 0 &&
      list.constructor === Object &&
      list[`${market.id.toLowerCase()}`];

    return (
      <Paper elevation={3} className={classes.walletRoot}>
        <div className="walletRoot" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <img alt="Market" className={classes.marketLogo} src={this.renderIcons(state.base)} />
          <span className={classes.componentText}>
            <Typography className={classes.primaryText} style={{ fontSize: 18 }} variant="h6" display="block">
              <span className={classes.primaryNumber}>{ticker && ticker.last}</span> 
              <span className={classes.primaryText}> {state.base.toUpperCase()}</span>
            </Typography>
          </span>
        </div>
      </Paper>
    );
  }

}

export default withStyles(styles)(Market);
