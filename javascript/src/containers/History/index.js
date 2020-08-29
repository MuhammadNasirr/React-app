/* eslint-disable */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Layout from '../Layout';
import Divider from '@material-ui/core/Divider';
import actions from "../../actions";
import HistoryTable from '../../components/History';
import { getAllDeposits, getAllWithdraws, getAllTrades } from '../../api/history';
import { styles } from '../../styles/main'
import clsx from 'clsx'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}



class History extends Component {
    state = {
        value: 0,
        deposits: [],
        withdraws: [],
        trades: [],
        open: false,
        message: '',
        variant: '',
        page: 0,
        rowsPerPage: 10
    };

    componentDidMount() {
        this.fetchDeposits(1, 100);
        this.fetchWithdraws(1, 100);
        this.fetchTrades(1, 100);
    }

    fetchDeposits(page, limit) {
        getAllDeposits(page, limit).then(res => {
            const { data, status } = res;
            if (data && status === 200) {
                this.setState({ deposits: data })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    fetchWithdraws(page, limit) {
        getAllWithdraws(page, limit).then(res => {
            const { data, status } = res;
            if (data && status === 200) {
                this.setState({ withdraws: data })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    fetchTrades(page, limit) {
        getAllTrades(page, limit).then(res => {
            const { data, status } = res;
            if (data && status === 200) {
                this.setState({ trades: data })
            }
        })
            .catch(error => {
                this.props.actions.alertPush({ message: error.message, code: error.code, type: 'error', open: true });
            })
    }

    handleChange = (event, value) => {
        this.setState({
            value,
            page: 0,
            rowsPerPage: 10
        });
    };

    handleChangeIndex = index => {
        this.setState({
            value: index,
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 })
    }

    getDepositHeaderItems() {
        return [
            this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.date' }),
            this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.status' }),
            this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.amount' }),
            this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.fee' }),
            this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.currency' }),
            this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.txid' }),
        ]
    }

    getWithdrawHeaderItems() {
        return [
            this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.date' }),
            this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.status' }),
            this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.amount' }),
            this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.currency' }),
            this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.txid' }),
        ]
    }

    getTradeHeaderItems() {
        return [
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.date' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.price' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.amount' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.feeAmount' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.currency' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.total' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.market' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.side' }),
        ]
    }

    render() {
        const { classes } = this.props;
        const { value, deposits, withdraws, trades, page, rowsPerPage } = this.state

        return (
            <Layout>
                <div className={classes.main}>
                    <Paper className={classes.historyPaper}>
                        <Tabs variant="scrollable" classes={{ root: clsx(classes.walletTabsRoot) }} value={value} onChange={this.handleChange} aria-label="ant example">
                            <Tab classes={{ root: classes.tabRootInner }} label={this.props.intl.formatMessage({ id: 'page.body.history.deposit' })} />
                            <Tab classes={{ root: classes.tabRootInner }} label={this.props.intl.formatMessage({ id: 'page.body.history.withdraw' })} />
                            <Tab classes={{ root: classes.tabRootInner }} label={this.props.intl.formatMessage({ id: 'page.body.history.trade' })} />
                        </Tabs>
                        <Divider />
                        <Typography className={classes.padding} />
                        <TabPanel value={value} index={0}>
                            <HistoryTable
                                headerItems={this.getDepositHeaderItems()}
                                keys={['created_at', 'state', 'amount', 'fee', 'currency', 'txid']}
                                data={deposits}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                intl={this.props.intl}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <HistoryTable
                                headerItems={this.getWithdrawHeaderItems()}
                                keys={['created_at', 'state', 'amount', 'currency', 'blockchain_txid']}
                                data={withdraws}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                intl={this.props.intl}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <HistoryTable
                                headerItems={this.getTradeHeaderItems()}
                                keys={['created_at', 'price', 'amount', 'fee_amount', 'currency', 'total', 'market', "side"]}
                                data={trades}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                intl={this.props.intl}
                            />
                        </TabPanel>
                    </Paper>
                </div>
            </Layout>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => ({}),
        actions))(injectIntl(History));