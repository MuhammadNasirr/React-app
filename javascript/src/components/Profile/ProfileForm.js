/* eslint-disable */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch'
import { FormGroup, FormControlLabel } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ButtonBase from '@material-ui/core/ButtonBase';
import { styles, main_solid_colors, secondary_solid_colors } from '../../styles/main'

//ICONS
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//LIST
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// ASSETS
import Grid from "@material-ui/core/Grid";
import { host } from '../../config';

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

class Profile extends Component {

  state = {
    openPassword: false,
    openGoogleAuth: false,
    authChecked: false,
    referalLink: '',
    is_valid: true,
    code: '',
    enabled: false,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;
    const { otp } = currentUser;
    this.setState({
      authChecked: otp,
      // openGoogleAuth: otp ? false : true
    })
  }

  handleOpenPass = () => {
    this.setState({ openPassword: true });
  };

  handleClosePass = () => {
    this.setState({
      openPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      is_valid: true
    });
  };

  handleGoogleAuthChange = (name) => event => {
    const { currentUser } = this.props;
    const { otp } = currentUser;
    if (event.target.checked && !otp) {
      this.setState({ openGoogleAuth: true, [name]: event.target.checked })
    }
    else {
      this.setState({ enabled: true })
    }
  };

  handleCloseAuth = () => {
    this.setState({ openGoogleAuth: false, authChecked: false });
  };

  handleClose = () => {
    this.setState({ enabled: false });
  };

  handleChange = name => event => {
    if (name === 'newPassword') {
      let validate = this.validatePassword(event.target.value);
      this.setState({ is_valid: validate })
    }
    if (event.target.type === 'checkbox') {
      this.setState({
        [name]: event.target.checked
      });
    }
    else {
      this.setState({
        [name]: event.target.value,
        // openGoogleAuth: name == 'code' ? true : false
      });
    }
    this.props.onChange(name, event.target.value.trim());
  };

  validatePassword = (value) => {
    const regex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
    if (regex.test(value)) {
      return true
    }
    else {
      return false
    }
  }

  onSubmitgoogleAuth = () => {
    this.setState({ openGoogleAuth: false, authChecked: false, code: '' });
    this.props.onSubmitGoogle2FA()
  };

  onDisablegoogleAuth = () => {
    this.setState({ enabled: false, code: '' });
    this.props.onDisableGoogle2FA()
  };

