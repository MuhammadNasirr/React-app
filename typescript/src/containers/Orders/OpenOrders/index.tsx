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
import { ConfirmationModal, FilterDrawer } from '../../../components';
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
    openOrders: OrdersDataInterface[];
}

interface DispatchProps {
    getOpenOrders: typeof getOrders;
    cancelOpenOrders: typeof cancelOrders;
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


interface OpenOrderState {
    id: number;
    uid: string;
    page: number;
    rowsPerPage: number;
    openConfirmationModal: boolean;
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

class OpenOrderScreen extends React.Component<Props, OpenOrderState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            id: 0,
            uid: '',
            page: 0,
            rowsPerPage: tablePageLimit(),
            openConfirmationModal: false,
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

    private openOrdersRows = [
        { key: 'id', alignRight: false, label: 'Order ID' },
        { key: 'market', alignRight: false, label: 'Market' },
        { key: 'ord_type', alignRight: false, label: 'Type' },
        { key: 'remaining_volume', alignRight: true, label: 'Amount' },
        { key: 'executed_volume', alignRight: true, label: 'Executed' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'side', alignRight: true, label: 'Side' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'updated_at', alignRight: true, label: 'Updated' },
        { key: 'cancel', alignRight: true, label: '' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getOpenOrders({ page: page + 1, limit: rowsPerPage, state: 'wait', ordering: 'desc' });
    }

    public render() {
        const {
            id,
            page,
            rowsPerPage,
            openConfirmationModal,
            FilterDrawerState,
        } = this.state;
        const {
            openOrders,
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
                        Open Orders
                    </Typography>
                    {!loading
                        ? (
                            <Grid container={true} spacing={24} direction={'row'}>
                                <Grid item={true} xs={12} lg={12}>
                                    <Paper style={{ marginBottom: 15 }}>
                                        <InfoTable
                                            data={openOrders}
                                            page={page}
                                            rowsPerPage={rowsPerPage}
                                            handleChangePage={this.handleChangePage}
                                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            handleCancel={this.handleOpenCancelUserOpenOrdersModal}
                                            rows={this.openOrdersRows}
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
                <ConfirmationModal
                    handleDone={this.handleCancelOpenOrder}
                    modalClose={this.modalClose}
                    id={id}
                    title={'Delete Order'}
                    description={'Are you sure you want to delete this open order'}
                    open={openConfirmationModal}
                />
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

    private modalClose = () => {
        this.setState({
            openConfirmationModal: false
        });
    };

    private handleOpenCancelUserOpenOrdersModal = (id: number, uid: string) => {
        this.setState({
            id: id,
            uid: uid,
            openConfirmationModal: true
        });
    };

    private handleCancelOpenOrder = (id: number) => {
        console.log('uid', this.state.uid);
        this.props.cancelOpenOrders({ id, uid: this.state.uid });
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetOpenOrders(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetOpenOrders(rows, 0);
    };

    private handleGetOpenOrders = (limit: number, page: number) => {
        this.props.getOpenOrders({ page: page + 1, limit, state: 'wait', ordering: 'desc' });
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
        this.props.getOpenOrders({
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
        openOrders: selectOrders(state),
        loading: selectOrdersLoading(state),
        total: selectOrdersTotalNumber(state),
        page: selectOrdersCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getOpenOrders: params => dispatch(getOrders(params)),
        cancelOpenOrders: payload => dispatch(cancelOrders(payload)),
        alertPush: params => dispatch(alertPush(params)),
    });

const OpenOrdersPage = connect(mapStateToProps, mapDispatchToProps)(OpenOrderScreen);

// tslint:disable-next-line:no-any
export const OpenOrders = withRouter(OpenOrdersPage);
