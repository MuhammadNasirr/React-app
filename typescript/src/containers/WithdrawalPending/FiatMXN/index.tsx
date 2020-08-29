import {
    Grid,
    Paper,
    TextField,
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
    InfoTable
} from '../../../components/InfoTable/InfoTable';
import {
    ModalBox
} from '../../../components/Modal';
import {
    alertPush,
    AppState,
    getPendingWithdrawalsMXN,
    PendingWithdrawalsMXNDataInterface,
    selectPendingWithdrawalsMXN,
    selectPendingWithdrawalsMXNCurrentPage,
    selectPendingWithdrawalsMXNLoading,
    selectPendingWithdrawalsMXNTotalNumber,
    updateWithdrawPendingMXN
} from '../../../modules';


interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    pendingWithdrawalsTotal: number;
    page: number;
    pendingWithdrawals: PendingWithdrawalsMXNDataInterface[];
}

interface DispatchProps {
    getPendingWithdrawalsMXN: typeof getPendingWithdrawalsMXN;
    updateWithdrawPendingMXN: typeof updateWithdrawPendingMXN;
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
        this.props.getPendingWithdrawalsMXN({ page: page + 1, limit: rowsPerPage, });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            open,
            amount,
            price
        } = this.state;
        const {
            pendingWithdrawals,
            pendingWithdrawalsTotal,
            loading,
        } = this.props;
        return (
            <React.Fragment>
                {!loading
                    ? (
                        <Grid container={true} spacing={24} direction={'row'}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={pendingWithdrawals}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.fiatRows}
                                        dataLength={pendingWithdrawalsTotal}
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
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${root()}/accountings/withdrawals-pending/${event.id}/details`, { id: event.id, mxn: true });
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetWithdrawals(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleEdit = (event: any) => {
        this.setState({ open: true, id: event.id });
    };

    // tslint:disable-next-line:no-any
    private handleEditRow = () => {
        const { amount, price, id } = this.state;
        this.props.updateWithdrawPendingMXN({ amount: Number(amount), price: Number(price), id });
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

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetWithdrawals(rows, 0);
    };

    private handleGetWithdrawals = (limit: number, page: number) => {
        this.props.getPendingWithdrawalsMXN({ limit, page: page + 1, });
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        pendingWithdrawals: selectPendingWithdrawalsMXN(state),
        loading: selectPendingWithdrawalsMXNLoading(state),
        pendingWithdrawalsTotal: selectPendingWithdrawalsMXNTotalNumber(state),
        page: selectPendingWithdrawalsMXNCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getPendingWithdrawalsMXN: params => dispatch(getPendingWithdrawalsMXN(params)),
        updateWithdrawPendingMXN: params => dispatch(updateWithdrawPendingMXN(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

const FiatMXNPage = connect(mapStateToProps, mapDispatchToProps)(FiatMXNScreen);

// tslint:disable-next-line:no-any
export const FiatMXN = withRouter(FiatMXNPage);