  onSubmitPassChange = () => {
    this.setState({
      openPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    this.props.onChangePassword()
  };

  onClose = () => {
    this.setState({ open: false })
  };

  renderEnableFeatures(key) {
    switch (key) {
      case 'email':
        return this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile.email.message' });

      case 'phone':
        return this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile.phone.message' });

      case 'profile':
        return this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile.identity.message' })

      default:
        break;
    }
  }

  isVerified(key) {
    const { labels } = this.props;
    const label = labels.find(x => x.key === key);
    const status = label && label.value === 'verified' ? true : false;
    return status
  }

  render() {
    const { classes, currentUser, history, qrcode } = this.props;
    const { oldPassword, newPassword, confirmPassword, is_valid } = this.state;
    const secret = qrcode && qrcode.url.split("secret=")[1];
    const passwordMatch = newPassword === confirmPassword ? true : false;
    const emptyFields = (!oldPassword || !newPassword || !confirmPassword) ? true : false;
    const referalLink = `${host}/signup?refid=${currentUser.uid}`

    return (
      <Paper className={classes.profilePaper}>
        <Grid container className={classes.profileTitleRoot}>
          <Typography variant="h2" className={classes.basicTextMedium}>{this.props.intl.formatMessage({ id: 'page.header.navbar.profile' })}</Typography>
        </Grid>
        <Grid container className={classes.paperInner}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={12} md={6} sm={6} className={classes.profileForm} >
              <div style={{ marginBottom: '20px' }}>
                <Typography variant="h2" component="h2" style={{ marginBottom: '5px' }} className={classes.primaryTextBold}>
                  {currentUser.email}
                </Typography>

                <Typography variant="h3" component="h3" className={classes.primaryText}>
                  {this.props.intl.formatMessage({ id: 'page.body.profileForm.UID' })}: {currentUser.uid}
                </Typography>
              </div>

              <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', marginRight: '30px' }}>
                <div>
                  <Typography variant="h3" component="h3" className={classes.primaryTextBold}>
                    {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password' })}
                  </Typography>
                  <Typography variant="h5" component="h5" className={classes.primaryText}  >
                    *******
                </Typography>
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.changeButton}
                  onClick={this.handleOpenPass}
                >
                  {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' })}
                </Button>

              </div>
              <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', marginRight: '50px' }}>
                <div>
                  <Typography variant="h3" component="h3" className={classes.primaryTextBold}>
                    {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication' })}
                  </Typography>
                  <Typography variant="h5" component="h5" style={{ color: currentUser.otp ? main_solid_colors.color4 : secondary_solid_colors.color4 }}>
                    {
                      currentUser.otp ?
                        this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.enable' })
                        :
                        this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.disable' })
                    }
                  </Typography>
                </div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.authChecked}
                        onChange={this.handleGoogleAuthChange('authChecked')}
                        value="authChecked"
                      // color="primary"
                      />
                    }
                    labelPlacement="end"
                  />
                </FormGroup>

              </div>

            </Grid>
            <Grid item xs={12} sm={6} md={6} className={classes.gridCenter}>
              <Typography variant="h3" component="h3" className={clsx(classes.profileVerifyHead, classes.primaryTextBold)}>
                {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile' })}
              </Typography>
              <List component="nav">
                <div className={classes.profileRoot}>
                  <ListItem button>
                    <ListItemText
                      className={classes.primaryText}
                      primary={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile.email.title' })}
                      secondary={
                        <React.Fragment>
                          <span className={clsx(classes.primaryText, classes.heading5)}>
                            {
                              this.renderEnableFeatures('email')
                            }
                          </span>
                        </React.Fragment>
                      }>
                    </ListItemText>
                    {
                      this.isVerified('email') &&
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Check">
                          <CheckCircleIcon className={classes.successText} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    }
                  </ListItem>
                  <Divider />
                </div>

                <div className={classes.profileRoot}>
                  <ListItem button>
                    <ListItemText
                      className={classes.primaryText}
                      primary={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile.phone.title' })}
                      secondary={
                        <React.Fragment>
                          <span className={clsx(classes.primaryText, classes.heading5)}>
                            {
                              this.renderEnableFeatures('phone')
                            }
                          </span>
                        </React.Fragment>
                      }>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      {
                        this.isVerified('phone') ?
                          <IconButton aria-label="Check">
                            <CheckCircleIcon className={classes.successText} />
                          </IconButton>
                          :
                          <IconButton aria-label="info" onClick={() => history.push('/confirm', { step: 0 })}>
                            <InfoIcon className={classes.primaryText} />
                          </IconButton>
                      }
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>

                <div className={classes.profileRoot}>
                  <ListItem button>
                    <ListItemText
                      className={classes.primaryText}
                      primary={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.profile.identity.title' })}
                      secondary={
                        <React.Fragment>
                          <span className={clsx(classes.primaryText, classes.heading5)}>
                            {
                              this.renderEnableFeatures('profile')
                            }
                          </span>
                        </React.Fragment>
                      }>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      {
                        this.isVerified('profile') ?
                          <IconButton aria-label="Check">
                            <CheckCircleIcon className={classes.successText} />
                          </IconButton>
                          :
                          <IconButton aria-label="icon" onClick={() => history.push('/confirm', 2)}>
                            <InfoIcon className={classes.primaryText} />
                          </IconButton>
                      }
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>

              </List>
            </Grid>
          </Grid>
          <TextField
            // disabled
            id="outlined-full-width"
            placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.referralProgram' })}
            defaultValue={referalLink}
            // value={referalLink}
            className={clsx(classes.textinput, classes.buyInput)}
            margin="normal"
            variant="standard"
            fullWidth
            // InputLabelProps={{
            //   shrink: true,
            // }}
            InputProps={{
              disableUnderline: true, classes: { input: classes.primaryText },
              endAdornment: (
                <InputAdornment position="end">
                  <CopyToClipboard text={referalLink}>
                    <Button
                      variant="contained"
                      // color="secondary"
                      className={classes.textBtn}
                      onClick={() => this.props.actions.alertPush({ message: ['page.body.profile.header.account.content.twoFactorAuthentication.copied.referal'], type: 'success', open: true })}
                    >
                      {this.props.intl.formatMessage({ id: 'page.body.profile.content.copyLink' })}
                    </Button>
                  </CopyToClipboard>
                </InputAdornment>
              ),
            }}
          />

        </Grid>


        {/* DIALOG BOX FOR UPDATE PASSWORD STARTS*/}

        <Dialog
          open={this.state.openPassword}
          TransitionComponent={Transition}
          maxWidth={'xs'}
          fullWidth
          keepMounted
          // onClose={this.handleClosePass}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            classes: {
              root: classes.dialogPaper
            }
          }}
        >
          <DialogTitle className={classes.dialogTitleRoot} id="alert-dialog-slide-title" onClose={this.handleClosePass}>
            {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.change' })}
          </DialogTitle>
          <DialogContent>
            <form className={classes.profileContainer} noValidate autoComplete="off">
              <TextField
                placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' })}
                type="password"
                className={classes.textField}
                value={this.state.oldPassword}
                onChange={this.handleChange('oldPassword')}
                fullWidth
                margin="normal"
                variant="standard"
                InputProps={{
                  disableUnderline: true, classes: { input: classes.textinput },
                  // shrink: true,
                }}
              />
              <TextField
                error={!is_valid ? true : false}
                placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                type="password"
                className={classes.textField}
                value={this.state.newPassword}
                onChange={this.handleChange('newPassword')}
                fullWidth
                margin="normal"
                variant="standard"
                helperText={!is_valid ? this.props.intl.formatMessage({ id: 'page.body.signUp.error.password' }) : ''}
                InputProps={{
                  disableUnderline: true, classes: { input: classes.textinput },
                  // shrink: true,
                }}
              />
              <TextField
                placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' })}
                type="password"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                fullWidth
                margin="normal"
                variant="standard"
                InputProps={{
                  disableUnderline: true, classes: { input: classes.textinput },
                  // shrink: true,
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              className={classes.cancelButton}
              onClick={this.handleClosePass}
            // color="primary"
            >
              {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.cancel' })}
            </Button>
            <Button
              disabled={emptyFields || !passwordMatch || !is_valid}
              fullWidth
              variant="contained"
              className={classes.button}
              classes={{
                disabled: classes.disabledChangeButton
              }}
              onClick={this.onSubmitPassChange}
              color="secondary"
            >
              {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' })}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG BOX FOR UPDATE PASSWORD ENDS*/}

        {/* DIALOG BOX FOR GOOGLE AUTH STARTS*/}

        <Dialog
          open={this.state.openGoogleAuth}
          TransitionComponent={Transition}
          maxWidth={'sm'}
          fullWidth
          keepMounted
          // onClose={this.handleCloseAuth}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            classes: {
              root: classes.dialogPaper
            }
          }}
        >
          <DialogTitle className={classes.dialogTitleRoot} id="alert-dialog-slide-title" onClose={this.handleCloseAuth}>
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
                      <a className={classes.primaryText} href='https://itunes.apple.com/ru/app/google-authenticator/id388497605?mt=8' target='_blank'> {this.props.intl.formatMessage({ id: 'page.body.profileForm.AppStore' })} </a>
                      <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.message.or' })}</span>
                      <a className={classes.primaryText} href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl' target='_blank'>{this.props.intl.formatMessage({ id: 'page.body.profileForm.googlePlay' })}</a>
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
                      qrcode.barcode &&
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
                      disableUnderline: true, classes: { input: classes.primaryTextBold },
                      endAdornment: (
                        <InputAdornment position="end">
                          <CopyToClipboard text={secret}>
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.textBtn}
                              onClick={() => this.props.actions.alertPush({ message: ['page.body.profile.header.account.content.twoFactorAuthentication.copied.mfa'], type: 'success', open: true })}
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
                      // label="2FA Code"
                      placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.subHeader' })}
                      // className={classes.textField}
                      value={this.state.code}

                      onChange={this.handleChange('code')}
                      fullWidth
                      type="number"
                      margin="normal"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true, classes: { input: classes.textinput },
                      }}
                    />
                  </Grid>

                </Grid>

              </Grid>

            </Grid>

          </DialogContent>
          <DialogActions>
            <Button
              disabled={this.state.code.length !== 6}
              fullWidth
              variant="contained"
              className={this.state.code.length !== 6 ? classes.disabledChangeButton : classes.button}
              onClick={this.onSubmitgoogleAuth}
              color="secondary"
            // className={classNames(classes.margin, classes.cssRoot)}
            // style={{ backgroundColor: this.state.code.length !== 6 ? 'rgba(0, 0, 0, 0.12)' : '#04479C' }}
            >
              {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.enable' })}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG BOX FOR GOOGLR AUTH ENDS*/}

        {/* DIALOG BOX FOR CONTACT ADMINISTRATOR STARTS*/}

        <Dialog
          open={this.state.enabled}
          TransitionComponent={Transition}
          maxWidth={'xs'}
          fullWidth
          keepMounted
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            classes: {
              root: classes.dialogPaper
            }
          }}
        >
          <DialogTitle className={classes.dialogTitleRoot} id="alert-dialog-slide-title" onClose={this.handleClose}>
            {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.modalHeader' })}
          </DialogTitle>
          <DialogContent>

            <Grid container direction="row"
              justify="space-around"
              alignItems="center">

              <Grid item xs={12} sm={12}>
                <TextField
                  placeholder={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.subHeader' })}
                  // className={classes.textField}
                  value={this.state.code}
                  onChange={this.handleChange('code')}
                  fullWidth
                  type="number"
                  margin="normal"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true, classes: { input: classes.textinput },
                  }}
                />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={this.state.code.length !== 6}
              fullWidth
              variant="contained"
              className={this.state.code.length !== 6 ? classes.disabledChangeButton : classes.button}
              onClick={this.onDisablegoogleAuth}
            >
              {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.disable' })}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG BOX FOR CONTACT ADMINISTRATOR ENDS*/}

        {/* <SnackBar
          variant="success"
          open={this.state.open}
          message={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.twoFactorAuthentication.copied.mfa' })}
          onClose={this.onClose} /> */}

      </Paper>
    );
  }
}

export default withStyles(styles)(Profile);
