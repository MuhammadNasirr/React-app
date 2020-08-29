import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import Typography from "@material-ui/core/Typography/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { injectIntl } from 'react-intl';
import LoginForm from '../../components/LoginForm';
import actions from "../../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Layout from '../Layout';
import { styles } from '../../styles/main';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { getCookie } from '../../utils/cookies';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogTitleRoot} {...other}>
      <Typography variant="h2" className={classes.basicTextMedium}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon className={classes.basicText} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    otpCode: '',
    variant: 'error',
    message: 'otp is invalid'
  };

  onSubmit = e => {
    e.preventDefault();
    const email = getCookie('email');
    const otp = getCookie('otp');
    const otp_val = otp ? JSON.parse(otp) : false;
    if (email === this.state.email && otp_val) {                                  // checking if the returning user has same email and 2fa is enabled
      this.props.actions.setModal(true);
      return false
    }
    this.props.actions.fetchLogin(this.state.email, this.state.password, this.state.otpCode);
  };

  handleChangeField = (field, value) => this.setState({ [field]: value });

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = (event) => {
    this.setState({ otpCode: '' })
    this.props.actions.setModal(false);
  };

  handleClick = () => {
    this.props.actions.fetchLogin(this.state.email, this.state.password, this.state.otpCode);
  }

  onClose = () => {
    this.props.actions.reset()
  };

  render() {
    const { classes, error, open } = this.props;
    const { email, password, otpCode } = this.state;

    const isDigitValid = otpCode.length === 6 ? true : false;


    return (
      <Layout>
        <div className={classes.externalBackground}>
          <main className={classes.main}>
            <CssBaseline />
            <LoginForm
              email={email}
              password={password}
              onChange={this.handleChangeField}
              onSubmit={this.onSubmit}
              error={error}
              intl={this.props.intl}
            />
            {/* DIALOG BOX FOR GOOGLE AUTH STARTS*/}

            <Dialog
              open={open}
              TransitionComponent={Transition}
              maxWidth={'xs'}
              fullWidth
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{
                classes: {
                  root: classes.dialogPaper
                }
              }}
            >
              <DialogTitle id="alert-dialog-slide-title" onClose={this.handleClose}>
                {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.header' })}
              </DialogTitle>
              <DialogContent>
                <TextField
                  placeholder={this.props.intl.formatMessage({ id: 'page.body.login.modal.input-placeholder' })}
                  type="number"
                  value={this.state.otpCode}
                  onChange={this.handleChange('otpCode')}
                  fullWidth
                  margin="normal"
                  variant="standard"
                  InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={!isDigitValid}
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.handleClick()}
                >
                  {this.props.intl.formatMessage({ id: 'page.body.market.modal.confirm_btn' })}
                </Button>
              </DialogActions>
            </Dialog>

            {/* DIALOG BOX FOR GOOGLE AUTH ENDS*/}

          </main>
        </div>
      </Layout>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({
    error: state.auth.errorLogin,
    open: state.user.open
  }), actions))(injectIntl(withRouter(LoginPage)));
