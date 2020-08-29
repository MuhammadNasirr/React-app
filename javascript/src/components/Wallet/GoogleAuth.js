import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core';
// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { enable2FA } from '../../api/user'
import { setCookie } from '../../utils/cookies';
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

class GoogleAuth extends Component {
    state = {
        code: '',
        show: false,
        variant: '',
        message: ''
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value.trim() });
    };

    onClose = () => {
        this.setState({ show: false })
    }

    activate2FA = () => {
        const { user } = this.props;
        const { email } = user;
        const { code } = this.state;
        const otpCode = { code };
        this.props.handleClose()
        enable2FA(otpCode).then(res => {
            if (res.status === 201) {
                this.props.setOtp(true)
                this.props.alertPush({ message: ['success.otp.enabled'], type: 'success', open: true });
                setCookie('email', email, 2);
                setCookie('otp', true, 2);
            }
        })
            .catch(error => {
                this.props.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    render() {
        const { classes, open, qrcode, handleClose } = this.props;
        const secret = qrcode && qrcode.url.split("secret=")[1];

        return (
            <Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    maxWidth={'sm'}
                    keepMounted
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        classes: {
                            root: classes.dialogPaper
                        }
                    }}
                >
                    <DialogTitle className={classes.dialogTitleRoot} id="alert-dialog-slide-title" onClose={handleClose}>
                        {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.header' })}
                    </DialogTitle>
                    <DialogContent>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>

                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="body2" className={classes.stepText}>
                                            <span className={clsx(classes.stepnumber, classes.primaryNumber)}>1</span>
                                            <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.1' })}</span>
                                            <a className={classes.primaryText} href='https://itunes.apple.com/ru/app/google-authenticator/id388497605?mt=8' target='_blank' rel="noopener noreferrer" > {this.props.intl.formatMessage({ id: 'page.body.profileForm.AppStore' })} </a>
                                            <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.or' })}</span>
                                            <a className={classes.primaryText} href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl' target='_blank' rel="noopener noreferrer" >{this.props.intl.formatMessage({ id: 'page.body.profileForm.googlePlay' })}</a>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom className={classes.stepText}>
                                            <span className={clsx(classes.stepnumber, classes.primaryNumber)}>2</span>
                                            <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.2' })}</span>
                                            <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.3' })}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <ButtonBase className={classes.profileImage}>
                                        {
                                            qrcode && qrcode.barcode &&
                                            <img className={classes.profileImg} src={`data:image/png;base64,${qrcode.barcode}`} alt="complex" />
                                        }
                                    </ButtonBase>
                                </Grid>

                                <Grid item container direction="row" style={{ marginTop: 25 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-disabled"
                                        placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.mfa' })}
                                        value={secret}
                                        className={clsx(classes.buyInput, classes.textinput)}
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{
                                            classes: { input: classes.primaryTextBold },
                                            disableUnderline: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CopyToClipboard text={secret}>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            className={classes.textBtn}
                                                            onClick={() => this.props.alertPush({ message: ['page.body.profile.header.account.content.twoFactorAuthentication.copied.mfa'], type: 'success', open: true })}
                                                        >
                                                            {this.props.intl.formatMessage({ id: 'page.body.profile.content.copyLink' })}
                                                        </Button>
                                                    </CopyToClipboard>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item container direction="row" style={{ marginTop: 25 }}>
                                    <Grid item xs={12} sm={9}>
                                        <Typography variant="body2" gutterBottom className={clsx(classes.basicText, classes.step3)}>
                                            <span className={clsx(classes.stepnumber, classes.primaryNumber)}>3</span>
                                            <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.4' })}</span>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            style={{ width: 130 }}
                                            placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.subHeader' })}
                                            value={this.state.code}
                                            onChange={this.handleChange('code')}
                                            fullWidth
                                            type="number"
                                            margin="normal"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions classes={{ root: classes.dialogAction }}>
                        <Button
                            disabled={this.state.code.length !== 6}
                            fullWidth
                            variant="contained"
                            className={this.state.code.length !== 6 ? classes.disabledDepositBtn : classes.depositBtn}
                            onClick={this.activate2FA}
                            color="secondary"
                        >
                            {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.enable' })}
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        );
    }
}

export default withStyles(styles)(GoogleAuth);