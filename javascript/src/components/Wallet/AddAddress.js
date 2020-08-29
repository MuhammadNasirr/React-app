import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { addBeneficiaries, activate, addBeneficiariesMXN } from '../../api/withdraw'
import { styles } from '../../styles/main'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography {...other}>
            <Typography variant="h2" className={clsx(classes.basicTextMedium, classes.dialogTitleTextWidth)}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.basicText} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class AddAddress extends Component {
    state = {
        show: false,
        variant: '',
        message: '',
        step: 0,
        name: '',
        description: '',
        address: '',
        pin: '',
        beneficiary: '',
        full_name: '',
        bank_name: '',
        clabe_number: ''
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onClose = () => {
        this.setState({ show: false })
    }

    onCloseDialog = () => {
        this.props.handleClose()
        this.setState({ step: 0 })
    }

    createBeneficiary = () => {
        const { currency } = this.props;
        const { id } = currency;
        const { name, address, description, full_name, bank_name, clabe_number } = this.state;
        const addressObj = { address }
        let data = {}
        let api = ''
        if (id === 'mxn') {
            data = {
                currency: id,
                name,
                description,
                data: {
                    full_name,
                    bank_name,
                    clabe_number
                },
            }
            api = addBeneficiariesMXN
        } else {
            data = {
                name,
                description,
                currency: id,
                data: JSON.stringify(addressObj)
            }
            api = addBeneficiaries
        }

        api(data).then(res => {
            if (res.status === 201 || (res.status === 200 && id === 'mxn')) {
                this.props.fetchBeneficiaries(currency.id);
                if (id === 'mxn') {
                    this.props.handleClose();
                    this.setState({ step: 0 })
                    this.props.onReceieveAddress(res.data.id);
                } else {
                    this.setState({
                        step: 1,
                    });
                }
                this.setState({
                    beneficiary: res.data,
                    name: '',
                    description: '',
                    address: '',
                    full_name: '',
                    bank_name: '',
                    clabe_number: '',
                });
                this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.created'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    activateBeneficiary = () => {
        const { pin, beneficiary } = this.state;
        const data = {
            pin
        }
        activate(data, beneficiary.id).then(res => {
            if (res.status === 200) {
                this.props.handleClose();
                this.props.fetchBeneficiaries(this.props.currency.id);
                this.props.onReceieveAddress(res.data.id);
                this.setState({ step: 0, pin: '' });
                this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.activated'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    render() {
        const { classes, open, currency } = this.props;
        const { step, full_name, bank_name, clabe_number, name, description, address, pin } = this.state

        return (
            <Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    maxWidth={'xs'}
                    fullWidth
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        classes: {
                            root: classes.dialogPaper
                        }
                    }}
                >
                    <DialogTitle className={classes.dialogTitleRoot} id="customized-dialog-title" onClose={this.onCloseDialog}>
                        {step === 0 ?
                            this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.addAddress' })
                            :
                            this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.confirmAddress' })
                        }
                    </DialogTitle>
                    <DialogContent>
                        <Grid container>
                            {
                                step === 0 ?
                                    <>
                                        {currency.id === 'mxn' ?
                                            <form noValidate autoComplete="off">
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.fullName' })}
                                                    // className={classes.textField}
                                                    value={full_name}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('full_name')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.bank' })}
                                                    // className={classes.textField}
                                                    value={bank_name}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('bank_name')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.maxCode' })}
                                                    // className={classes.textField}
                                                    value={clabe_number}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('clabe_number')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.refLabel' })}
                                                    // className={classes.textField}
                                                    value={name}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('name')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.descriptionOptional' })}
                                                    // className={classes.textField}
                                                    value={description}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('description')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </form>
                                            :
                                            <form noValidate autoComplete="off">
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.blockchainAddress' })}
                                                    // className={classes.textField}
                                                    value={address}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('address')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.beneficiaryName' })}
                                                    // className={classes.textField}
                                                    value={name}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('name')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.description' })}
                                                    // className={classes.textField}
                                                    value={description}
                                                    InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                                    onChange={this.handleChange('description')}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="standard"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </form>
                                        }
                                    </>
                                    :
                                    <form style={{ margin: '0 auto' }} noValidate autoComplete="off">
                                        <div className={classes.primaryText} style={{ textAlign: 'center' }}>
                                            {this.props.intl.formatMessage({ id: 'page.confirmWithdrawals' })}
                                        </div>
                                        <TextField
                                            placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.pin' })}
                                            // className={classes.textField}
                                            InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                            value={pin}
                                            onChange={this.handleChange('pin')}
                                            fullWidth
                                            margin="normal"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions classes={{ root: classes.dialogAction }}>
                        {
                            step === 0 ?
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={classes.button}
                                    onClick={() => { this.createBeneficiary() }}
                                    style={{ paddingTop: 4 }}
                                    disabled={currency.id === 'mxn' ? !full_name || !bank_name || !clabe_number || !name : !name || !address}
                                    classes={{
                                        disabled: classes.disabledButton,
                                        label: classes.buttonLebel
                                    }}
                                >
                                    {
                                        currency.id === 'mxn' ?
                                            this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.mxnSubmit' })
                                            : this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.submit' })
                                    }
                                </Button>
                                :
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={classes.button}
                                    style={{ paddingTop: 4 }}
                                    onClick={this.activateBeneficiary}
                                    disabled={pin.length !== 6}
                                    classes={{
                                        disabled: classes.disabledButton,
                                        label: classes.buttonLebel
                                    }}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.confirm' })}
                                </Button>
                        }
                    </DialogActions>
                </Dialog>

            </Fragment>
        );
    }
}

export default withStyles(styles)(AddAddress);