import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import clsx from 'clsx'
import Button from '@material-ui/core/Button/Button';
import QRCode from 'qrcode.react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { styles } from '../../styles/main'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography  {...other}>
            <Typography variant="h2" className={classes.basicTextMedium}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.basicText} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class DepositModal extends Component {

    onSetMaxValue = (e) => {
        this.props.onChange("amount", this.props.available_balance)
    }

    onChange = field => e => {
        this.props.onChange(field, e.target.value ? parseFloat(e.target.value) : "");
    };

    render() {
        const { classes, open, amount, handleClose, address, type, available_balance, investment_balance, submitDeposit, currency, currencydai, apy } = this.props;
        const final_investment = parseFloat(investment_balance + amount).toFixed(currency.precision);

        return (
            <Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    maxWidth={'md'}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        classes: {
                            root: classes.dialogPaper
                        }
                    }}
                >
                    <DialogTitle className={classes.dialogTitleRoot} id="alert-dialog-slide-title" onClose={handleClose}>
                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
                    </DialogTitle>
                    <DialogContent>

                        {/* CODE SNIPPET FOR TYPE COMPOUND */}
                        {
                            type === 'compound' ?
                                <Grid className={classes.depositDialogContent}>

                                    <Grid container direction={'column'} className={classes.depositCompound}>
                                        <Grid item container justify="center" className={classes.fullWidth}>
                                            <Typography variant="h5" className={classes.availableBalance} classes={{ h5: classes.depositInvestment }} gutterBottom>
                                                {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.available' })}: <span className={classes.primaryNumber}>{available_balance.toFixed(2)} {currency.id.toUpperCase()}</span>
                                            </Typography>
                                            <Grid direction="row" item xs={12} container justify="space-between" alignItems="center">
                                                <Avatar
                                                    alt={currency.id.toUpperCase()}
                                                    src={currencydai.icon_url}
                                                    className={classes.compoundCurrencyIcon}
                                                    classes={{ img: classes.avatarImg }}
                                                />
                                                <TextField
                                                    name="amount"
                                                    type="number"
                                                    className={classes.compoundInput}
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.Monto' })}
                                                    id="outlined-disabled"
                                                    variant="standard"
                                                    value={amount}
                                                    onChange={this.onChange('amount')}
                                                    InputProps={{ disableUnderline: true, classes: { input: clsx(classes.textinput, classes.compoundModalInput) } }}
                                                />
                                            </Grid>
                                            <Grid container className={classes.depositCompoundModal} direction={'column'} alignItems="center">
                                                <Typography variant="h2" classes={{ h2: classes.primaryText, root: classes.setMaxBtn }} onClick={this.onSetMaxValue} >
                                                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.setmax' })}
                                                </Typography>
                                                <Grid container className={classes.depositModalMargin} direction={'column'} alignItems="center">
                                                    <Typography variant="h5" classes={{ h5: classes.depositInvestment }} gutterBottom>
                                                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.finalInvest' })}
                                                    </Typography>
                                                    <Typography variant="h2" classes={{ h2: classes.basicTextBold }} >
                                                        {final_investment} {currency.id.toUpperCase()}
                                                    </Typography>
                                                </Grid>
                                                <Grid container className={classes.depositModalMargin} direction={'column'} alignItems="center">
                                                    <Typography variant="h2" className={classes.textcenter} classes={{ h2: classes.primaryTextBold }} gutterBottom >
                                                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.estimatedMonthly' })}
                                                    </Typography>
                                                    <Typography variant="h2" classes={{ h2: classes.basicTextBold }} gutterBottom>
                                                        {(apy / 12).toFixed(currency.precision)}%
                                                            </Typography>
                                                    <Typography variant="h5" classes={{ h5: classes.depositInvestment }} >
                                                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.estimatedFrom' })}
                                                    </Typography>
                                                    <Typography variant="h5" classes={{ h5: classes.depositInvestment }} >
                                                        {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.currentRate' })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Button
                                                variant="contained"
                                                // size="small"
                                                className={classes.depositBtn}
                                                classes={{
                                                    disabled: classes.disabledChangeButton
                                                }}
                                                disabled={!amount || amount > available_balance}
                                                onClick={() => submitDeposit()}
                                            >
                                                {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                :

                                // {/* CODE SNIPPET FOR TYPE COIN OR FIAT */}
                                <Grid container direction={'column'}>
                                    <Grid item container justify="center" className={classes.fullWidth}>
                                        {address && <QRCode fgColor="#333333" size={300} className={classes.qrCode} value={address} />}
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            fullWidth
                                            id="outlined-disabled"
                                            placeholder={address}
                                            value={address ? address : ''}
                                            margin="normal"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                        />
                                    </Grid>
                                    {/* <Grid item>
                                <fieldset className={clsx(classes.fieldset, classes.textinput)}>
                                    {address || 'Not found'}
                                </fieldset>
                            </Grid> */}
                                    <Grid item>
                                        <CopyToClipboard text={address}>
                                            <Button
                                                variant="contained"
                                                // size="small"
                                                className={classes.depositBtn}
                                                classes={{
                                                    disabled: classes.disabledChangeButton
                                                }}
                                                disabled={!address}
                                                onClick={() => this.props.alertPush({ message: ['page.body.wallets.tabs.deposit.ccy.message.success'], type: 'success', open: true })}
                                            >
                                                {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.button' })}
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>
                                </Grid>
                        }
                    </DialogContent>
                </Dialog>

            </Fragment>
        );
    }
}

export default withStyles(styles)(DepositModal);