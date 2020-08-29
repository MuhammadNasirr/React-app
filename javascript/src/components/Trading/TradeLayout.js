import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import OrderComponent from './OrderComponent';
import OrderTradeHistory from './OrderTradeHistory';
import TradingChart from './TradingChart';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { styles } from '../../styles/main'
import clsx from 'clsx'
const AntTabs = withStyles({
    root: {
        minHeight: 58
    },
    indicator: {
        backgroundColor: '#ffffff',
    },
})(Tabs);

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

class TradeLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }

    handleChange = (event, value) => {
        this.setState({ value })
    };

    goTo = (pathName) => {
        window.location.href = pathName
    }

    render() {
        const { classes, children, user } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.tradeBackground}>
                <Hidden mdUp implementation="css">
                    <AntTabs
                        value={value}
                        classes={{
                            root: clsx(classes.tabsBackground, classes.primaryText),
                            indicator: classes.navTabsIndicator
                        }}
                        indicatorColor="secondary"
                        variant="fullWidth"
                        onChange={this.handleChange}
                        aria-label="disabled tabs example">
                        <Tab className={classes.tab} label={this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.graph' })} />
                        <Tab className={classes.tab} label={`${this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.buy' })} / ${this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.sell' })}`} />
                        <Tab className={classes.tab} label={this.props.intl.formatMessage({ id: 'page.body.trade.orderbook' })} />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <TradingChart
                            market={this.props.market}
                            tradeHistory={this.props.tradeHistory}
                            containerId={'mobile_chart_container'}
                            history={this.props.history}
                            intl={this.props.intl}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {
                            !user.email &&
                            <div className={classes.notLoggedInMobile}>

                                <div className={classes.inner1}>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            size="medium"
                                            className={classes.loginBtn}
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
                                            className={classes.signUpBtn}
                                            onClick={() => this.goTo('/signup')}>
                                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.signUp' })}
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        }
                        <OrderComponent
                            history={this.props.history}
                            market={this.props.market}
                            currentIndex={1}
                            intl={this.props.intl}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <OrderTradeHistory
                            intl={this.props.intl}
                            currentIndex={1}
                        />
                    </TabPanel>
                </Hidden>

                <div>
                    {children}
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(TradeLayout);
