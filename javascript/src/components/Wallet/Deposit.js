import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { styles } from '../../styles/main';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { getBankAccount } from '../../api/wallet';
import DepositModal from './DepositModal'
import { injectIntl } from 'react-intl';
import clsx from 'clsx'
import moment from 'moment'
import TextField from '@material-ui/core/TextField/TextField';


class DepositView extends Component {

  state = {
    open: false,
    bank_account: [],
    learnMore: false,
  };

  componentDidMount() {
    getBankAccount().then(res => {
      this.setState({
        bank_account: res
      })
    }).catch(err => {
      console.log(err)
    })
  }

  onClose = () => {
    this.setState({ open: false })
    this.props.clearDepositModalState()
  };

  onChange = field => e => {
    this.props.onChange(field, e.target.value.trim());
  };

  onClick = () => {
    const { alertPush, wallet } = this.props;
    const { deposit_enabled } = wallet;
    if (!deposit_enabled) {
      alertPush({ message: ['page.body.wallets.tabs.deposit.ccy.message.maintenance'], code: '403', type: 'error', open: true });
    } else {
      this.props.onClick();
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.depositDone) {
      this.onClose()
    }
  }

  render() {
    const { classes, wallet, currency, mxn, dai, user, amount, isCompoundFetching, depositAmount } = this.props;
    const { open, bank_account,learnMore } = this.state;
    const { name, address, balance, deposit_enabled,type, investment, investment_balance, available_balance, earned, apy } = wallet;
    const currencydai = dai && dai
    const mxnDeposits = mxn && mxn.length && mxn[0].withdrawals
    return (
      <Grid container spacing={0}>
        {
          type === "compound"
            ?
            !isCompoundFetching ?
              investment && investment.length ?
                // CODE SNIPPET FOR TYPE COMPOUND AND USER ALREADY INVESTED
                <React.Fragment>
                  <Grid item xs={12} sm={12} lg={12} className={classes.depositContainer}>
                    <Typography variant="h2" classes={{ h2: classes.currencyName }} gutterBottom>
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.Compound' })}
                    </Typography>
                    <Typography variant="h5" classes={{ h5: classes.primaryText }} gutterBottom>
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.lendAndEarn' })}
                    </Typography>
                    <Grid className={classes.depositMargin}>
                      <Typography variant="h2" classes={{ h2: classes.primaryTextBold }} gutterBottom>
                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.annualPercent' })}
                      </Typography>
                      <Typography variant="h2" classes={{ h2: classes.basicTextBold }} gutterBottom>
                        {apy.toFixed(currency.precision)}%
                    </Typography>
                      {/* <Typography variant="h2" className={classes.depositTopMargin} classes={{ h2: classes.primaryTextBold }} gutterBottom>
                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.earnedAll' })}
                      </Typography>
                      <Typography variant="h2" classes={{ h2: classes.basicTextBold }} gutterBottom>
                        12,379.12
                    </Typography> */}
                    </Grid>
                    <Grid direction="row" container justify="space-between">
                      <Grid>
                        <Typography variant="h5" classes={{ h5: classes.depositInvestment }} gutterBottom>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.investmentBalance' })}
                        </Typography>
                        <Grid direction="row" className={classes.compoundCurrency} container justify="space-between">
                          <Avatar
                            alt={currency.id.toUpperCase()}
                            src={currencydai.icon_url}
                            className={classes.compoundCurrencyDeposit}
                            classes={{ img: classes.avatarImg }}
                          />
                          <Typography variant="h2" className={classes.compoundCurrencyText} classes={{ h2: classes.primaryNumber }}>
                            {investment_balance.toFixed(currency.precision)} <span className={classes.investmentCurrency}>{currency.id.toUpperCase()}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Typography variant="h5" classes={{ h5: classes.depositInvestment }} gutterBottom>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.earned' })}
                        </Typography>
                        <Typography variant="h2" className={classes.compoundCurrency} classes={{ h2: classes.basicNumber }} gutterBottom>
                          {earned < 0 ? 0 : earned.toFixed(currency.precision)} <span className={classes.investmentCurrency}>{currency.id.toUpperCase()}</span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.depositBtn}
                      onClick={() => this.setState({ open: true })}
                    >
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.lendAndEarn' })}
                    </Button>
                  </Grid>
                </React.Fragment>
                :
                // CODE SNIPPET FOR TYPE COMPOUND AND USER DID NOT YET INVESTED
                < Grid item xs={12} sm={12} lg={12} className={classes.depositContainer}>
                  <Typography variant="h2" classes={{ h2: classes.currencyName }} gutterBottom>
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.Compound' })}
                  </Typography>
                  <Typography variant="h5" classes={{ h5: classes.primaryText }} gutterBottom>
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.earnInterest' })}
                  </Typography>
                  <Grid className={classes.depositAvatars}>
                    <Avatar src={"https://compound.finance/images/compound-mark.svg"} aria-label="recipe" classes={{ img: classes.buyAvatarImg }} className={classes.depositCompoundAvatar} />
                    <Avatar src={require("../../assets/logo.png")} aria-label="recipe" classes={{ img: classes.buyAvatarImg }} className={classes.depositKapytalAvatar} />
                  </Grid>
                  <Grid className={classes.buttonStyle}>
                    <Typography variant="h3" classes={{ h3: classes.basicTextBold }} gutterBottom>
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.earning' })} {apy.toFixed(currency.precision)}% {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.Year' })}
                    </Typography>
                  </Grid>
                  <Typography variant="h3" className={classes.depositCompoundDetail} classes={{ h3: classes.primaryText }} gutterBottom>
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.depositCompoundDetail' })}

                    {
                      learnMore ? this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.depositCompoundDetail' }) :
                        <span onClick={() => this.setState({ learnMore: true })} className={clsx(classes.depositLearnMore, classes.basicText)} >  {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.learnMore' })}</span>
                    }
                  </Typography>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.depositBtn}
                      classes={{
                        disabled: classes.disabledChangeButton
                      }}
                      // disabled={true}
                      onClick={() => this.setState({ open: true })}
                    >
                      {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit&Earn' })}
                    </Button>
                  </Grid>
                </Grid>
              : ""
            :
            <Grid item xs={12} sm={12} lg={8} className={classes.depositContainer}>
              <Typography variant="h2" classes={{ h2: classes.currencyName }} gutterBottom>
                {name}
              </Typography>
              {
                !deposit_enabled &&
                <Typography
                  variant="h4"
                  className={clsx(classes.primaryText, classes.description)}
                  gutterBottom
                >
                  {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.maintenance' })}
                </Typography>
              }
              <div>
                <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                  <span style={{ width: '50%', display: 'inline-block' }}>
                    {
                      currency && currency.id === 'mxn'
                        ?
                        this.props.intl.formatMessage({ id: 'page.body.wallets.estCalBalance' }) :
                        this.props.intl.formatMessage({ id: 'page.body.wallets.totalBalance' })
                    }
                  </span>
                  <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                    <b className={clsx(classes.balanceTotal, classes.primaryNumber)}>{currency && currency.id === 'mxn' ? `${(currencydai.balance * mxnDeposits).toFixed(2)} MXN ( ${currencydai.balance.toFixed(2)}  DAI)` : balance.toFixed(currency.precision)}</b>
                    <span> {currency && currency.id === 'mxn' ? '' : currency.id.toUpperCase()} </span>
                  </span>
                </Typography>

                <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                  <span style={{ width: '50%', display: 'inline-block' }}>
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.enabled' })}:
              </span>
                  <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                    <span className={classes.primaryNumber}> {currency.deposit_enabled !== undefined ? (currency.deposit_enabled).toString() : ""} </span>
                  </span>
                </Typography>



                <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                  <span style={{ width: '50%', display: 'inline-block' }}>
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.fee' })}:
              </span>
                  <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                    <span className={classes.primaryNumber}> {currency.deposit_fee} </span>
                    <span> {currency.id.toUpperCase()} </span>
                  </span>
                </Typography>

                <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                  <span style={{ width: '50%', display: 'inline-block' }}>
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.content.minimum' })}:
              </span>
                  <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                    <span className={classes.primaryNumber}>{currency.min_deposit_amount}</span>
                    <span> {currency.id.toUpperCase()} </span>
                  </span>
                </Typography>

                {
                  currency && currency.id === 'mxn'
                    ?
                    <Grid className={classes.mxnGrid}>
                      <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.guideLine' })}
                      </Typography>
                    </Grid>
                    : null
                }

                {
                  currency.type !== 'fiat' ?
                    <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                      <span style={{ width: '50%', display: 'inline-block' }}>
                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.minimum_confirmations' })}:
                </span>
                      <span className={classes.primaryNumber} style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                        {currency.min_confirmations + 1}
                      </span>
                    </Typography>
                    : null
                }

              </div>
            </Grid>
        }
        {
          currency && currency.id === 'mxn' ?
            <Grid item xs={12} sm={12} lg={8} className={classes.depositContainer}>
              <Typography variant="h2" classes={{ h2: classes.currencyName }} gutterBottom>
                {this.props.intl.formatMessage({ id: 'page.body.wallets.bank.accounts' })}
              </Typography>

              {
                bank_account.length && bank_account.map((bank, index) => {
                  return (
                    <div key={index} style={{ border: '5px solid', marginBottom: 10 }}>

                      <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                        <span style={{ width: '50%', display: 'inline-block' }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.beneficiary' })}:
                        </span>
                        <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                          <b className={classes.primaryNumber}>{bank.beneficiary}</b>
                        </span>
                      </Typography>

                      <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                        <span style={{ width: '50%', display: 'inline-block' }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.bank' })}:
                        </span>
                        <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                          <span className={classes.primaryNumber}>{bank.bank}</span>
                        </span>
                      </Typography>

                      <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                        <span style={{ width: '50%', display: 'inline-block' }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.swift.code' })}:
                        </span>
                        <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                          <span className={classes.primaryNumber}>{bank.clabe_code}</span>
                        </span>
                      </Typography>

                      <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                        <span style={{ width: '50%', display: 'inline-block' }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.account.number' })}:
                        </span>
                        <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                          <span className={classes.primaryNumber}>{bank.account_number}</span>
                        </span>
                      </Typography>
                      <Typography variant="caption" classes={{ caption: clsx(classes.primaryText, classes.caption) }} gutterBottom>
                        <span style={{ width: '50%', display: 'inline-block' }}>
                          {this.props.intl.formatMessage({ id: 'page.body.wallets.your.reference.code' })}:
                        </span>
                        <span style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
                          <span className={classes.primaryNumber}>{user && user.uid}</span>
                        </span>
                      </Typography>
                    </div>
                  )
                })
              }

              <Grid className={classes.mxnGrid}>
                {/* <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                  {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.guideLine1' })}
                </Typography>
                <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                  - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.yourFullName' })}
                </Typography>
                <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                  - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.amountSent' })}
                </Typography>
                <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                  - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.nameBank' })}
                </Typography>
                <Typography variant="h5" classes={{ h5: clsx(classes.primaryText) }}>
                  - {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.referenceCode' })} `{user && user.uid}`
                </Typography> */}
                <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText, classes.mxnTextMargin) }}>
                  {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text' })} <span className={classes.primaryNumber}>{mxn && mxn.length && mxn[0].deposits.toFixed(2)}</span> {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text1' })}
                </Typography>
                <Typography variant="h5" classes={{ h5: clsx(classes.primaryText, classes.mxnText) }}>
                  {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text2' })} <span className={classes.primaryNumber}>{mxn && mxn.length && mxn[0].valid_from}</span> {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text3' })} <span className={classes.primaryNumber}>{mxn && mxn.length && mxn[0].valid_to}</span>
                  {" "}{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text4' })} <span className={classes.primaryNumber}>{moment(mxn && mxn.length && mxn[0].valid_date).format('DD/MM/YYYY')}</span>
                  {<br />}{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.mxn.text5' })}
                </Typography>
              </Grid>

              <Grid container spacing={2} direction="row">
                <Grid item xs={9}>
                  <TextField
                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.amount' })}
                    className={classes.withdrawalAmount}
                    type="number"
                    margin="normal"
                    variant="standard"
                    InputProps={{ disableUnderline: true, classes: { input: clsx(classes.textinput, classes.primaryNumber) } }}
                    onChange={this.onChange('amountMXN')}
                    value={amount ? amount : ''}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    size="small"
                    className={!amount ? classes.disabledDepositBtn : classes.depositBtn}
                    disabled={!amount}
                    onClick={() => this.onClick()}
                  >
                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.add' })}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            : null
        }
        {
          (deposit_enabled && currency.type !== 'fiat') ?
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="small"
                className={!address ? classes.disabledDepositBtn : classes.depositBtn}
                disabled={!address}
                onClick={() => this.setState({ open: true })}
              >
                {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
              </Button>
            </Grid>
            : null
        }
        {
          ((deposit_enabled && currency.type !== 'fiat')||currency.type === 'compound') ?
            <div>
              <DepositModal
                open={open}
                address={address}
                submitDeposit={this.props.submitDeposit}
                currency={currency}
                currencydai={currencydai}
                apy={apy}
                onChange={this.props.onChangeModal}
                amount={depositAmount}
                loading={this.props.loading}
                alertPush={this.props.alertPush}
                intl={this.props.intl}
                handleClose={this.onClose}
                type={type}
                balance={balance}
                available_balance={available_balance}
                investment_balance={investment_balance}
              />
            </div>
            : null
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(injectIntl(DepositView));
