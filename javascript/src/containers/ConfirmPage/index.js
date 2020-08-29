/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { injectIntl } from 'react-intl';
import Layout from '../Layout';
import Confirm from '../../components/Profile/Confirm';
import SnackBar from '../../components/SnackBar';
import actions from "../../actions";
import { styles } from '../../styles/main'
import { verifyDocs, getLabels, sendCode, resendCode, verifyPhone, updateProfile } from '../../api/user'

class ConfirmPage extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            verifications: [],
            resend: false,
            dob: '1991-05-24',
            doc_expire: '2020-05-28',
            blocked: false,
            time: {},
            seconds: 60,
            first_name: '',
            last_name: '',
            dob: '',
            address: '',
            postcode: '',
            city: '',
            country: '',
            citizenship: '',
        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        this.fetchVerifications();
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        if (this.props.userData && this.props.userData.profile && Object.keys(this.props.userData.profile).length) {
            const { first_name, last_name, dob, address, postcode, city, country, metadata } = this.props.userData.profile;
            const citizenship = JSON.parse(metadata);
            this.setState({
                first_name,
                last_name,
                dob,
                address,
                postcode,
                city,
                country,
                citizenship: citizenship && citizenship.nationality
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.success) {
            props.history.push('/profile');
        }
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

    async fetchVerifications() {
        getLabels().then(res => {
            if (res.status === 200) {
                const { data } = res;
                const phoneVerified = data.find(x => x.key === 'phone');
                const identityVerified = data.find(x => x.key === 'profile');
                const documentVerified = data.find(x => x.key === 'document');

                if (!phoneVerified)
                    this.setState({ activeStep: 0 });
                else if (!identityVerified)
                    this.setState({ activeStep: 1 });
                else if (!documentVerified)
                    this.setState({ activeStep: 2 });
                else
                    this.setState({ activeStep: 2 })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    handleSendCode = async () => {
        const { phoneNumber } = this.state;
        const phone_number = {
            phone_number: phoneNumber
        };
        sendCode(phone_number).then(res => {
            if (res.status === 201) {
                this.startTimer()
                this.setState({ resend: true, blocked: true }, () => {
                    setTimeout(() => {
                        this.setState({ blocked: false });
                        clearInterval(this.timer)
                    }, 60000);
                });
                this.props.actions.alertPush({ message: ['success.phone.verification.send'], type: 'success', open: true });
            }
        })
            .catch(error => {
                if (error.message.indexOf('resource.phone.exists') > -1) {
                    this.handleResendCode();
                }
                else {
                    this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
                }
                this.setState({ resend: false, blocked: false });
                clearInterval(this.timer)
            })
    };

    handleResendCode = async () => {
        const { phoneNumber } = this.state;
        const phone_number = {
            phone_number: phoneNumber
        };
        resendCode(phone_number).then(res => {
            if (res.status === 201) {
                this.startTimer()
                this.setState({ resend: true, blocked: true }, () => {
                    setTimeout(() => {
                        this.setState({ blocked: false });
                        clearInterval(this.timer)
                    }, 60000);
                });
                this.props.actions.alertPush({ message: ['success.phone.verification.send'], type: 'success', open: true });
            }
        })
            .catch(error => {
                clearInterval(this.timer)
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    verifyPhoneNumber = async () => {
        const { phoneNumber, smsCode } = this.state;
        const verify = {
            phone_number: phoneNumber,
            verification_code: smsCode
        };
        verifyPhone(verify).then(res => {
            if (res.status === 201) {
                this.props.actions.alertPush({ message: ['success.phone.confirmed'], type: 'success', open: true });
                this.setState({ activeStep: 1 })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    updateProfile = async () => {
        const { first_name, last_name, dob, address, country, city, postcode, citizenship } = this.state;
        const profile = {
            first_name: first_name,
            last_name: last_name,
            dob: this.changeDateFormat(dob),
            address: address,
            country: country,
            city: city,
            postcode: postcode,
            citizenship: JSON.stringify({ nationality: citizenship })
        };
        updateProfile(profile).then(res => {
            if (res.status === 201) {
                this.props.actions.alertPush({ message: ['success.profile.accepted'], type: 'success', open: true });
                this.setState({ activeStep: 2 })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    };

    uploadDocs = async (files) => {
        const { doc_type, doc_number, doc_expire } = this.state;
        const data = new FormData()
        data.append('doc_type', doc_type)
        data.append('doc_number', doc_number)
        data.append('doc_expire', doc_expire)
        for (var x = 0; x < files.length; x++) {
            data.append('upload[]', files[x])
        }

        this.props.actions.sendDocuments(data);

        // verifyDocs(data).then(res => {
        //     if (res.status === 201) {
        //         this.props.actions.alertPush({ message: ['success.documents.accepted'], type: 'success', open: true });
        //         this.setState({ activeStep: 2 })
        //         this.props.history.push('/profile')
        //     }
        // })
        //     .catch(error => {
        //         this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
        //     })
    };

    changeDateFormat(selectedDate) {
        const date = new Date(selectedDate);
        const DD = date.getDate();
        const MM = date.getMonth() + 1;
        const YYYY = date.getFullYear();
        return `${DD}/${MM}/${YYYY}`
    }

    handleChangeField = (field, value) => this.setState({ [field]: value, resend: false });

    onClose = () => {
        this.setState({ open: false })
    };

    render() {
        const { classes } = this.props;
        const { message, open, activeStep, variant, resend, doc_expire, blocked, time, first_name, last_name, dob, address, postcode, city, country, citizenship } = this.state;

        return (
            <Layout>
                <main className={classes.confirmMain}>
                    <CssBaseline />
                    <Confirm
                        history={this.props.history}
                        onChange={this.handleChangeField}
                        onVerifyPhoneNumber={this.verifyPhoneNumber}
                        onSendPhoneNumber={this.handleSendCode}
                        onResendPhoneNumber={this.handleResendCode}
                        onUpdateProfile={this.updateProfile}
                        onUploadDocs={this.uploadDocs}
                        activeStep={activeStep}
                        resend={resend}
                        doc_expire={doc_expire}
                        blocked={blocked}
                        time={time}
                        intl={this.props.intl}
                        first_name={first_name}
                        last_name={last_name}
                        dob={dob}
                        address={address}
                        postcode={postcode}
                        city={city}
                        country={country}
                        citizenship={citizenship}
                    />
                </main>
            </Layout>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => ({
        userData: state.user.data,
        error: state.auth.errorLogin,
        success: state.documents.success
    }), actions))(injectIntl(withRouter(ConfirmPage)));
