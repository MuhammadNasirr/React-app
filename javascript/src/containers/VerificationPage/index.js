/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import actions from "../../actions";
import Loader from '../../components/Loader'
import { injectIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { resendConfirmation } from '../../api/user';
import { getURLParameter } from '../../utils/getUrlParams'
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import Layout from '../../containers/Layout'
import { styles } from '../../styles/main';
import clsx from 'clsx'
class VerificationPage extends Component {
    state = {
        email: ''
    };

    componentDidMount() {
        const email = getURLParameter('email');
        if (email) {
            this.setState({ email })
        }
        else {
            this.props.history.push('/login')
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { email } = this.state;
        resendConfirmation(email).then(response => {
            const { data, status } = response;
            if (data && status === 201) {
                this.props.actions.alertPush({ message: ['page.header.signUp.modal.confirmation'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };
    loginRedirect = () => {
        setTimeout(() => {
            window.location = "/login"
        }, 2000);
    }

    onClose = () => {
        this.setState({ open: false })
    };


    render() {
        const { classes } = this.props;
        const { email } = this.state;

        return (
            <Layout>
                <div className={classes.externalBackground}>
                    <main className={classes.main}>
                        <CssBaseline />

                        {
                            email ?
                                <Paper className={classes.paper}>
                                    <Grid direction="row" justify="flex-start" alignItems="center" container className={classes.paperTitleRoot}>
                                        <IconButton
                                            className={classes.basicText}
                                            aria-label="add an alarm"
                                            onClick={() => this.props.history.push('/login')}
                                        >
                                            <ArrowIcon />
                                        </IconButton>
                                        <Typography component="h1" variant="body1" className={clsx(classes.verifyEmailHead, classes.basicTextMedium)}>
                                            {this.props.intl.formatMessage({ id: 'page.header.signUp.modal.header' })}
                                        </Typography>
                                    </Grid>
                                    <Grid container className={classes.paperInner}>
                                        <Typography component="h1" variant="body2" className={classes.primaryText} style={{ textAlign: 'center', marginTop: 25 }}>
                                            {this.props.intl.formatMessage({ id: 'page.header.signUp.modal.body' })}
                                        </Typography>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            style={{ marginTop: 20 }}
                                            onClick={this.onSubmit}
                                            className={classes.button}
                                        >
                                            {this.props.intl.formatMessage({ id: 'page.header.signUp.modal.resend' })}
                                        </Button>
                                    </Grid>
                                </Paper>
                                :
                                <Loader classes={classes} />
                        }
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
    }), actions))(injectIntl(VerificationPage));
