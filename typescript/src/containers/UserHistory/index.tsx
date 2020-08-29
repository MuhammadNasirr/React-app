import {
    createStyles,
    Grid,
    Paper,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import {
    tablePageLimit,
} from '../../api/config';
import {
    InfoTable
} from '../../components/InfoTable/InfoTable';
import { UserDataHeader } from '../../components/UserData/UserDataHeader';
import {
    alertPush,
    AppState,
    DepositsDataInterface,
    getDeposits,
    getOrders,
    getTrades,
    getUserData,
    getWithdrawals,
    OrdersDataInterface,
    selectDeposits,
    selectDepositsCurrentPage,
    selectDepositsLoading,
    selectDepositsTotalNumber,
    selectOrders,
    selectOrdersCurrentPage,
    selectOrdersLoading,
    selectOrdersTotalNumber,
    selectTrades,
    selectTradesCurrentPage,
    selectTradesLoading,
    selectTradesTotalNumber,
    selectUserData,
    selectWithdrawals,
    selectWithdrawalsCurrentPage,
    selectWithdrawalsLoading,
    selectWithdrawalsTotalNumber,
    TradesDataInterface,
    WithdrawalsDataInterface
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    userData: any;
    tradeLoading: boolean;
    tradeTotal: number;
    tradePage: number;
    orderLoading: boolean;
    orderTotal: number;
    orderPage: number;
    withdrawLoading: boolean;
    withdrawTotal: number;
    withdrawPage: number;
    depositLoading: boolean;
    depositTotal: number;
    depositPage: number;
    userTrades: TradesDataInterface[];
    userOrders: OrdersDataInterface[];
    userWithdraws: WithdrawalsDataInterface[];
    userDeposits: DepositsDataInterface[];
}

interface DispatchProps {
    getUserData: typeof getUserData;
    getUserTrades: typeof getTrades;
    getUserOrders: typeof getOrders;
    getUserWithdraws: typeof getWithdrawals;
    getUserDeposits: typeof getDeposits;
    alertPush: typeof alertPush;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '75%',
    },
    menu: {
        width: 200,
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#3598D5',
        letterSpacing: '0.44px',
    },
    arrow: {
        color: '#979797',
        paddingTop: '3px',
        margin: '0 10px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 24px 24px 0',
        fontWeight: 600,
    },
    label: {
        height: 32,
        paddingLeft: 16,
        borderRadius: 24,
        width: 'auto',
        cursor: 'pointer',
        letterSpacing: '0.15px',
        fontWeight: 600,
    },
    icon: {
        width: 20,
        height: 20,
        margin: '7px 4px',
        cursor: 'pointer',
        opacity: 0.6,
    },
    labelName: {
        paddingTop: 5,
        color: '#ffffff',
        fontSize: 14,
        marginRight: 7,
        letterSpacing: '0.25px',
    },
    paper: {
        padding: '20px 24px 24px 24px',
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        letterSpacing: '0.15px',
        fontWeight: 600,
        paddingLeft: 26,
        paddingTop: 26,
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}


interface UserHistoryState {
    tradePage: number;
    tradeRowsPerPage: number;
    orderPage: number;
    orderRowsPerPage: number;
    withdrawPage: number;
    withdrawRowsPerPage: number;
    depositPage: number;
    depositRowsPerPage: number;
    selectedTable: string;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class UserHistoryScreen extends React.Component<Props, UserHistoryState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            tradePage: 0,
            tradeRowsPerPage: tablePageLimit(),
            orderPage: 0,
            orderRowsPerPage: tablePageLimit(),
            withdrawPage: 0,
            withdrawRowsPerPage: tablePageLimit(),
            depositPage: 0,
            depositRowsPerPage: tablePageLimit(),
            selectedTable: 'Trades',
        };
    }

    private tradeRows = [
        { key: 'id', alignRight: false, label: 'Trade ID' },
        { key: 'maker_order_email', alignRight: false, label: 'Maker order email' },
        { key: 'taker_order_email', alignRight: false, label: 'Taker order email' },
        { key: 'maker_uid', alignRight: true, label: 'Maker UID' },
        { key: 'taker_uid', alignRight: true, label: 'Taker UID' },
        { key: 'market', alignRight: true, label: 'Market' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'amount', alignRight: true, label: 'Amount' },
        { key: 'total', alignRight: true, label: 'Total' },
        { key: 'taker_type', alignRight: true, label: 'Side' },
        { key: 'created_at', alignRight: true, label: 'Trade time' },
    ];

    private orderRows = [
        { key: 'id', alignRight: false, label: 'Order ID' },
        { key: 'market', alignRight: false, label: 'Market' },
        { key: 'ord_type', alignRight: false, label: 'Type' },
        { key: 'remaining_volume', alignRight: true, label: 'Amount' },
        { key: 'executed_volume', alignRight: true, label: 'Executed' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'side', alignRight: true, label: 'Side' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'updated_at', alignRight: true, label: 'Updated' },
        { key: 'state', alignRight: true, label: 'Status' },
    ];

    private withdrawRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'currency', alignRight: false, label: 'Currency' },
        { key: 'blockchain_txid', alignRight: true, label: 'TxID' },
        { key: 'rid', alignRight: true, label: 'Recipient Address' },
        { key: 'completed_at', alignRight: true, label: 'Date' },
        { key: 'amount', alignRight: true, label: 'Amount' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    private depositRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'txid', alignRight: false, label: 'TxID' },
        { key: 'completed_at', alignRight: false, label: 'Created' },
        { key: 'amount', alignRight: true, label: 'Amount' },
        { key: 'currency', alignRight: true, label: 'Currency' },
        { key: 'confirmations', alignRight: true, label: 'Confirmations' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    private selectTable = [
        {
            key: 'Trades',
            value: 'Trades'
        },
        {
            key: 'Orders',
            value: 'Orders'
        },
        {
            key: 'Deposits',
            value: 'Deposits'
        },
        {
            key: 'Withdraws',
            value: 'Withdraws'
        },
    ];
    public componentDidMount() {
        const {
            tradePage,
            tradeRowsPerPage,
            orderPage,
            orderRowsPerPage,
            withdrawPage,
            withdrawRowsPerPage,
            depositPage,
            depositRowsPerPage
        } = this.state;
        this.props.getUserData({ uid: this.props.match.params.uid });
        this.props.getUserTrades({ page: tradePage + 1, limit: tradeRowsPerPage, uid: this.props.match.params.uid, ordering: 'desc' });
        this.props.getUserOrders({ page: orderPage + 1, limit: orderRowsPerPage, uid: this.props.match.params.uid, ordering: 'desc' });
        this.props.getUserWithdraws({ page: withdrawPage + 1, limit: withdrawRowsPerPage, uid: this.props.match.params.uid });
        this.props.getUserDeposits({ page: depositPage + 1, limit: depositRowsPerPage, uid: this.props.match.params.uid, ordering: 'desc' });
    }

    public render() {
        const {
            tradePage,
            tradeRowsPerPage,
            orderPage,
            orderRowsPerPage,
            withdrawPage,
            withdrawRowsPerPage,
            depositPage,
            selectedTable,
            depositRowsPerPage
        } = this.state;
        const {
            classes,
            userData,
            userTrades,
            tradeTotal,
            tradeLoading,
            userOrders,
            orderTotal,
            orderLoading,
            userWithdraws,
            withdrawLoading,
            withdrawTotal,
            userDeposits,
            depositLoading,
            depositTotal
        } = this.props;


        return (
            <React.Fragment>
                {
                    userData &&
                    <UserDataHeader classes={classes} user={userData.email} goBack={this.goBack} pathname={location.pathname} />
                }
                <TextField
                    select={true}
                    name="receiving_account_code"
                    margin="dense"
                    value={selectedTable}
                    onChange={this.handleChangeTable}
                    variant="outlined"
                    style={{ width: '100%' }}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                >
                    {this.selectTable.map(option => (<option key={option.key} value={option.value}>{option.value}</option>))}
                </TextField>
                {
                    selectedTable === 'Trades' ?
                        <div>
                            <Typography variant="h6" gutterBottom={true}>
                                Trades
                            </Typography>
                            {!tradeLoading
                                ? (
                                    <Grid container={true} spacing={24} direction={'row'}>
                                        <Grid item={true} xs={12} lg={12}>
                                            <Paper style={{ marginBottom: 15 }}>
                                                <InfoTable
                                                    data={userTrades}
                                                    page={tradePage}
                                                    rowsPerPage={tradeRowsPerPage}
                                                    handleChangePage={this.handleTradeChangePage}
                                                    handleChangeRowsPerPage={this.handleTradeChangeRowsPerPage}
                                                    rows={this.tradeRows}
                                                    dataLength={tradeTotal}
                                                    hidePagination={false}
                                                />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                ) : 'Loading'
                            }
                        </div> : null}
                {
                    selectedTable === 'Orders' ?
                        <div>
                            <Typography variant="h6" gutterBottom={true}>
                                Orders
                            </Typography>
                            {!orderLoading &&
                                (
                                    <Grid container={true} spacing={24} direction={'row'}>
                                        <Grid item={true} xs={12} lg={12}>
                                            <Paper style={{ marginBottom: 15 }}>
                                                <InfoTable
                                                    data={userOrders}
                                                    page={orderPage}
                                                    rowsPerPage={orderRowsPerPage}
                                                    handleChangePage={this.handleOrderChangePage}
                                                    handleChangeRowsPerPage={this.handleOrderChangeRowsPerPage}
                                                    rows={this.orderRows}
                                                    dataLength={orderTotal}
                                                    hidePagination={false}
                                                />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                )
                            }</div> : null}
                {
                    selectedTable === 'Deposits' ?
                        <div>
                            <Typography variant="h6" gutterBottom={true}>
                                Deposits
                </Typography>
                            {!depositLoading &&
                                (
                                    <Grid container={true} spacing={24} direction={'row'}>
                                        <Grid item={true} xs={12} lg={12}>
                                            <Paper style={{ marginBottom: 15 }}>
                                                <InfoTable
                                                    data={userDeposits}
                                                    page={depositPage}
                                                    rowsPerPage={depositRowsPerPage}
                                                    handleChangePage={this.handleDepositChangePage}
                                                    handleChangeRowsPerPage={this.handleDepositChangeRowsPerPage}
                                                    rows={this.depositRows}
                                                    dataLength={depositTotal}
                                                    hidePagination={false}
                                                    location={this.props.location}
                                                />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                )
                            }</div> : null}
                {
                    selectedTable === 'Withdraws' ?
                        <div>
                            <Typography variant="h6" gutterBottom={true}>
                                Withdraws
                </Typography>
                            {!withdrawLoading &&
                                (
                                    <Grid container={true} spacing={24} direction={'row'}>
                                        <Grid item={true} xs={12} lg={12}>
                                            <Paper style={{ marginBottom: 15 }}>
                                                <InfoTable
                                                    data={userWithdraws}
                                                    page={withdrawPage}
                                                    rowsPerPage={withdrawRowsPerPage}
                                                    handleChangePage={this.handleWithdrawChangePage}
                                                    handleChangeRowsPerPage={this.handleWithdrawChangeRowsPerPage}
                                                    rows={this.withdrawRows}
                                                    dataLength={withdrawTotal}
                                                    hidePagination={false}
                                                    location={this.props.location}
                                                />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                )
                            }</div> : null}
            </React.Fragment>
        );
    }
    private handleChangeTable = (event): void => {
        const { value } = event.currentTarget;
        this.setState({
            selectedTable: value
        });
    }

    private goBack = event => {
        event.preventDefault();
        this.props.history.goBack();
    };

    private handleTradeChangePage = (page: number) => {
        this.setState({ tradePage: Number(page) });
        this.handleGetUserTrades(this.state.tradeRowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleTradeChangeRowsPerPage = (rows: number) => {
        this.setState({
            tradeRowsPerPage: rows,
            tradePage: 0,
        });
        this.handleGetUserTrades(rows, 0);
    };

    private handleGetUserTrades = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;

        this.props.getUserTrades({ limit, page: page + 1, uid, ordering: 'desc' });
    }

    private handleOrderChangePage = (page: number) => {
        this.setState({ orderPage: Number(page) });
        this.handleGetUserOrders(this.state.orderRowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleOrderChangeRowsPerPage = (rows: number) => {
        this.setState({
            orderRowsPerPage: rows,
            orderPage: 0,
        });
        this.handleGetUserOrders(rows, 0);
    };

    private handleGetUserOrders = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;

        this.props.getUserOrders({ limit, page: page + 1, uid,ordering: 'desc' });
    }

    private handleWithdrawChangePage = (page: number) => {
        this.setState({ withdrawPage: Number(page) });
        this.handleGetUserWithdraws(this.state.withdrawRowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleWithdrawChangeRowsPerPage = (rows: number) => {
        this.setState({
            withdrawRowsPerPage: rows,
            withdrawPage: 0,
        });
        this.handleGetUserWithdraws(rows, 0);
    };

    private handleGetUserWithdraws = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;

        this.props.getUserWithdraws({ limit, page: page + 1, uid });
    }

    private handleDepositChangePage = (page: number) => {
        this.setState({ depositPage: Number(page) });
        this.handleGetUserDeposits(this.state.depositRowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleDepositChangeRowsPerPage = (rows: number) => {
        this.setState({
            depositRowsPerPage: rows,
            depositPage: 0,
        });
        this.handleGetUserDeposits(rows, 0);
    };

    private handleGetUserDeposits = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;
        this.props.getUserDeposits({ limit, page: page + 1, uid,ordering: 'desc' });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        userData: selectUserData(state),
        userTrades: selectTrades(state),
        tradeLoading: selectTradesLoading(state),
        tradeTotal: selectTradesTotalNumber(state),
        tradePage: selectTradesCurrentPage(state),
        userOrders: selectOrders(state),
        orderLoading: selectOrdersLoading(state),
        orderTotal: selectOrdersTotalNumber(state),
        orderPage: selectOrdersCurrentPage(state),
        userWithdraws: selectWithdrawals(state),
        withdrawLoading: selectWithdrawalsLoading(state),
        withdrawTotal: selectWithdrawalsTotalNumber(state),
        withdrawPage: selectWithdrawalsCurrentPage(state),
        userDeposits: selectDeposits(state),
        depositLoading: selectDepositsLoading(state),
        depositTotal: selectDepositsTotalNumber(state),
        depositPage: selectDepositsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getUserData: payload => dispatch(getUserData(payload)),
        getUserTrades: params => dispatch(getTrades(params)),
        getUserOrders: params => dispatch(getOrders(params)),
        getUserWithdraws: params => dispatch(getWithdrawals(params)),
        getUserDeposits: params => dispatch(getDeposits(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const UserHistory = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(UserHistoryScreen as any)));

