import React, { Component } from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import OpenOrder from './OpenOrder'
import OrderHistory from './OrderHistory'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    fetchOpenOrder,
    fetchOrderHistory,
    cancelOrder,
    closeSnackbar
}
    from '../../../actions/tradeV2';
import SnackBar from '../../../components/SnackBar';
import { styles } from '../../../styles/main'
import clsx from 'clsx'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={0}>{children}</Box>
        </div>
    );
}

class OpenOrderHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            open: false
        }
    }

    handleChange = (event, value) => {
        this.setState({ value })
    };

    onClose = () => {
        this.props.onClose()
    }

    render() {
        const { classes, openOrder, orderHistory, cancelOrder, user, cancelledOrder } = this.props;
        const { value } = this.state;
        const { open, variant, message } = cancelledOrder

        return (
            <div className={classes.openOrderRoot}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    classes={{
                        root: clsx(classes.tabsBackground,classes.primaryText)
                    }}
                    aria-label="ant example">
                    <Tab disableRipple classes={{ root: classes.antTabRoot }} label={this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders' })} />
                    <Tab disableRipple classes={{ root: classes.antTabRoot }} label={this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory' })} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <OpenOrder
                        openOrder={openOrder}
                        cancelOrder={cancelOrder}
                        user={user}
                        market={this.props.market}
                        history={this.props.history}
                        intl={this.props.intl}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OrderHistory
                        orderHistory={orderHistory}
                        cancelOrder={cancelOrder}
                        user={user}
                        market={this.props.market}
                        history={this.props.history}
                        intl={this.props.intl}
                    />
                </TabPanel>

                <SnackBar
                    open={open}
                    variant={variant}
                    message={message}
                    onClose={this.onClose}
                />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        openOrder: state.tradev2.openOrder,
        orderHistory: state.tradev2.orderHistory,
        markets: state.trade.markets,
        market: state.tradev2.market,
        user: state.user.data,
        cancelledOrder: state.tradev2.cancelOrder
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOpenOrder: (market) => dispatch(fetchOpenOrder(market)),
        fetchOrderHistory: (market) => dispatch(fetchOrderHistory(market)),
        cancelOrder: (id) => dispatch(cancelOrder(id)),
        onClose: () => dispatch(closeSnackbar())
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(OpenOrderHistory);

