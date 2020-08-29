import React from 'react';
import { Grid } from '@material-ui/core'

import SimpleCarousel from '../../components/KapytalWallet/Containers/SimpleCarousel'
import FundingCard from '../../components/KapytalWallet/Cards/FundingCard'
import ActionButton from '../../components/KapytalWallet/Buttons/ActionButton'
import RequestDAIModal from '../../components/KapytalWallet/Modals/RequestDAIModal'
import { WidgetsOutlined } from '@material-ui/icons'
import { styles } from '../../styles/main';
import { withStyles } from '@material-ui/core/styles';


class AccountFunding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false }
  }

  showRequestDAIModal = () => {
    const state = !(this.state.showModal);
    this.setState({ showModal: state })
  }

  renderCards() {
    return (
      <>
        <FundingCard type="spei" />
        <FundingCard type="mercadoPago" />
      </>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.walletMainDiv}>
        <div className={classes.accountFunding}>
          <SimpleCarousel elements={this.renderCards} />
          <Grid style={{ textAlign: 'center' }}>
            <ActionButton Icon={<WidgetsOutlined />} hint="Request with QR code"
              onClick={this.showRequestDAIModal} />
          </Grid>
          <RequestDAIModal isVisible={this.state.showModal} onClose={this.showRequestDAIModal} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(AccountFunding);
