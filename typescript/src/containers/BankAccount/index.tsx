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
    addBankAccounts,
    alertPush,
    AppState,
    BankAccountsDataInterface,
    getBankAccounts,
    selectBankAccounts,
    selectBankAccountsCurrentPage,
    selectBankAccountsLoading,
    selectBankAccountsTotalNumber,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    depositTotal: number;
    page: number;
    bankAccount: BankAccountsDataInterface[];
}

interface DispatchProps {
    getBankAccounts: typeof getBankAccounts;
    addBankAccounts: typeof addBankAccounts;
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
    },
    ml10: {
        marginLeft: 10
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}


interface BankAccountState {
    page: number;
    id: number;
    mode: number;
    rowsPerPage: number;
    open: boolean;
    beneficiary: string;
    bank: string;
    clabe_code: string;
    account_number: string;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class BankAccountScreen extends React.Component<Props, BankAccountState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            mode: 0,
            rowsPerPage: tablePageLimit(),
            open: false,
            beneficiary: '',
            bank: '',
            id: 0,
            clabe_code: '',
            account_number: ''
        };
    }

    private bankAccountRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'bank', alignRight: false, label: 'Bank' },
        { key: 'beneficiary', alignRight: false, label: 'Beneficiary' },
        { key: 'clabe_code', alignRight: false, label: 'Clabe Code' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getBankAccounts({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            open,
            mode,
            beneficiary,
            bank,
            clabe_code,
            account_number
        } = this.state;
        const {
            classes,
            bankAccount,
            loading,
            depositTotal,
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true}>
                            Bank Accounts
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={this.handleAdd}>
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
                                        data={bankAccount}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleDepositChangePage}
                                        handleChangeRowsPerPage={this.handleDepositChangeRowsPerPage}
                                        rows={this.bankAccountRows}
                                        dataLength={depositTotal}
                                        hidePagination={false}
                                        location={this.props.location}
                                        withDetails={true}
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
                    mode={mode}
                    label={mode === 1 ? 'Edit Bank Account' : 'Add Bank Account'}
                    handleClose={this.handleCloseModal}
                    handleEdit={this.handleEditRow}
                    handleCreate={this.handleCreate}
                >
                    <Grid item={true}>
                        <TextField
                            label="Beneficiary"
                            name="beneficiary"
                            value={beneficiary}
                            onChange={this.handleChange}
                            style={{ width: 312 }}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="Bank"
                            name="bank"
                            value={bank}
                            onChange={this.handleChange}
                            style={{ width: 312 }}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="Clabe Code"
                            name="clabe_code"
                            value={clabe_code}
                            onChange={this.handleChange}
                            style={{ width: 312 }}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="Account Number"
                            name="account_number"
                            value={account_number}
                            onChange={this.handleChange}
                            style={{ width: 312 }}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </ModalBox>
            </React.Fragment >
        );
    }

    // tslint:disable-next-line:no-any
    private handleChange = (event: any): void => {
        const { name, value } = event.currentTarget;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // tslint:disable-next-line:no-any
    private handleEdit = (event: any) => {
        this.setState({ open: true, id: event.id, beneficiary: event.beneficiary, bank: event.bank, clabe_code: event.clabe_code, account_number: event.account_number, mode: 1 });
    };

    // tslint:disable-next-line:no-any
    private handleEditRow = () => {
        const { beneficiary, bank, id, clabe_code, account_number } = this.state;
        this.props.addBankAccounts({ beneficiary, bank, id, clabe_code, account_number });
        this.setState({ open: false, beneficiary: '', bank: '', clabe_code: '', account_number: '' });
    };

    // tslint:disable-next-line:no-any
    private handleCreate = () => {
        const { beneficiary, bank, clabe_code, account_number } = this.state;
        this.props.addBankAccounts({ beneficiary, bank, clabe_code, account_number });
        this.setState({ open: false, beneficiary: '', bank: '', clabe_code: '', account_number: '' });
    };

    // tslint:disable-next-line:no-any
    private handleCloseModal = () => {
        this.setState({ open: false });
    };

    private handleAdd = () => {
        this.setState({ open: true, mode: 0 });
    };

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${this.props.location.pathname}/${event.id}`, { id: event.id });
    };

    private handleDepositChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetBankAccount(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleDepositChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetBankAccount(rows, 0);
    };

    private handleGetBankAccount = (limit: number, page: number) => {
        this.props.getBankAccounts({ limit, page: page + 1 });
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        bankAccount: selectBankAccounts(state),
        loading: selectBankAccountsLoading(state),
        depositTotal: selectBankAccountsTotalNumber(state),
        page: selectBankAccountsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBankAccounts: params => dispatch(getBankAccounts(params)),
        addBankAccounts: params => dispatch(addBankAccounts(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const BankAccount = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(BankAccountScreen as any)));
