import {
    createStyles,
    Fab,
    Grid,
    Paper,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
    ModalBox
} from '../../components/Modal';
import {
    addDeposit,
    alertPush,
    AppState,
    CurrenciesDataInterface,
    getCurrencies,
    selectCurrencies,
    selectCurrenciesCurrentPage,
    selectCurrenciesLoading,
    selectCurrenciesTotalNumber,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    currenciesTotal: number;
    page: number;
    currencies: CurrenciesDataInterface[];
}

interface DispatchProps {
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


interface CurrencyState {
    open: boolean;
    currency: string;
    amount: number;
    uid: string;
    page: number;
    rowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class CurrencyScreen extends React.Component<Props, CurrencyState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            open: false,
            currency: 'fth',
            amount: 0,
            uid: '',
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    private currencyRows = [
        { key: 'code', alignRight: false, label: 'Code' },
        { key: 'name', alignRight: false, label: 'Name' },
        { key: 'symbol', alignRight: false, label: 'Symbol' },
        { key: 'type', alignRight: false, label: 'Type' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'visible', alignRight: true, label: 'Visible' },
        { key: 'deposit_enabled', alignRight: true, label: 'Deposit' },
        { key: 'withdrawal_enabled', alignRight: true, label: 'Withdrawal' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getCurrencies({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            open,
            currency,
            amount,
            uid,
            page,
            rowsPerPage
        } = this.state;
        const {
            classes,
            loading,
            currenciesTotal,
            currencies
        } = this.props;
        const currencyData = currencies.filter(x => x.type === 'fiat');

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true}>
                            Currency
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={this.handleGoToCreatePage}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
                {!loading ?
                    (
                        <Grid container={true} spacing={24} direction={'row'} style={{ marginBottom: 15, marginTop: 15 }}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={currencies}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleCurrencyChangePage}
                                        handleChangeRowsPerPage={this.handleCurrenciesChangeRowsPerPage}
                                        rows={this.currencyRows}
                                        dataLength={currenciesTotal}
                                        hidePagination={false}
                                        location={this.props.location}
                                        withDetails={true}
                                        handleGoToDetails={this.handleGoToEditPage}
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
                    handleClose={this.handleCloseModal}
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
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
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
                            className={classes.textField}
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
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </ModalBox>
            </React.Fragment>
        );
    }

    private handleGoToCreatePage = () => {
        this.props.history.push(`${this.props.location.pathname}/add`, { add: true });
    };

    private handleCloseModal = (): void => {
        this.setState({ open: false });
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
        this.handleCloseModal();
        const { currency, amount, uid } = this.state;
        const data = { currency, amount, uid };
        data.amount = Number(amount);
        this.props.addDeposit(data);
    };

    // tslint:disable-next-line:no-any
    private handleGoToEditPage = (event: any) => {
        this.props.history.push(`${this.props.location.pathname}/${event.code}/edit`, { tid: event.tid });
    };

    private handleCurrencyChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetCurrencies(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleCurrenciesChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetCurrencies(rows, 0);
    };

    private handleGetCurrencies = (limit: number, page: number) => {
        this.props.getCurrencies({ limit, page: page + 1 });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        currencies: selectCurrencies(state),
        loading: selectCurrenciesLoading(state),
        currenciesTotal: selectCurrenciesTotalNumber(state),
        page: selectCurrenciesCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        addDeposit: params => dispatch(addDeposit(params)),
        getCurrencies: params => dispatch(getCurrencies(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Currency = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(CurrencyScreen as any)));

