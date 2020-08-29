import React from 'react';
import { Grid } from '@material-ui/core'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import BalanceChart from '../../components/KapytalWallet/Charts/BalanceChart'
import DepositModal from '../../components/KapytalWallet/Modals/DepositModal'
import CurrencyCard from '../../components/KapytalWallet/Cards/CurrencyCard'
import SimpleCarousel from '../../components/KapytalWallet/Containers/SimpleCarousel';
import ActionButton from '../../components/KapytalWallet/Buttons/ActionButton';
import { GetApp, Publish } from '@material-ui/icons'
import { styles } from '../../styles/main';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false }
  }

  currencies = [
    { name: 'DAI', color: '#febe47' },
    { name: 'Compound', color: '#1db5b7' },
    { name: 'Crypto', color: '#f68884' }
  ]

  renderCurencies = () => {
    return (this.currencies.map((e) =>
      <CurrencyCard currency={e.name} color={e.color} />
    ))
  }

  showDepositModal = () => {
    const state = !(this.state.showModal);
    this.setState({ showModal: state })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.walletMainDiv}>
        <div className={classes.homeBoard}>
          <Grid onClick={() => this.props.history.push("/wallets/history")}>
            <h4 style={{ textAlign: 'center' }}>COMBINED BALANCE</h4>
            <h1 style={{ textAlign: 'center' }}>$ 2500.00</h1>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            <BalanceChart elements={this.currencies} />
          </Grid>
          <SimpleCarousel elements={this.renderCurencies} />
          <Grid style={{ display: 'flex' }} justify="space-around">
            <ActionButton Icon={<GetApp />} fullWidth hint="Deposit"
              onClick={this.showDepositModal} />
            <ActionButton Icon={<Publish />} fullWidth hint="Withdraw"
              onClick={this.showDepositModal} />
          </Grid>
          <DepositModal isVisible={this.state.showModal} onClose={this.showDepositModal} />
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Home))
