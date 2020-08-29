import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, } from 'react-intl';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import actions from "../../actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { forgotPass } from '../../api/user';
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import Layout from '../Layout';
import { styles } from '../../styles/main'
import clsx from 'clsx'


class ForgotPage extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            variant: 'error',
            message: 'otp is invalid',
            time: {},
            seconds: 60,
        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer() {
        if (this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.setState({ seconds: 60 })
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { email } = this.state;
        e.preventDefault();
        forgotPass(email).then(response => {
            const { data, status } = response;

            if (data && status === 201) {
                this.startTimer()
                this.setState({ resend: true, blocked: true }, () => {
                    setTimeout(() => {
                        this.setState({ blocked: false });
                        clearInterval(this.timer)
                    }, 60000);
                });
                this.props.actions.alertPush({ message: ['success.password.forgot'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onClose = () => {
        this.props.actions.reset()
    };

    validateEmail = (value) => {
        // eslint-disable-next-line
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(value)) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        const { classes } = this.props;
        const { email } = this.state;

        return (
            <Layout>
                <div className={classes.externalBackground}>
                    <main className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <Grid direction="row" justify="flex-start" alignItems="center" container className={classes.paperTitleRoot}>
                                <IconButton
                                    className={classes.basicText}
                                    aria-label="add an alarm"
                                    onClick={() => this.props.history.push('/login')}
                                >
                                    <ArrowIcon />
                                </IconButton>
                                <Typography component="h1" className={clsx(classes.forgotPassHead, classes.basicTextMedium)} variant="h2">{this.props.intl.formatMessage({ id: 'page.forgotPassword' })}</Typography>
                                <div />
                            </Grid>

                            <Grid container className={classes.paperInner}>
                                <Typography component="h1" variant="body2" className={classes.primaryText} style={{ textAlign: 'left', marginTop: 25 }}>{this.props.intl.formatMessage({ id: 'page.forgotPassword.message' })}</Typography>
                                <FormControl required fullWidth>
                                    <TextField
                                        placeholder={this.props.intl.formatMessage({ id: 'page.forgotPassword.email' })}
                                        // className={classes.textField}
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                    />
                                </FormControl>

                                <Button
                                    disabled={this.validateEmail(email) && !this.state.blocked ? false : true}
                                    type="submit"
                                    fullWidth
                                    className={classes.submit}
                                    variant="contained"
                                    onClick={this.onSubmit}
                                    classes={{
                                        disabled: classes.disabledButton
                                    }}
                                >
                                    {
                                        this.state.resend ?
                                            this.props.intl.formatMessage({ id: 'page.forgotPassword.resend' })
                                            :
                                            this.props.intl.formatMessage({ id: 'page.forgotPassword.send' })
                                    }
                                </Button>
                                {/* <div className={classes.primaryText} style={{ float: 'right', marginTop: 10 }}>
                                    {
                                        this.state.time.s !== 0 && this.state.blocked &&
                                        `${(this.props.intl.formatMessage({ id: 'page.forgotPassword.resend' })).toLowerCase()} ${this.state.time.m} : ${this.state.time.s}`
                                    }
                                </div> */}
                            </Grid>
                        </Paper>
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
    }), actions))(injectIntl(ForgotPage));
