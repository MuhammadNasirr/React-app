/* eslint-disable */
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import RegisterForm from '../../components/RegisterForm';
import { postUser } from '../../api/user'
import { getURLParameter } from '../../utils/getUrlParams';
import Layout from '../Layout';
import { styles } from '../../styles/main';
import actions from "../../actions";
import clsx from 'clsx'

class RegisterPage extends Component {
  state = {
    open: false,
    email: '',
    password: '',
    confirm_password: '',
    variant: 'error',
    checked: false,
    is_valid_pass: false,
    is_valid_email: false,
    refid: '',
    language: 'es',
  };

  componentDidMount() {
    const refid = getURLParameter('refid');
    this.setState({ refid: refid || '' })
  }

  removeFalsy = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop]; }
    });
    return newObj;
  };

  onSubmit = e => {
    const { email, password, refid, language } = this.state;
    e.preventDefault();
    let body = { language: language }
    const data = { email, password, refid, data: JSON.stringify(body) };
    const cleanedObj = this.removeFalsy(data);
    postUser(cleanedObj).then(response => {
      const { data, status } = response;
      if (data && status === 201) {
        this.props.actions.alertPush({ message: ['page.header.signUp.success'], type: 'success', open: true });
        setTimeout(() => {
          window.location = `/email-verification?email=${email}`
        }, 2000);
      }
    })
      .catch(error => {
        this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
      })
  };

  handleChangeField = (field, e) => {
    if (field === 'email') {
      let validate = this.validateEmail(e.target.value);
      this.setState({ is_valid_email: validate })
    }

    if (field === 'password') {
      let validate = this.validatePassword(e.target.value);
      this.setState({ is_valid_pass: validate })
    }

    if (e.target.type === 'checkbox') {
      this.setState({ [field]: e.target.checked });
    }
    else {
      this.setState({ [field]: e.target.value });
    }
  }

  validatePassword = (value) => {
    // eslint-disable-next-line
    const regex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
    if (regex.test(value)) {
      return true
    }
    else {
      return false
    }
  }

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

  handleClose = () => {
    this.setState({ open: false })
  };

  render() {
    const { classes } = this.props;
    const { email, password, checked, confirm_password, refid, is_valid_email, is_valid_pass, language } = this.state;

    return (
      <Layout>
        <div className={classes.externalBackground}>
          <main className={clsx(classes.main)}>
            <CssBaseline />
            <RegisterForm
              history={this.props.history}
              email={email}
              language={language}
              password={password}
              confirm_password={confirm_password}
              refid={refid}
              checked={checked}
              is_valid_pass={is_valid_pass}
              is_valid_email={is_valid_email}
              onChange={this.handleChangeField}
              onSubmit={this.onSubmit}
              intl={this.props.intl}
            />
          </main>
        </div>
      </Layout>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({}), actions))(injectIntl(RegisterPage));