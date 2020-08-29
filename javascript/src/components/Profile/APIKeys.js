import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Switch from '@material-ui/core/Switch';
import { styles } from '../../styles/main'

//ICON
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning'

// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { color } from '../../styles/static'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: color.backgroundColorDark,
    color: theme.palette.common.white,
  },

}))(TableCell);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogTitleRoot} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class APIKeys extends Component {

  state = {
    otpCode: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({ otpCode: '' })
    this.props.setModal(false);
    this.props.setConfirmModal(false);
  };

  handleClick = (mode, kid) => {
    this.setState({ mode: mode, kid, otpCode: '' })
    this.props.setModal(true);
  }

  handleChangeState = (e, apiKey) => {
    this.setState({ mode: 'edit', otpCode: '', kid: apiKey.kid, status: e.target.checked ? 'active' : 'disabled' })
    this.props.setModal(true);
  }

  onClickConfirm() {
    const { mode, otpCode, kid, status } = this.state;
    switch (mode) {
      case 'get':
        this.props.onFetch(otpCode)
        break;

      case 'delete':
        this.props.onDelete(otpCode, kid)
        break;

      case 'edit':
        this.props.onEdit(otpCode, kid, status)
        break;

      default:
        this.props.onCreate(otpCode)
        break;
    }
  }

  render() {
    const { classes, currentUser, keys, createdKey, modalState, openConfirm, show, loading } = this.props;
    const { otpCode, mode } = this.state;
    const { otp } = currentUser;
    const isDigitValid = otpCode.length === 6 ? true : false;

    return (
      <Paper className={classes.keyPaper}>
        <Typography component="h6" variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.header' })}
        </Typography>

        {
          otp && !show &&
          <Button
            variant="contained"
            color="secondary"
            className={classes.textBtn}
            style={{ marginBottom: 20 }}
            // style={{ width: '300px' }}
            onClick={(e) => this.handleClick('create')}
          >
            {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.create' })}
          </Button>
        }

        {
          !loading && keys && keys.length > 0 &&
          <div className={classes.tableRoot}>
            <Grid container>
              <Grid item xs={12}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell className={classes.tableCell}>{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.table.header.kid' })}</CustomTableCell>
                      <CustomTableCell className={classes.tableCell} align="right">{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.table.header.state' })}</CustomTableCell>
                      <CustomTableCell className={classes.tableCell} align="right">{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.table.header.created' })}</CustomTableCell>
                      <CustomTableCell className={classes.tableCell} align="right"></CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keys.map((apiKey, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">{apiKey.kid}</TableCell>
                        <TableCell className={`${classes.tableCell} ${apiKey.state === 'active' ? classes.successText : classes.failed}`} align="right">
                          {
                            apiKey.state === 'active' ?
                              this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.active' })
                              :
                              this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.disabled' })
                          }
                          <Switch
                            checked={apiKey.state === 'active' ? true : false}
                            onChange={(e) => this.handleChangeState(e, apiKey)}
                            value="authChecked"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell className={clsx(classes.tableCell, classes.secondaryNumber)} align="right">{moment(apiKey.created_at).format('MM-DD-YYYY hh:mm:s')}</TableCell>
                        <TableCell className={classes.tableCell} align="right">
                          <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={(e) => this.handleClick('delete', apiKey.kid)}
                          >
                            <CloseIcon className={classes.errorText} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </div>
        }

        {
          !loading && keys && !keys.length &&
          <div>
            <span>
              {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.noDataToShow' })}
            </span>
          </div>
        }


        {/* DIALOG BOX FOR GOOGLE AUTH STARTS*/}

        <Dialog
          open={modalState}
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
              label="Enter 6-digit Code"
              type="number"
              value={this.state.otpCode}
              onChange={this.handleChange('otpCode')}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={!isDigitValid}
              fullWidth
              variant="contained"
              className={!isDigitValid ? classes.disabledChangeButton : classes.button}
              onClick={() => this.onClickConfirm()}
            >
              {
                mode === 'create' || mode === 'edit' || mode === 'get' ?
                  this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.confirm' })
                  :
                  this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.delete' })
              }
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG BOX FOR GOOGLE AUTH ENDS*/}

        {/* DIALOG BOX FOR CREATE KEY STARTS*/}

        {
          createdKey && createdKey.kid ?
            <Dialog
              open={openConfirm}
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
                {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.created_header' })}
              </DialogTitle>
              <DialogContent>
                <Grid container xs>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      disabled
                      id="outlined-full-width"
                      label={this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.access_key' })}
                      value={createdKey.kid}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: { input: classes.resize },
                        endAdornment: (
                          <InputAdornment position="end">
                            <CopyToClipboard text={createdKey.kid}>
                              <Button
                                variant="contained"
                                // color="primary"
                                className={classes.textBtn}
                                onClick={() => this.props.actions.alertPush({ message: ['success.api_keys.copied.access'], type: 'success', open: true })}
                              >
                                {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.copy' })}
                              </Button>
                            </CopyToClipboard>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item container spacing={16}>
                    <Grid item xs={12} sm={1}>
                      <WarningIcon className={classes.warningIcon} />
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      <p className={clsx(classes.text, classes.warningText)} >{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.secret_key' })}</p>
                      <p className={clsx(classes.text, classes.warningText)} >{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.secret_key_info' })}</p>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      disabled
                      id="outlined-full-width"
                      label={this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.secret_key' })}
                      style={{ fontSize: 8 }}
                      value={createdKey.secret.data.value}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: { input: classes.resize },
                        endAdornment: (
                          <InputAdornment position="end">
                            <CopyToClipboard text={createdKey.secret.data.value}>
                              <Button
                                variant="contained"
                                // color="primary"
                                className={classes.textBtn}
                                onClick={() => this.props.actions.alertPush({ message: ['success.api_keys.copied.secret'], type: 'success', open: true })}
                              >
                                {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.copy' })}
                              </Button>
                            </CopyToClipboard>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <p className={classes.text}>{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.note' })}</p>
                    <p className={classes.text}>{this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.note_content' })}</p>
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleClose}
                >
                  {this.props.intl.formatMessage({ id: 'page.body.profile.apiKeys.modal.btn.confirm' })}
                </Button>
              </DialogActions>
            </Dialog>
            :
            null
        }

        {/* DIALOG BOX FOR CREATE KEY ENDS*/}

      </Paper>
    );
  }
}

export default withStyles(styles)(APIKeys);
