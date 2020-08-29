import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import GoogleAuth from './GoogleAuth';
import AddAddress from './AddAddress';
import SelectAddress from './SelectAddress';
import { getBeneficiaries, getBeneficiariesMXN } from '../../api/withdraw';
import { styles } from '../../styles/main'
import clsx from 'clsx'
import moment from 'moment'
import { toMaxFixed } from '../../utils/toMaxFixed';

class Withdraw extends Component {

  state = {
    open: false,
    openAddAddress: false,
    openSelectAddress: false,
    beneficiaries: [],
  }

  componentDidMount() {
    this.fetchBeneficiaries(this.props.currency.id)
  }

  fetchBeneficiaries(currency) {
    if (currency === 'mxn') {
      getBeneficiariesMXN().then(res => {
        const { data, status } = res;
        if (data && status === 200) {
          this.setState({ beneficiaries: data })
        }
      })
        .catch(res => {
        })
    } else {
      getBeneficiaries(currency).then(res => {
        const { data, status } = res;
        if (data && status === 200) {
          this.setState({ beneficiaries: data })
        }
      })
        .catch(res => {
        })
    }
  }

  onClick = () => {
    const { currency, amount, dai, mxn } = this.props;
    const currencydai = dai && dai
    const mxnWithdrawals = mxn && mxn.length && mxn[0].withdrawals
    const { balance } = currency;
    const total_amount = currency.withdraw_fee + +amount;
    const mxnBalance = currencydai.balance * mxnWithdrawals;
    if (currency.id === 'mxn' && mxnBalance < total_amount) {
      this.props.alertPush({ message: ['account.withdraw.greater_amount'], code: '403', type: 'error', open: true });
    }
    else if (currency.id !== 'mxn' && balance < total_amount) {
      this.props.alertPush({ message: ['account.withdraw.greater_amount'], code: '403', type: 'error', open: true });
    }
    else {
      this.props.onSubmitWithdraw();
    }
  }

  onChange = field => e => {
    this.props.onChange(field, e.target.value.trim());
  };

  onOpen = () => {
    this.setState({ open: true })
  }

  onOpenAddress = () => {
    this.setState({ openAddAddress: true })
  }

  onOpenSelectAddress = () => {
    this.setState({ openSelectAddress: true })
  }

  onClose = () => {
    this.setState({ open: false, openAddAddress: false, openSelectAddress: false })
  }

  onReceive = (address) => {
    this.setState({ openSelectAddress: false })
    this.props.onChange('rid', address)
  }

  handleDelete = (id) => {
    const { beneficiaries } = this.state;
    const index = beneficiaries.findIndex(x => x.id === id);
    beneficiaries.splice(index, 1);
    this.setState({ beneficiaries })
  }

