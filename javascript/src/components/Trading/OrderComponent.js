import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import OrderBox from './OrderBox';
import Hidden from '@material-ui/core/Hidden';
import { createLimitOrder, changeAskPrice, changeAskAmount, changeBidPrice, changeBidAmount, closeSnackbar, setMarket } from '../../actions/tradeV2'
import { styles } from '../../styles/main';
import TradeBar from '../../components/Trading/TradeBar'

class OrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value })
    };

    render() {
        const {
            classes,
            market,
            markets,
            createOrder,
            wallets,
            tickers,
            user,
            open,
            variant,
            message,
            changeAskPrice,
            changeAskAmount,
            changeBidPrice,
            changeBidAmount,
            order,
            onClose
        } = this.props;

        return (
            <div className={classes.orderRoot}>

                {/* <Hidden mdUp implementation="css">
                    <Tabs
                        value={value}
                        classes={{
                            root: classes.tabRoot,
                            indicator: value == 0 ? classes.buyIndicator : classes.sellIndicator
                        }}
                        // indicatorColor="secondary"
                        // textColor="primary"
                        variant="fullWidth"
                        onChange={this.handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Buy" />
                        <Tab label="Sell" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <OrderBox type='buy' />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <OrderBox type='sell' />
                    </TabPanel>
                    <OrderBook/>
                </Hidden>

                <Hidden smDown implementation="css">
                    <OrderBox type='buy' />
                    <OrderBox type='sell' />
                </Hidden> */}
                <Hidden mdUp implementation="css">
                    <TradeBar
                        market={this.props.market}
                        markets={markets}
                        tickers={tickers}
                        wallets={wallets}
                        setMarket={setMarket}
                        history={this.props.history}
                        user={user}
                        intl={this.props.intl}
                    />
                </Hidden>

                <OrderBox
                    type='buy'
                    market={market}
                    createOrder={createOrder}
                    wallets={wallets}
                    tickers={tickers}
                    user={user}
                    order={order}
                    price={order.bidPrice}
                    amount={order.bidAmount}
                    open={open}
                    variant={variant}
                    message={message}
                    onChangePrice={changeBidPrice}
                    onChangeAmount={changeBidAmount}
                    onClose={onClose}
                    intl={this.props.intl}
                />
                <OrderBox
                    type='sell'
                    market={market}
                    createOrder={createOrder}
                    wallets={wallets}
                    tickers={tickers}
                    user={user}
                    order={order}
                    price={order.askPrice}
                    amount={order.askAmount}
                    open={open}
                    variant={variant}
                    message={message}
                    onChangePrice={changeAskPrice}
                    onChangeAmount={changeAskAmount}
                    onClose={onClose}
                    intl={this.props.intl}
                />

                {/* <Hidden mdUp implementation="css">
                    <OrderTradeHistory
                        currentIndex={currentIndex}
                        intl={this.props.intl}
                    />
                </Hidden> */}

            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        open: state.tradev2.open,
        variant: state.tradev2.variant,
        message: state.tradev2.message,
        order: state.tradev2.order,
        tickers: state.tradev2.allTickers,
        wallets: state.wallet.list,
        market: state.tradev2.market,
        markets: state.trade.markets,
        user: state.user.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createOrder: (order) => dispatch(createLimitOrder(order)),
        changeAskPrice: (order) => dispatch(changeAskPrice(order)),
        changeAskAmount: (order) => dispatch(changeAskAmount(order)),
        changeBidPrice: (order) => dispatch(changeBidPrice(order)),
        changeBidAmount: (order) => dispatch(changeBidAmount(order)),
        onClose: () => dispatch(closeSnackbar()),
        setMarket: (market) => dispatch(setMarket(market))
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(OrderComponent);
