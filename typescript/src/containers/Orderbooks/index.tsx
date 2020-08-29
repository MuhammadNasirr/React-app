import {
    createStyles,
    Grid,
    Paper,
    Theme,
    Typography,
    WithStyles,
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
import {
    alertPush,
    AppState,
    BuyOrderDataInterface,
    cancelBuyOrder,
    cancelSellOrder,
    getBuyOrders,
    getSellOrders,
    selectBuyOrders,
    selectBuyOrdersCurrentPage,
    selectBuyOrdersLoading,
    selectBuyOrdersTotalNumber,
    selectSellOrders,
    selectSellOrdersCurrentPage,
    selectSellOrdersLoading,
    selectSellOrdersTotalNumber,
    SellOrderDataInterface,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    buyLoading: boolean;
    sellLoading: boolean;
    buyTotal: number;
    sellTotal: number;
    buyPage: number;
    sellPage: number;
    buyOrders: BuyOrderDataInterface[];
    sellOrders: SellOrderDataInterface[];
}

interface DispatchProps {
    getBuyOrders: typeof getBuyOrders;
    getSellOrders: typeof getSellOrders;
    cancelBuyOrder: typeof cancelBuyOrder;
    cancelSellOrder: typeof cancelSellOrder;
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
    button: {
        paddingBottom: 0,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 312,
    },
    menu: {
        width: 400,
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}

interface OrderBooksState {
    market: string;
    open: boolean;
    showAll: boolean;
    showAllBuy: boolean;
    currency: string;
    amount: number;
    uid: string;
    buyPage: number;
    buyRowsPerPage: number;
    sellPage: number;
    sellRowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class OrderBooksScreen extends React.Component<Props, OrderBooksState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            market: '',
            open: false,
            currency: 'fth',
            amount: 0,
            uid: '',
            buyPage: 0,
            buyRowsPerPage: tablePageLimit(),
            sellPage: 0,
            sellRowsPerPage: tablePageLimit(),
            showAll: true,
            showAllBuy: true,
        };
    }

    private marketsRows = [
        { key: 'id', alignRight: false, label: 'Order ID' },
        { key: 'uid', alignRight: false, label: 'UID' },
        { key: 'side', alignRight: false, label: 'Type' },
        { key: 'price', alignRight: false, label: 'Price' },
        { key: 'origin_volume', alignRight: true, label: 'Amount' },
        { key: 'cancel', alignRight: true, label: '' }
    ];

    public componentDidMount() {
        const {
            buyPage,
            buyRowsPerPage,
            sellPage,
            sellRowsPerPage
        } = this.state;
        const market = this.props.match.params.id;
        this.setState({ market });
        this.props.getBuyOrders({ page: buyPage + 1, limit: buyRowsPerPage, state: 'wait', type: 'buy', market: market, order_by: 'price', ordering: 'desc' });
        this.props.getSellOrders({ page: sellPage + 1, limit: sellRowsPerPage, state: 'wait', type: 'sell', market: market, order_by: 'price', ordering: 'desc' });

    }

    public render() {
        const {
            buyPage,
            buyRowsPerPage,
            sellPage,
            sellRowsPerPage,
            showAll,
            showAllBuy,
        } = this.state;
        const {
            buyLoading,
            buyTotal,
            buyOrders,
            sellTotal,
            sellOrders
        } = this.props;
        return (
            <React.Fragment>
                <Grid container={true} direction="row">
                    <Grid item={true} xs={6} lg={6}>
                        <Typography variant="h6" gutterBottom={true}>
                            Buy orders
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={6} lg={6}>
                        <Typography variant="h6" gutterBottom={true}>
                            Sell orders
                        </Typography>
                    </Grid>
                </Grid>
                {!buyLoading ?
                    (
                        <Grid container={true} spacing={24} direction={'row'} style={{ marginBottom: 15, marginTop: 15 }}>
                            <Grid item={true} xs={6} lg={6}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={buyOrders}
                                        page={buyPage}
                                        rowsPerPage={buyRowsPerPage}
                                        handleChangePage={this.handleBuyOrdersChangePage}
                                        handleChangeRowsPerPage={this.handleBuyOrdersChangeRowsPerPage}
                                        rows={this.marketsRows}
                                        dataLength={buyTotal}
                                        hidePagination={false}
                                        location={this.props.location}
                                        showAll={showAllBuy}
                                        handleShowAll={this.handleShowBuyAll}
                                        handleCancel={this.handleCancelBuyOrder}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={6} lg={6}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={sellOrders}
                                        page={sellPage}
                                        rowsPerPage={sellRowsPerPage}
                                        handleChangePage={this.handleSellOrdersChangePage}
                                        handleChangeRowsPerPage={this.handleSellOrdersChangeRowsPerPage}
                                        rows={this.marketsRows}
                                        dataLength={sellTotal}
                                        hidePagination={false}
                                        location={this.props.location}
                                        showAll={showAll}
                                        handleShowAll={this.handleShowSellAll}
                                        handleCancel={this.handleCancelSellOrder}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }
            </React.Fragment>
        );
    }

    private handleBuyOrdersChangePage = (page: number) => {
        this.setState({ buyPage: Number(page) });
        this.handleGetBuyOrders(this.state.buyRowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleBuyOrdersChangeRowsPerPage = (rows: number) => {
        this.setState({
            buyRowsPerPage: rows,
            buyPage: 0,
        });
        this.handleGetBuyOrders(rows, 0);
    };

    private handleGetBuyOrders = (limit: number, page: number) => {
        const { market } = this.state;
        this.props.getBuyOrders({ page: page + 1, limit, state: 'wait', type: 'buy', market: market, order_by: 'price', ordering: 'desc' });
    }

    private handleSellOrdersChangePage = (page: number) => {
        this.setState({ sellPage: Number(page) });
        this.handleGetSellOrders(this.state.sellRowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleSellOrdersChangeRowsPerPage = (rows: number) => {
        this.setState({
            sellRowsPerPage: rows,
            sellPage: 0,
        });
        this.handleGetSellOrders(rows, 0);
    };

    private handleGetSellOrders = (limit: number, page: number) => {
        const { market } = this.state;
        this.props.getSellOrders({ page: page + 1, limit, state: 'wait', type: 'buy', market: market, order_by: 'price', ordering: 'desc' });
    }

    private handleShowBuyAll = () => {
        const { market } = this.state;
        this.setState({ showAllBuy: false });
        this.props.getBuyOrders({ state: 'wait', type: 'buy', market: market, order_by: 'price', ordering: 'desc' });
    }

    private handleShowSellAll = () => {
        const { market } = this.state;
        this.setState({ showAll: false });
        this.props.getSellOrders({ state: 'wait', type: 'sell', market: market, order_by: 'price', ordering: 'desc' });
    }

    private handleCancelBuyOrder = id => {
        const { market } = this.state;
        this.props.cancelBuyOrder({ id, market });
    }

    private handleCancelSellOrder = id => {
        const { market } = this.state;
        this.props.cancelSellOrder({ id, market });
    }
}


const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        buyOrders: selectBuyOrders(state),
        buyLoading: selectBuyOrdersLoading(state),
        buyTotal: selectBuyOrdersTotalNumber(state),
        buyPage: selectBuyOrdersCurrentPage(state),
        sellOrders: selectSellOrders(state),
        sellLoading: selectSellOrdersLoading(state),
        sellTotal: selectSellOrdersTotalNumber(state),
        sellPage: selectSellOrdersCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBuyOrders: params => dispatch(getBuyOrders(params)),
        getSellOrders: params => dispatch(getSellOrders(params)),
        cancelBuyOrder: params => dispatch(cancelBuyOrder(params)),
        cancelSellOrder: params => dispatch(cancelSellOrder(params)),
        alertPush: params => dispatch(alertPush(params)),
    });
const OrderBooksPage = connect(mapStateToProps, mapDispatchToProps)(OrderBooksScreen);

// tslint:disable-next-line:no-any
export const OrderBooks = withRouter(OrderBooksPage as any);
