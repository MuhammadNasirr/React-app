import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx'
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { styles } from '../../styles/main';
import { displayNumber } from './utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography {...other}>
            <Typography variant="h2" className={classes.basicTextMedium}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.basicText} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class Confirmation extends Component {

    handleClose = () => {
        this.props.onClose()
    };

    handleConfirm = () => {
        this.props.onConfirm()
    };

    render() {
        const { classes, totalPrice, market, type, open, state, safePrice, price_precision, exchange, amount } = this.props;
        // const grand_total = (totalPrice + (state.type == 'buy' ? parseFloat(state.bid_fee) : parseFloat(state.ask_fee)));

        return (
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        classes: {
                            root: classes.dialogPaper
                        }
                    }}
                >
                    <DialogTitle className={classes.dialogTitleRoot} id="alert-dialog-slide-title" onClose={this.handleClose}>
                        {this.props.intl.formatMessage({ id: 'page.body.market.modal.header' })}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.fontNormal} id="alert-dialog-slide-description">
                            <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: `page.body.market.modal.${state.type}ing` })}{" "}</span>
                            <span className={clsx(classes.primaryNumber, classes.fontBold)}>{type === 'buy' ? displayNumber(exchange || 0) : displayNumber(amount || 0)}</span>
                            <span className={classes.primaryText}> {market.toUpperCase()}</span>
                            <span className={classes.primaryText}> {this.props.intl.formatMessage({ id: 'page.body.market.modal.approximate' })}{" "}</span>
                            <span className={clsx(classes.primaryNumber, classes.fontBold)}>{parseFloat(safePrice).toFixed(price_precision)}</span>
                            <span className={classes.primaryText}> {state.base.toUpperCase()}</span>
                            <span className={classes.primaryText}> {this.props.intl.formatMessage({ id: 'page.body.market.modal.youWill' })}{" "}</span>
                            <span className={classes.primaryText}> {type === 'buy' ? this.props.intl.formatMessage({ id: 'page.body.market.modal.spend' }) : this.props.intl.formatMessage({ id: 'page.body.market.modal.receive' })}</span>
                            <span className={classes.primaryText}> {this.props.intl.formatMessage({ id: 'page.body.market.modal.approximate_total' })}{" "}</span>
                            <span className={clsx(classes.primaryNumber, classes.fontBold)}>{parseFloat(totalPrice).toFixed(price_precision)}</span>
                            <span className={classes.primaryText}> {state.base.toUpperCase()}</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}
                            // className={classes.confirmSellButton}
                            className={classes.confirmSellButton}
                            classes={{
                                disabled: classes.disabledButton
                            }}
                        >
                            {this.props.intl.formatMessage({ id: 'page.body.market.modal.cancel_btn' })}
                        </Button>
                        <Button onClick={this.handleConfirm}
                            className={classes.confirmBuyButton}
                            // className={classes.confirmBuyButton}
                            classes={{
                                disabled: classes.disabledButton
                            }}
                        >
                            {this.props.intl.formatMessage({ id: 'page.body.market.modal.confirm_btn' })}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Confirmation);
