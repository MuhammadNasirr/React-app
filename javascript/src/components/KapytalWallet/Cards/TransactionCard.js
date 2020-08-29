import React from 'react';
import { AcUnit } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


class TransactionCard extends React.Component {
  currencies = {
    'DAI': 'MakerDAO',
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum'
  }

  currencyName = (name) => {
    return this.currencies[name]
  }

  render() {
    const { classes } = this.props;
    return (
      <div  className={classes.stylestransactionCard}>
        <AcUnit />
        <div>
          <p className={classes.marginText}>{`Deposito ${this.currencyName(this.props.currency)}`}</p>
          <p className={classes.marginText}>{this.props.date}</p>
        </div>
        <div className={{ marginLeft: "auto", textAlign: 'end' }}>
          <p className={classes.marginText}>{`$ ${this.props.amount}`}</p>
          <p className={classes.marginText}>{`${this.props.converted} ${this.props.currency}`}</p>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TransactionCard)
