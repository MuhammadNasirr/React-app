import {
    Grid,
    Paper,
    Typography,
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
} from '../../../api/config';
import { FilterDrawer } from '../../../components';
import {
    InfoTable
} from '../../../components/InfoTable/InfoTable';
import {
    alertPush,
    AppState,
    cancelOrders,
    getOrders,
    OrdersDataInterface,
    selectOrders,
    selectOrdersCurrentPage,
    selectOrdersLoading,
    selectOrdersTotalNumber,
} from '../../../modules';

interface ReduxProps {
    loading: boolean;
    total: number;
    page: number;
    ordersHistory: OrdersDataInterface[];
}

interface DispatchProps {
    getOrdersHistory: typeof getOrders;
    cancelOrder: typeof cancelOrders;
    alertPush: typeof alertPush;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
    drawerOpen: boolean;
    // tslint:disable-next-line:no-any
    handleCloseFilterDrawer: any;
    // tslint:disable-next-line:no-any
    handleCloseFilterDrawerCLick: any;
}

interface OrderHistoryState {
    page: number;
    rowsPerPage: number;
    FilterDrawerState: [
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
    ];
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class OrdersHistoryScreen extends React.Component<Props, OrderHistoryState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            FilterDrawerState: [
                { key: 'Order ID', value: '' },
                { key: 'Market', value: '' },
                { key: 'Type', value: '' },
                { key: 'Amount', value: '' },
                { key: 'Executed', value: '' },
                { key: 'Price', value: '' },
                { key: 'Side', value: '' },
            ]
        };
    }

    private ordersHistoryRows = [
        { key: 'id', alignRight: false, label: 'Order ID' },
        { key: 'market', alignRight: false, label: 'Market' },
        { key: 'ord_type', alignRight: false, label: 'Type' },
        { key: 'remaining_volume', alignRight: true, label: 'Amount' },
        { key: 'executed_volume', alignRight: true, label: 'Executed' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'side', alignRight: true, label: 'Side' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'updated_at', alignRight: true, label: 'Updated' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getOrdersHistory({ page: page + 1, limit: rowsPerPage, ordering: 'desc' });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            FilterDrawerState,
        } = this.state;
        const {
            ordersHistory,
            total,
            loading,
            drawerOpen,
            handleCloseFilterDrawer,
            handleCloseFilterDrawerCLick
        } = this.props;


        return (
            <React.Fragment>
                <div>
                    <Typography variant="h6" gutterBottom={true}>
                        Orders History
                    </Typography>
                    {!loading
                        ? (
                            <Grid container={true} spacing={24} direction={'row'}>
                                <Grid item={true} xs={12} lg={12}>
                                    <Paper style={{ marginBottom: 15 }}>
                                        <InfoTable
                                            data={ordersHistory}
                                            page={page}
                                            rowsPerPage={rowsPerPage}
                                            handleChangePage={this.handleChangePage}
                                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            handleCancel={this.handleCancelOrder}
                                            rows={this.ordersHistoryRows}
                                            dataLength={total}
                                            hidePagination={false}
                                            withActions={false}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        ) : 'Loading'
                    }
                </div>
                <FilterDrawer
                    closeFilterDrawer={handleCloseFilterDrawer}
                    open={drawerOpen}
                    noDateShow={true}
                    handleChange={this.handleChange}
                    handleClose={handleCloseFilterDrawerCLick}
                    list={FilterDrawerState}
                    handleFilter={this.handleGetFilterAdjustments}
                    handleReset={this.handleReset}
                />
            </React.Fragment>
        );
    }

    private handleCancelOrder = (id: number) => {
        this.props.cancelOrder({ id });
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetOrdersHistory(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetOrdersHistory(rows, 0);
    };

    private handleGetOrdersHistory = (limit: number, page: number) => {
        this.props.getOrdersHistory({ page: page + 1, limit, ordering: 'desc' });
    }

    // tslint:disable:no-any
    private handleChange = (key: number, name: string, e: any) => {
        const { FilterDrawerState } = this.state;
        FilterDrawerState[key].value = e;
        this.setState({ FilterDrawerState });
    };
    private handleReset = () => {
        const { FilterDrawerState } = this.state;
        FilterDrawerState[0].value = '';
        FilterDrawerState[1].value = '';
        FilterDrawerState[2].value = '';
        FilterDrawerState[3].value = '';
        FilterDrawerState[4].value = '';
        FilterDrawerState[5].value = '';
        FilterDrawerState[6].value = '';
        this.setState({ FilterDrawerState });
    };

    private handleGetFilterAdjustments = () => {
        const { FilterDrawerState, rowsPerPage, page } = this.state;
        this.props.getOrdersHistory({
            page: page + 1,
            limit: rowsPerPage,
            ordering: 'desc',
            id: FilterDrawerState[0].value,
            market: FilterDrawerState[1].value,
            ord_type: FilterDrawerState[2].value,
            remaining_volume: FilterDrawerState[3].value,
            executed_volume: FilterDrawerState[4].value,
            price: FilterDrawerState[5].value,
            side: FilterDrawerState[6].value,
        });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        ordersHistory: selectOrders(state),
        loading: selectOrdersLoading(state),
        total: selectOrdersTotalNumber(state),
        page: selectOrdersCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getOrdersHistory: params => dispatch(getOrders(params)),
        cancelOrder: payload => dispatch(cancelOrders(payload)),
        alertPush: params => dispatch(alertPush(params)),
    });

const OrdersHistoryPage = connect(mapStateToProps, mapDispatchToProps)(OrdersHistoryScreen);

// tslint:disable-next-line:no-any
export const OrdersHistory = withRouter(OrdersHistoryPage);
