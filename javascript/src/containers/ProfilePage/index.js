/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Layout from '../Layout';
import Profile from '../../components/Profile/ProfileForm';
import APIKeys from '../../components/Profile/APIKeys';
import AccountActivity from '../../components/Profile/AccountActivity';
import actions from "../../actions";
import { injectIntl } from 'react-intl';
import { setCookie } from '../../utils/cookies'

//api
import { getApiKeys, createApiKey, deleteApiKey, editApiKey, changePass, getLabels, getActivities, disable2FA, enable2FA, generateQRCode } from '../../api/user'
import { styles } from '../../styles/main'

class ProfilePage extends Component {

    state = {
        email: '',
        password: '',
        qrcode: '',
        user: {},
        activities: [],
        verifications: [],
        apikeys: [],
        variant: '',
        show: true,
        allowedActions: ['login', 'login::2fa', 'logout', 'request password reset', 'create', 'delete', 'request QR code for 2FA'],
        size: 5,
        apiKeyLoading: true
    };


    componentDidMount() {
        this.fetchActivities();
        this.fetchVerifications();
        this.onFetchApiKeys();
        if (!this.props.profile.otp) {                      // Calling when 2fa is disabled
            this.handleGenerateQRCode()
        }
    }

    async fetchActivities() {
        const { allowedActions, size } = this.state;
        getActivities().then(res => {
            if (res.status === 200) {
                const filteredActivitites = res.data.filter(x => allowedActions.includes(x.action));
                this.setState({ activities: filteredActivitites.slice(0, size) })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    async fetchVerifications() {
        getLabels().then(res => {
            if (res.status === 200) {
                this.setState({ verifications: res.data })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    changePassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = this.state;
        const password = {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        };
        changePass(password).then(response => {
            const { data, status } = response;
            if (data && status === 201) {
                this.props.actions.alertPush({ message: ['success.password.changed'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    enableGoogle2FA = async () => {
        const { profile } = this.props;
        const { email } = profile
        const { code } = this.state;
        const otpCode = { code };
        enable2FA(otpCode).then(res => {
            if (res.status === 201) {
                this.props.actions.setOtp(true)
                this.props.actions.alertPush({ message: ['success.otp.enabled'], type: 'success', open: true });
                setCookie('email', email, 2);
                setCookie('otp', true, 2);
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    disableGoogle2FA = () => {
        const { profile } = this.props;
        const { email } = profile
        const { code } = this.state;
        const otpCode = { code };

        disable2FA(otpCode).then(res => {
            if (res.status === 200) {
                this.props.actions.setOtp(false)
                this.handleGenerateQRCode();
                this.props.actions.alertPush({ message: ['success.otp.disabled'], type: 'success', open: true });
                setCookie('email', email, 2);
                setCookie('otp', false, 2);
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    handleGenerateQRCode = async () => {
        generateQRCode().then(res => {
            if (res.status === 201) {
                this.setState({ qrcode: res.data.data });
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    handleChangeField = (field, value) => this.setState({ [field]: value });

    onClose = () => {
        this.setState({ open: false })
    };

    onFetchApiKeys = async (totp_code) => {
        getApiKeys().then(res => {
            if (res.status === 200) {
                this.setState({ show: false, apikeys: res.data, apiKeyLoading: false })
                this.props.actions.setModal(false);
            }
        })
            .catch(error => {
                this.setState({ apiKeyLoading: false })
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    onCreateApiKey = async (totp_code) => {
        const { apikeys } = this.state;
        const data = {
            algorithm: 'HS256',
            totp_code: totp_code
        };
        createApiKey(data).then(res => {
            if (res.status === 201) {
                apikeys.push(res.data)
                this.props.actions.setModal(false);
                this.props.actions.setConfirmModal(true);
                this.setState({ apikeys, apiKey: res.data, openConfirm: true })
                this.props.actions.alertPush({ message: ['success.api_keys.created'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.actions.setModal(false);
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    onEditApiKey = async (totp_code, kid, status) => {
        const { apikeys } = this.state;
        const data = {
            state: status,
            totp_code: totp_code
        };
        editApiKey(kid, data).then(res => {
            if (res.status === 200) {
                const index = apikeys.findIndex(x => x.kid === kid);
                apikeys[index].state = status
                this.props.actions.setModal(false);
                this.setState({ apikeys })
                this.props.actions.alertPush({ message: ['success.api_keys.updated'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.actions.setModal(false);
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    onDeleteApiKey = async (totp_code, kid) => {
        const { apikeys } = this.state;
        deleteApiKey(kid, totp_code).then(res => {
            if (res.status === 204) {
                const index = apikeys.findIndex(x => x.kid === kid);
                apikeys.splice(index, 1);
                this.props.actions.setModal(false);
                this.setState({ apikeys })
                this.props.actions.alertPush({ message: ['success.api_keys.deleted'], type: 'success', open: true });
            }
        })
            .catch(error => {
                this.props.actions.setModal(false);
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    render() {
        const { 
            classes, 
            profile, 
            // modalState, 
            // openConfirm 
        } = this.props;
        const {  
            // apikeys, 
            // activities, 
            // apiKey, 
            qrcode, 
            // show, 
            // apiKeyLoading 
        } = this.state;

        return (
            <Layout>
                <main className={classes.main}>
                    <CssBaseline />

                    <Profile
                        history={this.props.history}
                        currentUser={profile}
                        labels={this.state.verifications}
                        qrcode={qrcode}
                        onChange={this.handleChangeField}
                        onSubmitGoogle2FA={this.enableGoogle2FA.bind(this)}
                        onDisableGoogle2FA={this.disableGoogle2FA.bind(this)}
                        onChangePassword={this.changePassword}
                        intl={this.props.intl}
                        actions={this.props.actions}
                    />

                    {/* <APIKeys
                        modalState={modalState}
                        currentUser={profile}
                        keys={apikeys}
                        onFetch={this.onFetchApiKeys}
                        onCreate={this.onCreateApiKey}
                        onEdit={this.onEditApiKey}
                        onDelete={this.onDeleteApiKey}
                        createdKey={apiKey}
                        openConfirm={openConfirm}
                        setModal={this.props.actions.setModal}
                        setConfirmModal={this.props.actions.setConfirmModal}
                        // onCopy={this.onCopy}
                        show={show}
                        intl={this.props.intl}
                        actions={this.props.actions}
                        loading={apiKeyLoading}
                    /> */}

                    {/* <AccountActivity
                        activities={activities}
                        intl={this.props.intl}
                    /> */}
                    
                </main>
            </Layout>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => ({
        profile: state.user.data,
        modalState: state.user.open,
        openConfirm: state.user.openConfirm
    }), actions))(injectIntl(ProfilePage));
