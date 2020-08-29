import {
    Grid,
    Paper,
    TextField,
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
    tablePageLimit,
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
    addDeposit,
    alertPush,
    AppState,
    CurrenciesDataInterface,
    DepositsDataInterface,
    getCurrencies,
    getDeposits,
    selectCurrencies,
    selectDeposits,
    selectDepositsCurrentPage,
    selectDepositsLoading,
    selectDepositsTotalNumber,
} from '../../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    depositTotal: number;
    page: number;
    deposits: DepositsDataInterface[];
    currencies: CurrenciesDataInterface[];
}

interface DispatchProps {
    getDeposits: typeof getDeposits;
    addDeposit: typeof addDeposit;
    getCurrencies: typeof getCurrencies;
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
    open: boolean;
    // tslint:disable-next-line:no-any
    handleCloseFilterDrawer: any;
    // tslint:disable-next-line:no-any
    handleCloseModal: any;
    // tslint:disable-next-line:no-any
    handleCloseFilterDrawerCLick: any;
}

// const styles = (theme: Theme) => createStyles({
//     button: {
//         paddingBottom: 0,
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//         width: 312,
//     },
//     menu: {
//         width: 400,
//     },
//     ml10: {
//         marginLeft: 10
//     }
// });

// interface StyleProps extends WithStyles<typeof styles> {
// }


interface DepositState {
    currency: string;
    amount: number;
    uid: string;
    FilterDrawerState: [
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
    ];
    page: number;
    rowsPerPage: number;
    selectedStartDate?: string | null;
    selectedEndDate?: string | null;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class FiatScreen extends React.Component<Props, DepositState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currency: 'fth',
            amount: 0,
            uid: '',
            page: 0,
            rowsPerPage: tablePageLimit(),
            selectedStartDate: null,
            selectedEndDate: null,
            FilterDrawerState: [
                { key: 'Email', value: '' },
                { key: 'Currency', value: '' },
                { key: 'State', value: '' },
                { key: 'ID', value: '' },
                { key: 'TxID', value: '' },
                { key: 'Address', value: '' },
                { key: 'TID', value: '' },
                { key: 'UID', value: '' },
                { key: 'Type', value: '' },
            ]
        };
    }

    private depositRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'uid', alignRight: false, label: 'UID' },
        { key: 'txid', alignRight: false, label: 'TxID' },
        { key: 'created_at', alignRight: false, label: 'Created' },
        { key: 'amount', alignRight: true, label: 'Amount' },
        { key: 'currency', alignRight: true, label: 'Currency' },
        { key: 'confirmations', alignRight: true, label: 'Confirmations' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getDeposits({ page: page + 1, limit: rowsPerPage, ordering: 'desc', type: 'fiat' });
        this.props.getCurrencies({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            currency,
            amount,
            uid,
            page,
            rowsPerPage,
            selectedStartDate,
            selectedEndDate,
            FilterDrawerState
        } = this.state;
        const {
            deposits,
            drawerOpen,
            open,
            loading,
            depositTotal,
            currencies,
            handleCloseModal,
            handleCloseFilterDrawerCLick,
            handleCloseFilterDrawer
        } = this.props;
        const currencyData = currencies.filter(x => x.type === 'fiat');
        return (
            <React.Fragment>
                {!loading ?
                    (
                        <Grid container={true} spacing={24} direction={'row'} style={{ marginBottom: 15, marginTop: 15 }}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={deposits}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleDepositChangePage}
                                        handleChangeRowsPerPage={this.handleDepositChangeRowsPerPage}
                                        rows={this.depositRows}
                                        dataLength={depositTotal}
                                        hidePagination={false}
                                        location={this.props.location}
                                        withDetails={true}
                                        handleGoToDetails={this.handleGoToDetailsPage}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }
                <ModalBox
                    open={open}
                    mode={0}
                    label="Create Deposit"
                    handleClose={handleCloseModal}
                    handleCreate={this.handleCreateDeposit}
                >
                    <Grid item={true}>
                        <TextField
                            select={true}
                            required={true}
                            id="standard-required"
                            label="Currency"
                            name="currency"
                            value={currency}
                            onChange={this.handleChangeCurrency}
                            // className={classes.textField}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    // className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {currencyData.length && currencyData.map(option => (<option key={option.code} value={option.code}>{option.code.toUpperCase()}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="Amount"
                            name="amount"
                            value={amount}
                            onChange={this.handleChangeAmount}
                            // className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="UID"
                            name="uid"
                            value={uid}
                            onChange={this.handleChangeUID}
                            // className={classes.textField}
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
                    list={FilterDrawerState}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleFilter={this.handleFilterGetDeposits}
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
        FilterDrawerState[8].value = '';
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
    private handleChangeCurrency = (e: any) => {
        this.setState({ currency: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeAmount = (e: any) => {
        this.setState({ amount: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeUID = (e: any) => {
        this.setState({ uid: e.target.value });
    };

    private handleCreateDeposit = (): void => {
        this.props.handleCloseModal();
        const { currency, amount, uid } = this.state;
        const data = { currency, amount, uid };
        data.amount = Number(amount);
        this.props.addDeposit(data);
    };

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${root()}/accountings/deposits/${event.tid}/details`, { tid: event.tid });
    };

    private handleDepositChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetDeposits(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleDepositChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetDeposits(rows, 0);
    };

    private handleGetDeposits = (limit: number, page: number) => {
        this.props.getDeposits({ limit, page: page + 1, ordering: 'desc', type: 'fiat' });
    }

    private handleFilterGetDeposits = () => {
        const { FilterDrawerState, rowsPerPage, page, selectedStartDate, selectedEndDate } = this.state;
        this.props.getDeposits({
            limit: rowsPerPage,
            page: page + 1,
            ordering: 'desc',
            email: FilterDrawerState[0].value,
            currency: FilterDrawerState[1].value,
            state: FilterDrawerState[2].value,
            id: FilterDrawerState[3].value,
            txid: FilterDrawerState[4].value,
            address: FilterDrawerState[5].value,
            tid: FilterDrawerState[6].value,
            uid: FilterDrawerState[7].value,
            type: FilterDrawerState[8].value,
            from: selectedStartDate !== null ? selectedStartDate : '',
            to: selectedEndDate !== null ? selectedEndDate : '',
        });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        deposits: selectDeposits(state),
        currencies: selectCurrencies(state),
        loading: selectDepositsLoading(state),
        depositTotal: selectDepositsTotalNumber(state),
        page: selectDepositsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getDeposits: params => dispatch(getDeposits(params)),
        addDeposit: params => dispatch(addDeposit(params)),
        getCurrencies: params => dispatch(getCurrencies(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
const FiatPage = connect(mapStateToProps, mapDispatchToProps)(FiatScreen);

// tslint:disable-next-line:no-any
export const Fiat = withRouter(FiatPage);
