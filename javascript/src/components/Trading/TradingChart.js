/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TradeHistory from './OrderTradeHistory/TradeHistory'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { rangerSubscribeKlineMarket, rangerUnsubscribeKlineMarket } from '../../actions/ranger';
import { dataFeedObject } from './api';
import { widget } from '../../charting_library/charting_library.min';
import { styles, color } from '../../styles/main';
import { setMarket } from '../../actions/tradeV2';
import TradeBar from '../../components/Trading/TradeBar';
import clsx from 'clsx'


const AntTab = withStyles(theme => ({
    root: {
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#ffffff',
            opacity: 1,
        },
        '&$selected': {
            color: '#ffffff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#ffffff',
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);


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


class TradingChart extends React.PureComponent {

    constructor(props) {
        super(...arguments);
        this.state = { value: 0 };
        this.currentKlineSubscription = {};
        this.params = {
            interval: '15',
            containerId: this.props.containerId,
            libraryPath: '/charting_library/',
            chartsStorageUrl: 'https://saveload.tradingview.com',
            chartsStorageApiVersion: '1.1',
            clientId: 'tradingview.com',
            userId: 'public_user_id',
            fullscreen: false,
            autosize: true,
            studiesOverrides: {},
        };
        this.tvWidget = null;
        this.datafeed = dataFeedObject(this, this.props.markets);
        this.setChart = (markets, currentMarket) => {
            this.datafeed = dataFeedObject(this, markets);
            const widgetOptions = {
                debug: false,
                symbol: currentMarket.id,
                toolbar_bg: color.boxColor,
                datafeed: this.datafeed,
                interval: this.params.interval,
                container_id: this.params.containerId,
                library_path: this.params.libraryPath,
                locale: this.props.lang,
                disabled_features: ['use_localstorage_for_settings', 'header_symbol_search'],
                enabled_features: ['show_animated_logo'],
                charts_storage_url: this.params.chartsStorageUrl,
                charts_storage_api_version: this.params.chartsStorageApiVersion,
                client_id: this.params.clientId,
                user_id: this.params.userId,
                fullscreen: this.params.fullscreen,
                autosize: this.params.autosize,
                studies_overrides: this.params.studiesOverrides,
                overrides: {
                    'symbolWatermarkProperties.color': color.chartInnerColor,
                    'symbolWatermarkProperties.transparency': 90,
                    'volumePaneSize': 'iny',
                    'mainSeriesProperties.candleStyle.upColor': color.chartInnerColor,
                    'mainSeriesProperties.candleStyle.downColor': color.chartInnerColor,
                    'mainSeriesProperties.candleStyle.borderUpColor': color.chartInnerColor,
                    'mainSeriesProperties.candleStyle.borderDownColor': color.chartInnerColor,
                    'mainSeriesProperties.candleStyle.wickUpColor': color.chartInnerColor,
                    'mainSeriesProperties.candleStyle.wickDownColor': color.chartInnerColor,
                    'paneProperties.vertGridProperties.color': color.chartInnerColor,
                    'paneProperties.vertGridProperties.style': 1,
                    'paneProperties.horzGridProperties.color': color.chartInnerColor,
                    'paneProperties.horzGridProperties.style': 1,
                    'paneProperties.crossHairProperties.color': color.chartInnerColor,
                    'paneProperties.crossHairProperties.width': 1,
                    'paneProperties.crossHairProperties.style': 1,
                    'scalesProperties.backgroundColor': color.chartInnerColor,
                    'paneProperties.background': color.boxColor,
                    'paneProperties.gridProperties.color': color.originalRed,

                },
                loading_screen: {
                    backgroundColor: color.boxColor,
                },
                popup_width: '000',
                // hide_top_toolbar: true,
                enable_publishing: false,
                withdateranges: false,
                hide_side_toolbar: false,
                theme: 'Light',
                custom_css_url: '/css/tradingview.css',
                allow_symbol_change: false,
                details: true,
                hotlist: true,
                calendar: true,
                show_popup_button: true,
                popup_height: '50',
                height: 610,
            };
            this.tvWidget = new widget(widgetOptions);
            this.tvWidget.onChartReady(() => {
                this.tvWidget.activeChart().setSymbol(currentMarket.id, () => {
                    // print('Symbol set', currentMarket.id);
                });
            });
        };
        this.updateChart = (currentMarket) => {
            if (this.tvWidget) {
                this.tvWidget.onChartReady(() => {
                    this.tvWidget.activeChart().setSymbol(currentMarket.id, () => {
                        // print('Symbol set', currentMarket.id);
                    });
                });
            }
        };
    }

    componentWillReceiveProps(next) {
        if (next.currentMarket && (!this.props.currentMarket || next.currentMarket.id !== this.props.currentMarket.id)) {
            if (this.props.currentMarket && (this.props.currentMarket.id && this.tvWidget)) {
                this.updateChart(next.currentMarket);
            }
            else {
                this.setChart(next.markets, next.currentMarket);
            }
        }
        if (next.kline && next.kline !== this.props.kline) {
            this.datafeed.onRealtimeCallback(next.kline);
        }
    }
    componentDidMount() {
        if (this.props.currentMarket) {
            this.setChart(this.props.markets, this.props.currentMarket);
        }
    }
    componentWillUnmount() {
        if (this.tvWidget) {
            try {
                this.tvWidget.remove();
            }
            catch (error) {
                console.log(`TradingChart unmount failed: ${error}`);
            }
        }
    }

    handleChange = (event, value) => {
        this.setState({ value })
    };

    render() {
        const { classes, tradeHistory, market, markets, tickers, wallets, setMarket, user } = this.props;
        const { value } = this.state;

        return (
            <div>

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

                <div
                    id={this.props.containerId}
                    className={'TVChartContainer'}
                />
                <div className={classes.chartRoot}>
                    <Hidden mdUp implementation="css">

                        <Tabs
                            value={value}
                            classes={{
                                root: clsx(classes.tabsBackground, classes.primaryText)
                            }}
                            onChange={this.handleChange}
                            aria-label="ant example">
                            <Tab className={classes.tab} label={this.props.intl.formatMessage({ id: 'page.body.history.trade' })} />
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <TradeHistory
                                tradeHistory={tradeHistory}
                                market={market}
                                intl={this.props.intl}
                            />
                        </TabPanel>
                    </Hidden>
                </div>

            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        tickers: state.tradev2.allTickers,
        markets: state.trade.markets,
        currentMarket: state.tradev2.market,
        tradeHistory: state.tradev2.tradeHistory,
        market: state.tradev2.market,
        wallets: state.wallet.list,
        kline: state.kline,
        user: state.user.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        subscribeKline: (marketId, periodString) => dispatch(rangerSubscribeKlineMarket(marketId, periodString)),
        unSubscribeKline: (marketId, periodString) => dispatch(rangerUnsubscribeKlineMarket(marketId, periodString)),
        setMarket: (market) => dispatch(setMarket(market))
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(TradingChart);