  render() {
    const { classes, currency, rid, amount, otp, submitting, user, qrcode, setOtp, isCompoundFetching, dai, mxn } = this.props;
    const { open, openAddAddress, openSelectAddress, beneficiaries } = this.state;
    const currencydai = dai && dai
    const mxnWithdrawals = mxn && mxn.length && mxn[0].withdrawals
    return (
      <Fragment>
        {
          currency.withdrawal_enabled ?
            !isCompoundFetching ?
              !user.otp && currency.type !== "compound" ?
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3" classes={{ root: clsx(classes.primaryText, classes.enableText) }} gutterBottom>
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.enable2fa' })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.depositBtn}
                      style={{ marginTop: 10 }}
                      onClick={() => this.setState({ open: true })}
                    >
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.enable2faButton' })}
                    </Button>
                  </Grid>
                </Grid>

                :
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} lg={6} className={classes.depositContainer}>
                    {
                      currency.type === "compound" ?
                        <React.Fragment>
                          <Typography variant="h2" classes={{ h2: classes.currencyName }} gutterBottom>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.withdrawCompound' })}
                          </Typography>
                          <Grid direction="row" className={classes.depositModalMargin} container justify="space-between" alignItems="center">
                            <Avatar
                              alt={currency.id.toUpperCase()}
                              src={currencydai.icon_url}
                              className={classes.compoundCurrencyWithdraw}
                              classes={{ img: classes.avatarImg }}
                            />
                            <Typography variant="h2" className={classes.compoundText} classes={{ h2: classes.primaryTextBold }}>
                              {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.balanceCompound' })}
                            </Typography>
                          </Grid>
                          <TextField
                            placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.amount' })}
                            className={classes.withdrawalAmount}
                            type="number"
                            margin="normal"
                            variant="standard"
                            InputProps={{ disableUnderline: true, classes: { input: clsx(classes.textinput, classes.primaryNumber) } }}
                            onChange={this.onChange('amount')}
                            value={amount}
                          />
                          <Typography variant="h5" classes={{ h5: classes.detailsWithdrawal }} gutterBottom>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.detailsWithdrawal' })}
                          </Typography>
                        </React.Fragment>
                        :
                        null
                    }

                    {
                      (currency.type !== 'fiat' && currency.type !== "compound") || currency.id === 'mxn' ?
                        <span>
                          <Button
                            variant="contained"
                            size="large"
                            className={classes.depositBtn}
                            style={{ marginBottom: 10, paddingTop: 5 }}
                            onClick={this.onOpenSelectAddress}
                            classes={{
                              label: classes.buttonLebel
                            }}
                          >
                            {
                              currency && currency.id === 'mxn'
                                ?
                                this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.selectBankAddress' })
                                :
                                this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.selectAddress' })
                            }
                          </Button>
                          <Button
                            variant="contained"
                            size="large"
                            className={classes.depositBtn}
                            onClick={this.onOpenAddress}
                            classes={{
                              label: classes.buttonLebel
                            }}
                          >
                            {
                              currency && currency.id === 'mxn'
                                ?
                                this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.addBackAddress' })
                                :
                                this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.addAddress' })
                            }
                          </Button>
                          <TextField
                            placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.amount' })}
                            className={classes.withdrawalAmount}
                            type="number"
                            margin="normal"
                            variant="standard"
                            InputProps={{ disableUnderline: true, classes: { input: clsx(classes.textinput, classes.primaryNumber) } }}
                            onChange={this.onChange('amount')}
                            value={amount}
                          />
                          <TextField
                            placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' })}
                            className={classes.withdrawalAmount}
                            InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                            margin="normal"
                            variant="standard"
                            onChange={this.onChange('otp')}
                            value={otp}
                          />
                        </span>
                        : null
                    }
                    {
                      (currency.type !== 'compound') &&
                      <React.Fragment>
                        <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                          <span style={{ width: '50%', display: 'inline-block' }}>
                            {
                              currency && currency.id === 'mxn'
                                ?
                                this.props.intl.formatMessage({ id: 'page.body.wallets.estCalBalance' }) :
                                null
                            }
                          </span>
                          <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                            <b className={clsx(classes.balanceTotal, classes.primaryNumber)}>{currency && currency.id === 'mxn' ? `${toMaxFixed(currencydai.balance * mxnWithdrawals, 2)} MXN ( ${toMaxFixed(currencydai.balance, 2)} DAI)` : null}</b>
                          </span>
                        </Typography>

                        <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                          <span style={{ width: '50%', display: 'inline-block' }}>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.ccy.message.enabled' })}:
                    </span>
                          <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                            <span className={classes.primaryNumber}> {currency.withdrawal_enabled !== undefined ? (currency.withdrawal_enabled).toString() : ""} </span>
                          </span>
                        </Typography>

                        <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                          <span style={{ width: '50%', display: 'inline-block' }}>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.fee' })}:
                    </span>
                          <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                            <span className={classes.primaryNumber}> {currency.withdraw_fee} </span>
                            <span> {currency.id.toUpperCase()} </span>
                          </span>
                        </Typography>
                        {/* {
                    currency && currency.id === 'mxn'
                      ?
                      <Grid className={classes.mxnGrid}>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.mxn.text' })} <span className={classes.primaryNumber}>{mxn && mxn.Withdrawals.toFixed(2)}</span> {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.mxn.text1' })}
                        </Typography>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.mxn.text2' })} <span className={classes.primaryNumber}>{mxn && mxn.Valid_From}</span> {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.mxn.text3' })} <span className={classes.primaryNumber}>{mxn && mxn.Valid_To}</span>
                          {" "}{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.mxn.text4' })} <span className={classes.primaryNumber}>{moment(mxn && mxn.Valid_Date).format('DD/MM/YYYY')}</span>
                        </Typography>
                      </Grid>
                      : null
                  } */}

                        <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                          <span style={{ width: '50%', display: 'inline-block' }}>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.minimum' })}:
                    </span>
                          <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                            <span className={classes.primaryNumber}> {currency.min_withdraw_amount} </span>
                            <span> {currency.id.toUpperCase()} </span>
                          </span>
                        </Typography>

                        <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                          <span style={{ width: '50%', display: 'inline-block' }}>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.minimum_confirmations' })}:
                    </span>
                          <span className={classes.primaryNumber} style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                            {currency.min_confirmations}
                          </span>
                        </Typography>
                      </React.Fragment>
                    }


                    <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                      <span style={{ width: '50%', display: 'inline-block' }}>
                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.total' })}:
                    </span>
                      <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                        <span className={classes.primaryNumber}> {currency.withdraw_fee + +amount} </span>
                        <span> {currency.id.toUpperCase()} </span>
                      </span>
                    </Typography>

                    {
                      currency && currency.id === 'mxn'
                        ?
                        <Grid className={classes.mxnGrid}>
                          {/* <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.guideLine2' })}
                        </Typography>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnTextMargin) }}>
                          - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.fullName' })}
                        </Typography>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                          - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.bankName' })}
                        </Typography>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                          - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.maxCode' })}
                        </Typography>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                          - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.refID' })} `{user && user.uid}`
                        </Typography>
                        <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                          - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.amountMXN' })}
                        </Typography> */}
                          <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText, classes.mxnTextMargin) }}>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.guideLine3' })} <span className={classes.primaryNumber}>{mxn && mxn.length && mxn[0].withdrawals.toFixed(2)}</span> {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text1' })}
                          </Typography>
                          <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                            {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.guideLine4' })} <span className={classes.primaryNumber}>{mxn && mxn.length && mxn[0].valid_from}</span> {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text3' })} <span className={classes.primaryNumber}>{mxn && mxn.length && mxn[0].valid_to}</span>
                            {" "}{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text4' })} <span className={classes.primaryNumber}>{moment(mxn && mxn.length && mxn[0].valid_date).format('DD/MM/YYYY')}</span>
                          </Typography>
                        </Grid>
                        : null
                    }

                    {
                      currency.type === 'compound' ?
                        <Button
                          variant="contained"
                          size="large"
                          className={classes.depositBtn}
                          classes={{
                            disabled: classes.disabledButton
                          }}
                          style={{ marginTop: 10 }}
                          disabled={!amount}
                          onClick={this.onClick}
                        >
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.button' })}
                        </Button>
                        :
                        null
                    }
                    {
                      (currency.type !== 'fiat' && currency.type !== 'compound') || currency.id === 'mxn' ?
                        <Button
                          variant="contained"
                          size="large"
                          className={classes.depositBtn}
                          classes={{
                            disabled: classes.disabledButton
                          }}
                          style={{ marginTop: 10 }}
                          disabled={!rid || !amount || !otp || submitting}
                          onClick={this.onClick}
                        >
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.button' })}
                        </Button>
                        : null
                    }
                  </Grid>
                  <Grid item xs={12}><div style={{ height: 20 }} /></Grid>
                </Grid>
              : ""
            :
            <Typography
              variant="h4"
              paragraph={true}
              className={clsx(classes.primaryText, classes.description)}>
              {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.ccy.message.maintenance' })}
            </Typography>
        }
        {
          currency.type !== 'fiat' || currency.id === 'mxn' ?
            <div>
              <GoogleAuth
                open={open}
                qrcode={qrcode}
                setOtp={setOtp}
                user={user}
                handleClose={this.onClose}
                intl={this.props.intl}
                alertPush={this.props.alertPush}
              />
              <AddAddress
                open={openAddAddress}
                handleClose={this.onClose}
                currency={currency}
                onReceieveAddress={this.onReceive}
                fetchBeneficiaries={this.fetchBeneficiaries.bind(this)}
                intl={this.props.intl}
                alertPush={this.props.alertPush}
              />
              <SelectAddress
                open={openSelectAddress}
                handleClose={this.onClose}
                currency={currency}
                onReceieveAddress={this.onReceive}
                beneficiaries={beneficiaries}
                onDelete={this.handleDelete}
                fetchBeneficiaries={this.fetchBeneficiaries.bind(this)}
                intl={this.props.intl}
                alertPush={this.props.alertPush}
              />
            </div>
            : null
        }


      </Fragment >
    );
  }
}

export default withStyles(styles)(Withdraw);
