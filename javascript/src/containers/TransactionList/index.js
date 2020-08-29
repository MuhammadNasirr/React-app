import React from 'react';
import TransactionCard from '../../components/KapytalWallet/Cards/TransactionCard'
import ScrollList from '../../components/KapytalWallet/Containers/ScrollList';
import { styles } from '../../styles/main';
import { withStyles } from '@material-ui/core/styles';


class TransactionList extends React.Component {

  renderElements() {
    return (
      <TransactionCard currency={"DAI"} date={"24/Feb/2020 - 12:32 PM"}
        income={true} amount={"105.00"} converted={"0.0520"} />
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.walletMainDiv}>
        <div className={classes.transactionList}>
          <h1 className={classes.containerTitle}>Historial de transacciones</h1>
          <ScrollList elements={this.renderElements} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TransactionList)
