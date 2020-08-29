import {
    Grid,
    Paper,
    TextField
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
    root,
    tablePageLimit
} from '../../../api/config';
import {
    FilterDrawer
} from '../../../components';
import {
    InfoTable
} from '../../../components/InfoTable/InfoTable';
import {
    ModalBox
} from '../../../components/Modal';
import {
    alertPush,
    AppState,
    getWithdrawalsMXN,
    selectWithdrawalsMXN,
    selectWithdrawalsMXNCurrentPage,
    selectWithdrawalsMXNLoading,
    selectWithdrawalsMXNTotalNumber,
    updateWithdrawMXN,
    WithdrawalsMXNDataInterface,
} from '../../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    withdrawalTotal: number;
    page: number;
    withdrawalsMXN: WithdrawalsMXNDataInterface[];
}

interface DispatchProps {
    getWithdrawalsMXN: typeof getWithdrawalsMXN;
    updateWithdrawMXN: typeof updateWithdrawMXN;
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

interface FiatMXNState {
    page: number;
    rowsPerPage: number;
    id: number;
    amount: string;
    price: string;
    open: boolean;
    FilterDrawerState: [
        { key: string, value: string },
    ];
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class FiatMXNScreen extends React.Component<Props, FiatMXNState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            id: 0,
            amount: '',
            open: false,
            price: '',
            rowsPerPage: tablePageLimit(),
            FilterDrawerState: [
                { key: 'state', value: '' },
            ]
        };
    }

    private fiatRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'uid', alignRight: false, label: 'UID' },
        { key: 'amount', alignRight: false, label: 'Amount' },
        { key: 'totalMXN', alignRight: false, label: 'Total' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'currency_src', alignRight: false, label: 'Currency src' },
        { key: 'currency_dst', alignRight: false, label: 'Currency dst' },
        { key: 'created_at', alignRight: true, label: 'Date' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getWithdrawalsMXN({ page: page + 1, limit: rowsPerPage, });
    }

    public render() {
        const {
            FilterDrawerState,
            page,
            rowsPerPage,
            open,
            amount,
            price
        } = this.state;
        const {
            withdrawalsMXN,
            withdrawalTotal,
            loading,
            drawerOpen,
            handleCloseFilterDrawer,
            handleCloseFilterDrawerCLick
        } = this.props;
        return (
            <React.Fragment>
                {!loading
                    ? (
                        <Grid container={true} spacing={24} direction={'row'}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={withdrawalsMXN}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.fiatRows}
                                        dataLength={withdrawalTotal}
                                        hidePagination={false}
                                        withDetails={true}
                                        mxnAction={true}
                                        handleEdit={this.handleEdit}
                                        handleGoToDetails={this.handleGoToDetailsPage}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }
                <ModalBox
                    open={open}
                    mode={1}
                    label="Edit Withdraws"
                    handleClose={this.handleCloseModal}
                    handleEdit={this.handleEditRow}
                >
                    <Grid item={true}>
                        <TextField
                            label="Amount"
                            name="amount"
                            value={amount}
                            onChange={this.handleChangeAmount}
                            style={{width: 312}}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="Price"
                            name="price"
                            value={price}
                            onChange={this.handleChangePrice}
                            style={{width: 312}}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </ModalBox>
                <FilterDrawer
                    closeFilterDrawer={handleCloseFilterDrawer}
                    open={drawerOpen}
                    handleChange={this.handleChange}
                    handleClose={handleCloseFilterDrawerCLick}
                    noDateShow={true}
                    list={FilterDrawerState}
                    handleFilter={this.handleGetFilterAdjustments}
                    handleReset={this.handleReset}
                />
            </React.Fragment>
        );
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
        this.setState({ FilterDrawerState });
    };

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${root()}/accountings/withdrawals/${event.id}/details`, { id: event.id, mxn: true });
    };
    // tslint:disable-next-line:no-any
    private handleEdit = (event: any) => {
        this.setState({ open: true, id: event.id });
    };

    // tslint:disable-next-line:no-any
    private handleEditRow = () => {
        const { amount, price, id } = this.state;
        this.props.updateWithdrawMXN({ amount: Number(amount), price: Number(price), id });
        this.setState({ open: false, amount: '', price: '' });
    };

    // tslint:disable-next-line:no-any
    private handleCloseModal = () => {
        this.setState({ open: false });
    };

    // tslint:disable-next-line:no-any
    private handleChangeAmount = (e: any) => {
        this.setState({ amount: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangePrice = (e: any) => {
        this.setState({ price: e.target.value });
    };


    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetWithdrawals(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetWithdrawals(rows, 0);
    };

    private handleGetWithdrawals = (limit: number, page: number) => {
        this.props.getWithdrawalsMXN({ limit, page: page + 1, });
    }

    private handleGetFilterAdjustments = () => {
        const { FilterDrawerState, rowsPerPage, page } = this.state;
        this.props.getWithdrawalsMXN({
            limit: rowsPerPage,
            page: page + 1,
            state: FilterDrawerState[0].value
        });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        withdrawalsMXN: selectWithdrawalsMXN(state),
        loading: selectWithdrawalsMXNLoading(state),
        withdrawalTotal: selectWithdrawalsMXNTotalNumber(state),
        page: selectWithdrawalsMXNCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getWithdrawalsMXN: params => dispatch(getWithdrawalsMXN(params)),
        updateWithdrawMXN: params => dispatch(updateWithdrawMXN(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

const FiatMXNPage = connect(mapStateToProps, mapDispatchToProps)(FiatMXNScreen);

// tslint:disable-next-line:no-any
export const FiatMXN = withRouter(FiatMXNPage);
