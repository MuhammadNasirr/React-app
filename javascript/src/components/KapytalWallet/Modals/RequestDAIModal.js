import React, { Component } from 'react'
import { Dialog, Button, Grid } from '@material-ui/core'
import { WhatsApp, Email } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


class DepositModal extends Component {
  static defaultProps = { isVisible: true, onClose: () => { } }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog fullWidth open={this.props.isVisible} onClose={this.props.onClose}
          style={{ borderRadius: '1em', textAlign: 'center' }}>
          <Grid style={{ borderRadius: '1em', padding: 20 }}>
            <p className={classes.cryptoWork}>Crypto works globally</p>
            <h5 className={classes.yourDAI}>Your DAI Address</h5>

            <div className={classes.qrcodeSection}>
              <img className={classes.qrcodeImage} alt="qrcode" src={require('../../../assets/qrcode.png')} />
            </div>

            <p className={classes.addressText}>
              0x3a23EF69E488816D13D28d267fD124CcA2cA9A99
            </p>

            <div style={{ padding: '1em 0' }}>
              <p className={classes.requestDA}>Request DAI</p>
              <p className={classes.informationText}>your can request DAI to your contacts though email or whatsapp</p>
            </div>

            <div style={{ display: 'flex' }}>
              <Button fullWidth variant="contained" className={classes.requestButton}>
                <Email />
                Request by email
              </Button>
              <Button fullWidth variant="contained" className={classes.requestButton}>
                <WhatsApp />
                Request by whatsapp
              </Button>
            </div>

          </Grid>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(DepositModal);
