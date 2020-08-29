/* eslint-disable */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { alertDelete, alertDeleteByIndex } from '../../actions/alert'
import clsx from 'clsx';

//SNACKBAR
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { styles } from '../../styles/main'

class SnackBar extends Component {
    state = {
        open: false
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
        // this.props.onClose()
    };

    renderIcon = (variant) => {
        switch (variant) {
            case 'success':
                return <CheckCircleIcon className={clsx(this.props.classes.iconVariant)} />
            case 'warning':
                return <WarningIcon className={clsx(this.props.classes.iconVariant)} />
            case 'error':
                return <ErrorIcon className={clsx(this.props.classes.iconVariant)} />
            case 'info':
                return <InfoIcon className={clsx(this.props.classes.iconVariant)} />
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open })
    }

    deleteAlertByIndex = (key) => {
        this.props.alertDeleteByIndex(key);
    };

    translate = (id) => {
        return id ? this.props.intl.formatMessage({ id }) : '';
    };

    render() {
        const { classes, className, alerts } = this.props;

        return (
            <div>

                {alerts.alerts.map(w => w.message.map((msg, index) =>

                    <Snackbar
                        key={index}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={w.open}
                        autoHideDuration={3000}
                        onClose={() => this.deleteAlertByIndex(index)}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.translate(msg)}</span>}

                    >
                        <SnackbarContent
                            className={clsx(classes[w.type], className)}
                            aria-describedby="client-snackbar"
                            message={
                                <span id="client-snackbar" className={classes.notifyMessage}>
                                    {this.renderIcon(w.type)}
                                    {this.translate(msg)}
                                </span>
                            }
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={() => this.deleteAlertByIndex(index)}
                                >
                                    <CloseIcon className={classes.notifyIcon} />
                                </IconButton>,
                            ]}
                            classes={{
                                action:classes.close,
                                message: classes.notifyMessageRoot
                            }}
                        />
                    </Snackbar>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    alerts: state.alert
});

const mapDispatchToProps = dispatch => ({
    alertDelete: () => dispatch(alertDelete()),
    alertDeleteByIndex: payload => dispatch(alertDeleteByIndex(payload)),
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(injectIntl(SnackBar));
