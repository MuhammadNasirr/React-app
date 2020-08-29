import React, { Component } from 'react'
import { Dialog, Grid } from '@material-ui/core'
import DepositCard from '../Cards/DepositCard'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';

class DepositModal extends Component {
  data = {
    items: [
      { title: 'DAI', descr: 'Deposit DAI with your local currency dai address or email' },
      { title: 'Compound', descr: 'Deposit Compound with your local currency dai address or email' },
      { title: 'Crypyto', descr: 'Deposit Crypto with your local currency dai address or email' }
    ],
    config: [
      { color: '756ddc', goto: '/wallets/fund/dai' },
      { color: '2fcc9b', goto: '/fund/compound' },
      { color: 'e17c8c', goto: '/fund/crypto' }
    ]
  }

  render() {
    // const { classes, lang } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isVisible} onClose={this.props.onClose}
          style={{ borderRadius: '1em' }}>
          <Grid style={{ borderRadius: '1em',padding:20 }}>
            <DepositCard meta={this.data.items[0]} config={this.data.config[0]} />
            <DepositCard meta={this.data.items[1]} config={this.data.config[1]} />
            <DepositCard meta={this.data.items[2]} config={this.data.config[2]} />
          </Grid>
        </Dialog>
      </div >
    )
  }
}

export default withStyles(styles)(DepositModal);