/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import actions from "../../actions";
import Loader from '../../components/Loader'
import { confirmEmail } from '../../api/user';
import { getURLParameter } from '../../utils/getUrlParams'
import { styles } from '../../styles/main'

class ConfirmationPage extends Component {
    state = {
        loading: true,
        open: false,
        variant: 'error',
        message: 'otp is invalid',
        confirmation_token: ''
    };

    componentDidMount() {

        const confirmation_token = getURLParameter('confirmation_token');

        if (confirmation_token) {
            this.onConfirmEmail(confirmation_token)
        }
    }

    onConfirmEmail = (confirmation_token) => {
        confirmEmail(confirmation_token).then(response => {
            const { data, status } = response;
            if (data && status === 201) {
                this.props.actions.alertPush({ message: ['success.email.confirmed'], type: 'success', open: true });
                this.setState({ loading: false });
                this.loginRedirect()
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
                this.loginRedirect()
            })
    }

    loginRedirect = () => {
        setTimeout(() => {
            window.location = '/login'
        }, 2000);
    }

    onClose = () => {
        this.setState({ open: false })
    };


    render() {
        const { classes } = this.props;
        const {  loading } = this.state;

        return (
            <main className={classes.comfirmationMain}>
                <CssBaseline />

                {
                    loading &&
                    <Loader classes={classes} />
                }
            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => ({
        error: state.auth.errorLogin,
        open: state.user.open
    }), actions))(ConfirmationPage);
