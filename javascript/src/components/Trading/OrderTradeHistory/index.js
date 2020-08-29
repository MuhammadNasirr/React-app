import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import OrderBook from './OrderBook';
import TradeHistory from './TradeHistory'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    fetchOrderBook,
    fetchDepth,
    changeAskPrice,
    changeAskAmount,
    changeBidPrice,
    changeBidAmount
}
    from '../../../actions/tradeV2';
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


class OrderTradeHistory extends Component {

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
            currentIndex,
            orderBook,
            tickers,
            market,
            tradeHistory,
            changeBidAmount,
            changeBidPrice,
            changeAskAmount,
            changeAskPrice
        } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.ordTradeRoot}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    classes={{
                        root: clsx(classes.tabsBackground,classes.primaryText)
                    }}
                    aria-label="ant example">
                    <Tab disableRipple classes={{ root: classes.antTabRoot }} label={this.props.intl.formatMessage({ id: 'page.body.trade.orderbook' })} />
                    {
                        currentIndex === 1 ? null
                            :
                            <Tab disableRipple classes={{ root: classes.antTabRoot }} label={this.props.intl.formatMessage({ id: 'page.body.history.trade' })} />
                    }
                </Tabs>
                <TabPanel value={value} index={0}>
                    <OrderBook
                        orderBook={orderBook}
                        tickers={tickers}
                        market={market}
                        changeBidAmount={changeBidAmount}
                        changeBidPrice={changeBidPrice}
                        changeAskAmount={changeAskAmount}
                        changeAskPrice={changeAskPrice}
                        intl={this.props.intl}
                    />
                </TabPanel>

                {
                    currentIndex === 1 ? null
                        :
                        <TabPanel value={value} index={1}>
                            <TradeHistory
                                tradeHistory={tradeHistory}
                                market={market}
                                intl={this.props.intl}
                            />
                        </TabPanel>
                }
            </div>
        );
    }
};


function mapStateToProps(state) {
    return {
        orderBook: state.tradev2.depth,
        tradeHistory: state.tradev2.tradeHistory,
        tickers: state.tradev2.allTickers,
        markets: state.trade.markets,
        market: state.tradev2.market,
        user: state.user.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOrderBook: (market) => dispatch(fetchOrderBook(market)),
        fetchDepth: market => dispatch(fetchDepth(market)),
        changeAskPrice: (order) => dispatch(changeAskPrice(order)),
        changeAskAmount: (order) => dispatch(changeAskAmount(order)),
        changeBidPrice: (order) => dispatch(changeBidPrice(order)),
        changeBidAmount: (order) => dispatch(changeBidAmount(order)),
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(OrderTradeHistory);
