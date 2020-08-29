/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import TradeLayout from '../../components/Trading/TradeLayout';
import TradingChart from '../../components/Trading/TradingChart';
import OrderTradeHistory from '../../components/Trading/OrderTradeHistory/index';
import OrderComponent from '../../components/Trading/OrderComponent';
import OpenOrderHistory from '../../components/Trading/OpenOrderHistory/index';
import TradeBar from '../../components/Trading/TradeBar';
import Loader from '../../components/Loader';
import Layout from '../Layout';
import Grid from '@material-ui/core/Grid/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import {
    fetchOrderBook,
    fetchTradeHistory,
    fetchOpenOrder,
    fetchOrderHistory,
    fetchAllTickers,
    setMarket,
    cancelOrder,
    fetchDepth,
}
    from '../../actions/tradeV2';
import { rangerConnectFetch } from '../../actions/ranger';
import { fetchMarkets } from '../../actions/trade';
import { fetchWalletData } from '../../actions/wallet';
import { styles } from '../../styles/main'

class TradingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.fetchMarkets();
        const { connected, withAuth, userLoggedIn } = this.props;
        if (!connected) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }
        if (userLoggedIn && !withAuth) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.markets.length) {
            if (!this.props.match.params.market) {
                window.location.href = `/trading/${(nextProps.markets[0].id).toUpperCase()}`
            }
            const market = this.props.match.params.market.toLowerCase();
            let isAvailable = nextProps.markets.length && nextProps.markets.find(x => x.id === market);
            if (isAvailable) {
                this.setState({ loading: false })
                if (this.props.market.id !== isAvailable.id && this.props.market !== undefined) {
                    this.props.setMarket(isAvailable)                // setting current market obj in reducer
                }
            }
            else {
                this.goTo(`/trading/${nextProps.markets[0].id.toUpperCase()}`)
            }
        }

        if (nextProps.market.id !== this.props.market.id && nextProps.market) {
            if (this.props.userLoggedIn !== nextProps.userLoggedIn) {
                this.props.rangerConnect({ withAuth: nextProps.userLoggedIn });
            }
            const { market } = nextProps;
            this.props.fetchDepth(market.id)
            this.props.fetchTradeHistory(market.id);
            this.props.fetchAllTickers()
            if (this.props.user.email) {
                this.props.fetchWalletData();
                this.props.fetchOpenOrder(market.id)
                this.props.fetchOrderHistory(market.id)
            }
        }
    }

    goTo = (pathName) => {
        this.props.history.push(pathName)
    }

    render() {
        const { classes,
            orderBook,
            tradeHistory,
            wallets,
            openOrder,
            orderHistory,
            markets,
            tickers,
            setMarket,
            cancelOrder,
            user,
            market,
        } = this.props;

        const currentMarket = this.props.match.params.market;

        return (
            <Layout>
                {
                    !this.state.loading && market && currentMarket ?
                        <main className={classes.tradeMain}>

                            <TradeLayout
                                setMarket={setMarket}
                                markets={markets}
                                market={this.props.market}
                                tradeHistory={tradeHistory}
                                orderBook={orderBook}
                                openOrder={openOrder}
                                orderHistory={orderHistory}
                                tickers={tickers}
                                history={this.props.history}
                                cancelOrder={cancelOrder}
                                user={user}
                                wallets={wallets}
                                intl={this.props.intl}
                            >
                                <Hidden smDown implementation="css">
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm container>
                                            <Grid className={classes.orderBox} item>
                                                {
                                                    !user.email &&
                                                    <div className={classes.notLoggedIn}>

                                                        <div className={classes.innerWeb}>
                                                            <div>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="medium"
                                                                    className={classes.changeButton}
                                                                    onClick={() => this.goTo('/login')}>
                                                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.login' })}
                                                                </Button>
                                                            </div>

                                                            <div>
                                                                <p>
                                                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.or' })}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="medium"
                                                                    className={classes.changeButton}
                                                                    onClick={() => this.goTo('/signup')}>
                                                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.signUp' })}
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                }
                                                <OrderComponent
                                                    market={this.props.market}
                                                    history={this.props.history}
                                                    intl={this.props.intl}
                                                />
                                            </Grid>
                                            <Grid item xs container direction="column" className={classes.tradingSection} spacing={0}>
                                                <Grid item xs>
                                                    <Hidden smDown implementation="css">
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
                                                    <TradingChart
                                                        market={this.props.market}
                                                        tradeHistory={tradeHistory}
                                                        containerId={'tv_chart_container'}
                                                        history={this.props.history}
                                                        intl={this.props.intl}
                                                    />
                                                    <OpenOrderHistory
                                                        history={this.props.history}
                                                        intl={this.props.intl}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid style={{ zIndex: 10 }} item>
                                                <OrderTradeHistory
                                                    intl={this.props.intl}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Hidden>
                            </TradeLayout>

                        </main>
                        :
                       <Loader classes={this.props.classes} />
                }
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        open: state.tradev2.open,
        variant: state.tradev2.variant,
        message: state.tradev2.message,
        tradeHistory: state.tradev2.tradeHistory,
        wallets: state.wallet.list,
        openOrder: state.tradev2.openOrder,
        orderHistory: state.tradev2.orderHistory,
        tickers: state.tradev2.allTickers,
        markets: state.trade.markets,
        loading: state.trade.isFetching,
        market: state.tradev2.market,
        user: state.user.data,
        userLoggedIn: !state.user.isFetching && state.user.data.state === 'active',
        isFetching: state.user.isFetching,
        connected: state.ranger.connected,
        withAuth: state.ranger.withAuth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOrderBook: (market) => dispatch(fetchOrderBook(market)),
        fetchDepth: market => dispatch(fetchDepth(market)),
        fetchTradeHistory: (market) => dispatch(fetchTradeHistory(market)),
        fetchWalletData: () => dispatch(fetchWalletData()),
        fetchOpenOrder: (market) => dispatch(fetchOpenOrder(market)),
        fetchOrderHistory: (market) => dispatch(fetchOrderHistory(market)),
        fetchMarkets: () => dispatch(fetchMarkets()),
        fetchAllTickers: () => dispatch(fetchAllTickers()),
        setMarket: (market) => dispatch(setMarket(market)),
        cancelOrder: (id) => dispatch(cancelOrder(id)),
        rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(injectIntl(TradingPage));
