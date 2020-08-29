import {
    Grid,
    Paper,
} from '@material-ui/core';
import { History } from 'history';
import { Moment } from 'moment';
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
    alertPush,
    AppState,
    getPendingWithdrawals,
    PendingWithdrawalsDataInterface,
    selectPendingWithdrawals,
    selectPendingWithdrawalsCurrentPage,
    selectPendingWithdrawalsLoading,
    selectPendingWithdrawalsTotalNumber,
} from '../../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    total: number;
    page: number;
    pendingWithdrawals: PendingWithdrawalsDataInterface[];
}

interface DispatchProps {
    getPendingWithdrawals: typeof getPendingWithdrawals;
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

interface CoinState {
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
        { key: string, value: string },
    ];
    selectedStartDate?: string | null;
    selectedEndDate?: string | null;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class CoinScreen extends React.Component<Props, CoinState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            selectedStartDate: null,
            selectedEndDate: null,
            FilterDrawerState: [
                { key: 'State', value: '' },
                { key: 'ID', value: '' },
                { key: 'TxID', value: '' },
                { key: 'TID', value: '' },
                { key: 'Beneficiary ID', value: '' },
                { key: 'Confirmations', value: '' },
                { key: 'UID', value: '' },
                { key: 'Currency', value: '' },
            ]
        };
    }

    private coinRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'currency', alignRight: false, label: 'Currency' },
        { key: 'state', alignRight: true, label: 'State' },
        { key: 'blockchain_txid', alignRight: true, label: 'TxID' },
        { key: 'rid', alignRight: true, label: 'Recipient Address' },
        { key: 'created_at', alignRight: true, label: 'Date' },
        { key: 'amount', alignRight: true, label: 'Amount' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getPendingWithdrawals({ page: page + 1, limit: rowsPerPage / 2, type: 'coin', ordering: 'desc' });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            selectedStartDate,
            selectedEndDate,
            FilterDrawerState,
        } = this.state;
        const {
            pendingWithdrawals,
            total,
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
                                        data={pendingWithdrawals}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.coinRows}
                                        dataLength={total}
                                        hidePagination={false}
                                        withDetails={true}
                                        handleGoToDetails={this.handleGoToDetailsPage}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }
                <FilterDrawer
                    closeFilterDrawer={handleCloseFilterDrawer}
                    open={drawerOpen}
                    handleChange={this.handleChange}
                    handleClose={handleCloseFilterDrawerCLick}
                    list={FilterDrawerState}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
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
        FilterDrawerState[1].value = '';
        FilterDrawerState[2].value = '';
        FilterDrawerState[3].value = '';
        FilterDrawerState[4].value = '';
        FilterDrawerState[5].value = '';
        FilterDrawerState[6].value = '';
        FilterDrawerState[7].value = '';
        this.setState({ FilterDrawerState, selectedEndDate: null, selectedStartDate: null });
    };

    private handleStartDateChange = (date: Moment) => {
        this.setState({
            selectedStartDate: date.format(),
        });
    };

    private handleEndDateChange = (date: Moment) => {
        this.setState({
            selectedEndDate: date.format(),
        });
    };

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${root()}/accountings/withdrawals-pending/${event.id}/details`, { id: event.id });
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
        this.handleGetWithdrawals(rows / 2, 0);
    };

    private handleGetWithdrawals = (limit: number, page: number) => {
        this.props.getPendingWithdrawals({ limit, page: page + 1, type: 'coin', ordering: 'desc' });
    }

    private handleGetFilterAdjustments = () => {
        const { FilterDrawerState, rowsPerPage, page, selectedStartDate, selectedEndDate } = this.state;
        this.props.getPendingWithdrawals({
            limit: rowsPerPage,
            page: page + 1,
            type: 'coin',
            ordering: 'desc',
            state: FilterDrawerState[0].value,
            id: FilterDrawerState[1].value,
            txid: FilterDrawerState[2].value,
            tid: FilterDrawerState[3].value,
            rid: FilterDrawerState[4].value,
            confirmations: FilterDrawerState[5].value,
            uid: FilterDrawerState[6].value,
            currency: FilterDrawerState[7].value,
            from: selectedStartDate !== null ? selectedStartDate : '',
            to: selectedEndDate !== null ? selectedEndDate : '',
        });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        pendingWithdrawals: selectPendingWithdrawals(state),
        loading: selectPendingWithdrawalsLoading(state),
        total: selectPendingWithdrawalsTotalNumber(state),
        page: selectPendingWithdrawalsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getPendingWithdrawals: params => dispatch(getPendingWithdrawals(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

const CoinPage = connect(mapStateToProps, mapDispatchToProps)(CoinScreen);

// tslint:disable-next-line:no-any
export const Coin = withRouter(CoinPage);
