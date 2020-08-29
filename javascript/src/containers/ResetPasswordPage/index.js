/* eslint-disable */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SnackBar from '../../components/SnackBar';
import { getURLParameter } from '../../utils/getUrlParams'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { resetPass } from '../../api/user';
import { styles } from '../../styles/main';
import Layout from '../../containers/Layout'

class ResetPasswordPage extends Component {
    state = {
        email: '',
        open: false,
        variant: 'error',
        message: '',
        reset_password_token: ''
    };

    componentDidMount() {

        const reset_password_token = getURLParameter('reset_token');
        const confirmation_token = getURLParameter('confirmation_token');

        if (reset_password_token) {
            this.setState({ reset_password_token })
        }

        if (confirmation_token) {
            this.setState({ confirmation_token });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { password, confirm_password, reset_password_token } = this.state;
        resetPass(reset_password_token, password, confirm_password).then(response => {
            const { data, status } = response;
            if (data && status === 201) {
                this.setState({ open: true, message: "Your password has been changed", variant: 'success' });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            }
            else if (response.response.status === 400) {
                this.setState({ open: true, message: "Required params are empty", variant: 'error' })
            }
            else if (response.response.status === 404) {
                this.setState({ open: true, message: "Record is not found", variant: 'error' })
            }
            else if (response.response.status === 422) {
                this.setState({ open: true, message: "Validation errors", variant: 'error' })
            }
            else {
                this.setState({ open: true, message: "Internal server error", variant: 'error' })
            }
        })
            .catch(err => {
                this.setState({ open: true, message: "Something went wrong", variant: 'error' })
            })
    };

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onClose = () => {
        this.setState({ open: false })
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

    render() {
        const { classes } = this.props;
        const { password, confirm_password, variant, message, open } = this.state;

        return (
            <Layout>
                <div className={classes.externalBackground}>
                    <main className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <Grid direction="column" justify="center" container className={classes.paperTitleRoot}>
                                <Typography variant="h2" className={classes.basicTextMedium}>{this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.title' })}</Typography>
                            </Grid>
                            <Grid container className={classes.paperInner}>
                                <FormControl required fullWidth>
                                    <TextField
                                        error={!this.validatePassword(password) && password ? true : false}
                                        helperText={!this.validatePassword(password) && password ? this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.password.message.error' }) : ''}
                                        placeholder={this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.newPassword' })}
                                        // className={classes.textField}
                                        name="password"
                                        type="password"
                                        FormHelperTextProps={{ classes: { root: classes.errorText } }}
                                        value={password}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            disableUnderline: true, classes: { input: classes.textinput },
                                        }}
                                    />
                                </FormControl>

                                <FormControl required fullWidth>
                                    <TextField
                                        error={confirm_password && confirm_password !== password ? true : false}
                                        helperText={confirm_password && confirm_password !== password ? this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.repeatPassword.message.error' }) : ''}
                                        placeholder={this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.repeatPassword' })}
                                        // className={classes.textField}
                                        FormHelperTextProps={{ classes: { root: classes.errorText } }}
                                        name="confirm_password"
                                        value={confirm_password}
                                        type="password"
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            disableUnderline: true, classes: { input: classes.textinput },
                                        }}
                                    />
                                </FormControl>

                                <Button
                                    disabled={(this.validatePassword(password) && confirm_password === password) ? false : true}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                    onClick={this.onSubmit}
                                    className={classes.submit}
                                    classes={{
                                        disabled: classes.disabledButton
                                    }}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.button' })}
                                </Button>

                            </Grid>
                        </Paper>

                        <SnackBar
                            variant={variant}
                            open={open}
                            message={message}
                            onClose={this.onClose} />
                    </main>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.errorLogin,
        open: state.user.open
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(injectIntl(withRouter(ResetPasswordPage)));