import React from 'react';
import { AcUnit } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';
import clsx from 'clsx'

class FundingCard extends React.Component {
  static defaultProps = { type: 'spei' }

  constructor(props) {
    super(props)
    this.state = { type: this.props.type }
  }

  renderQR() {
    if (this.state.type === 'mercadoPago')
      return (
        <div className={this.props.classes.qrcodeSection}>
          <img style={styles.qrcodeImage} alt="qrcode" src={require('../../../assets/qrcode.png')} />
        </div>
      )
  }

  renderCLABE() {
    if (this.state.type === 'spei')
      return (
        <div className={this.props.classes.depositSection}>
          <p className={this.props.classes.depositSecondaryText}>CLABE</p>
          <p className={this.props.classes.depositPrimaryText}>64 6180 1154 0065 6841</p>
        </div>
      )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={clsx(classes.fundingCard,classes.cardView)}>
        <AcUnit className={classes.depositFundingIcon} />
        <h4 className={classes.depositTitle}>Deposit DAI with SPEI</h4>
        <div className={classes.depositSection}>
          <p className={classes.depositSecondaryText}>60 minutes rate</p>
          <p className={classes.depositPrimaryText}>1 DAI = $18.60 MXN</p>
        </div>
        <div className={classes.depositSection}>
          <p className={classes.depositSecondaryText}>Bank</p>
          <p className={classes.depositPrimaryText}>BanRecio</p>
        </div>
        <div className={classes.depositSection}>
          <p className={classes.depositSecondaryText}>Bank Account Owner</p>
          <p className={classes.depositPrimaryText}>OMIEX S.A.P.I de C.V</p>
        </div>
        {this.renderQR()}
        <div className={classes.depositSection}>
          <p className={classes.complement}>IMPORTANT:</p>
          <p className={classes.complement}>You can only deposit funds form accounts under your name</p>
          <p className={classes.complement}>You can only deposit up to 3,000,000.00 MXN</p>
        </div>
        <hr></hr>
        {this.renderCLABE()}
        <div className={classes.depositSection}>
          <p className={classes.depositSecondaryText}>REFERENCE</p>
          <p className={classes.depositPrimaryText}>XBT-201</p>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FundingCard)