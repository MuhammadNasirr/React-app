/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import clsx from 'clsx'
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
import DeleteIcon from '@material-ui/icons/Delete';
import ActivateIcon from '@material-ui/icons/TouchApp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { deleteBeneficiary, deleteBeneficiaryMXN, activate, activateMXN } from '../../api/withdraw';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
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

class SelectAddress extends Component {
    state = {
        show: false,
        variant: '',
        message: '',
        step: 0,
        name: '',
        description: '',
        address: '',
        pin: '',
        beneficiary: {},
        beneficiaries: [],
        selectedAddress: ''
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value.trim() });
    };

    onClose = () => {
        this.setState({ show: false })
    }

    onCloseDialog = () => {
        this.props.handleClose()
        this.setState({ step: 0 })
    }

    onSelectAddress = (address) => {
        this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.select'], type: 'success', open: true });
        this.props.onReceieveAddress(address)
    }

    activateBeneficiary = () => {
        const { pin, beneficiary } = this.state;
        const { currency } = this.props;
        if (currency && currency.id === 'mxn') {
            const data = {
                otp_code: pin
            }
            activateMXN(data, beneficiary.id).then(res => {
                if (res.status === 201) {
                    this.props.handleClose();
                    this.props.onReceieveAddress(res.data.id)
                    this.setState({ step: 0, pin: '' });
                    this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.activated'], type: 'success', open: true });
                    this.props.fetchBeneficiaries(this.props.currency.id)
                }
            })
                .catch(error => {
                    this.props.handleClose()
                    this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
                })
        } else {
            const data = {
                pin
            }
            activate(data, beneficiary.id).then(res => {
                if (res.status === 200) {
                    this.props.handleClose();
                    this.props.onReceieveAddress(res.data.id)
                    this.setState({ step: 0, pin: '' });
                    this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.activated'], type: 'success', open: true });
                    this.props.fetchBeneficiaries(this.props.currency.id)
                }
            })
                .catch(error => {
                    this.props.handleClose()
                    this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
                })
        }
    }

    removeBeneficiary = (id) => {
        const { currency } = this.props;
        if (currency && currency.id === 'mxn') {
            deleteBeneficiaryMXN(id).then(res => {
                if (res.status === 201) {
                    this.props.onDelete(id)
                    this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.deleted'], type: 'success', open: true });
                }
            })
                .catch(error => {
                    this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
                })
        } else {

            deleteBeneficiary(id).then(res => {
                if (res.status === 204) {
                    this.props.onDelete(id)
                    this.props.alertPush({ message: ['page.body.wallets.tabs.withdraw.modal.deleted'], type: 'success', open: true });
                }
            })
                .catch(error => {
                    this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
                })
        }
    }

    render() {
        const { classes, open, beneficiaries, currency } = this.props;
        const { variant, message, step, pin, selectedAddress, beneficiary } = this.state

        return (
            <Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    maxWidth={step === 0 && beneficiaries.length > 0 ? 'md' : 'xs'}
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
                            currency.id === 'mxn' ?
                                this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.selectBankAddress' })
                                : this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.selectAddress' })
                            :
                            this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.confirmAddress' })
                        }
                    </DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <List component="nav">
                                    <div
                                    // className={classes.listItems}
                                    >
                                        <Fragment>
                                            {step === 0 &&
                                                beneficiaries.length > 0 ?
                                                <div>
                                                    <Table className={classes.addressTable}>
                                                        <TableHead className={classes.tabsBackground}>
                                                            {
                                                                currency && currency.id === 'mxn' ?
                                                                    <TableRow>
                                                                        <TableCell className={classes.primaryText} padding="none"></TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.fullName' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.bank' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.maxCode' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.refLabel' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.description' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.selectAddress.activate' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.selectAddress.delete' })}</TableCell>
                                                                    </TableRow>
                                                                    : <TableRow>
                                                                        <TableCell className={classes.primaryText} padding="none"></TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.selectAddress.label' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.selectAddress.address' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.description' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.selectAddress.activate' })}</TableCell>
                                                                        <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.selectAddress.delete' })}</TableCell>
                                                                    </TableRow>
                                                            }
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                beneficiaries && beneficiaries.length > 0 && beneficiaries.map((item, index) => {
                                                                    return (
                                                                        <React.Fragment key={index}>
                                                                            {
                                                                                currency && currency.id === 'mxn' ?
                                                                                    <TableRow>
                                                                                        <TableCell className={classes.primaryText} padding="none">
                                                                                            <RadioGroup aria-label="address" name="address" value={selectedAddress} onChange={this.handleChange('selectedAddress')} onClick={() => this.setState({ beneficiary: item })}>
                                                                                                <FormControlLabel
                                                                                                    style={{ marginRight: 0 }}
                                                                                                    value={item.id.toString()}
                                                                                                    control={<Radio classes={{ checked: classes.primaryText }} />}
                                                                                                    labelPlacement="end"
                                                                                                />
                                                                                            </RadioGroup>
                                                                                        </TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.data.full_name}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.data.bank_name}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.data.clabe_number}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.name}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.description}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">
                                                                                            {
                                                                                                item.state === 'pending' &&
                                                                                                <IconButton edge="end" aria-label="delete" onClick={() => this.setState({ step: 1, beneficiary: item })}>
                                                                                                    <ActivateIcon className={classes.primaryText} />
                                                                                                </IconButton>
                                                                                            }
                                                                                            {
                                                                                                item.state === 'active' &&
                                                                                                <IconButton disabled={true} edge="end" aria-label="delete">
                                                                                                    <CheckCircleOutlineIcon className={classes.basicText} />
                                                                                                </IconButton>
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className={classes.basicText} padding="none">
                                                                                            <IconButton edge="end" aria-label="delete" onClick={() => this.removeBeneficiary(item.id)}>
                                                                                                <DeleteIcon className={classes.errorText} />
                                                                                            </IconButton>
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                    :
                                                                                    <TableRow>
                                                                                        <TableCell className={classes.primaryText} padding="none">
                                                                                            <RadioGroup aria-label="address" name="address" value={selectedAddress} onChange={this.handleChange('selectedAddress')} onClick={() => this.setState({ beneficiary: item })}>
                                                                                                <FormControlLabel
                                                                                                    style={{ marginRight: 0 }}
                                                                                                    value={item.id.toString()}
                                                                                                    control={<Radio classes={{ checked: classes.primaryText }} />}
                                                                                                    labelPlacement="end"
                                                                                                />
                                                                                            </RadioGroup>
                                                                                        </TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.name}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.data.address}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">{item.description}</TableCell>
                                                                                        <TableCell className={classes.primaryText} padding="none">
                                                                                            {
                                                                                                item.state === 'pending' &&
                                                                                                <IconButton edge="end" aria-label="delete" onClick={() => this.setState({ step: 1, beneficiary: item })}>
                                                                                                    <ActivateIcon className={classes.primaryText} />
                                                                                                </IconButton>
                                                                                            }
                                                                                            {
                                                                                                item.state === 'active' &&
                                                                                                <IconButton disabled={true} edge="end" aria-label="delete">
                                                                                                    <CheckCircleOutlineIcon className={classes.basicText} />
                                                                                                </IconButton>
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className={classes.basicText} padding="none">
                                                                                            <IconButton edge="end" aria-label="delete" onClick={() => this.removeBeneficiary(item.id)}>
                                                                                                <DeleteIcon className={classes.errorText} />
                                                                                            </IconButton>
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                            }
                                                                        </React.Fragment>
                                                                    )
                                                                }
                                                                )
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                :
                                                <div className={classes.primaryText} style={{ textAlign: 'center' }}>
                                                    {this.props.intl.formatMessage({ id: 'page.noDataToShow' })}
                                                </div>
                                            }
                                        </Fragment>
                                    </div>
                                </List>
                            </Grid>
                            {
                                step === 1 &&
                                <Grid item xs={12} >
                                    <div className={classes.primaryText} style={{ textAlign: 'center' }}>
                                        {this.props.intl.formatMessage({ id: 'page.confirmWithdrawals2fa' })}
                                    </div>
                                    <TextField
                                        placeholder={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.pin' })}
                                        value={pin}
                                        onChange={this.handleChange('pin')}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                    />
                                </Grid>
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
                                    onClick={() => this.onSelectAddress(beneficiary.id)}
                                    color="secondary"
                                    disabled={!selectedAddress || beneficiary.state === 'pending' || !beneficiaries.length}
                                    classes={{
                                        disabled: classes.disabledButton
                                    }}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.select' })}
                                </Button>
                                :
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={classes.button}
                                    onClick={this.activateBeneficiary}
                                    color="secondary"
                                    disabled={pin.length !== 6}
                                    classes={{
                                        disabled: classes.disabledButton
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

export default withStyles(styles)(SelectAddress);