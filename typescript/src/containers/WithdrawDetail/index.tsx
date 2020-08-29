import {
    Button,
    createStyles,
    Divider,
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
    root,
    tablePageLimit
} from '../../api/config';
import {
    InfoTable
} from '../../components/InfoTable/InfoTable';
import {
    localeDate,
} from '../../helpers';
import {
    actionWithdraw,
    alertPush,
    AppState,
    getWithdrawals,
    getWithdrawDetails,
    MemberDetailsDataInterface,
    processWithdrawFiat,
    selectMemberDetails,
    selectWithdrawals,
    selectWithdrawalsCurrentPage,
    selectWithdrawalsTotalNumber,
    selectWithdrawDetails,
    selectWithdrawDetailsLoading,
    selectWithdrawDetailsProcess,
    WithdrawalsDataInterface,
    WithdrawDetailsDataInterface,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    actionLoading: boolean;
    total: number;
    page: number;
    withdrawDetails: WithdrawDetailsDataInterface;
    memberDetails: MemberDetailsDataInterface;
    withdrawals: WithdrawalsDataInterface[];
}

interface DispatchProps {
    getWithdrawals: typeof getWithdrawals;
    getWithdrawDetails: typeof getWithdrawDetails;
    actionWithdraw: typeof actionWithdraw;
    processWithdraw: typeof processWithdrawFiat;
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
    paper: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2
    },
    button: {
        backgroundColor: '#E23328',
        color: '#ffffff'
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}

interface WithdrawDetailsState {
    txid: string;
    page: number;
    rowsPerPage: number;
    mxn: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class WithdrawDetailScreen extends React.Component<Props, WithdrawDetailsState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            txid: '',
            page: 0,
            rowsPerPage: tablePageLimit(),
            mxn: false
        };
    }

    private rows = [
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
        const id = this.props.match.params.id;
        const mxn = this.props.history.location.state.mxn;
        if (mxn) {
            this.setState({ mxn: true });
            this.props.getWithdrawDetails({ id, mxn });
        } else {
            this.props.getWithdrawDetails({ id });
        }
    }

    public render() {
        const {
            classes,
            loading,
            total,
            withdrawDetails,
            withdrawals,
            memberDetails,
            actionLoading
        } = this.props;
        const {
            page,
            rowsPerPage,
        } = this.state;
        return (
            <React.Fragment>
                {
                    !loading ?
                        (withdrawDetails.type === 'coin' && !this.state.mxn) ?
                            <Grid container={true} spacing={16}>
                                <Grid item={true} xs={12} sm={6} md={6} lg={6}>
                                    <Paper className={classes.paper} style={{ marginBottom: 15, height: '100%' }}>
                                        <Typography variant="h6" gutterBottom={true}>
                                            Member Info
                                        </Typography>
                                        <Grid container={true} direction="column" style={{ marginTop: 15 }} spacing={16}>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Email
                                            </Typography>
                                                <Typography variant="body1">
                                                    {memberDetails.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    UID
                                            </Typography>
                                                <Typography variant="body1">
                                                    {memberDetails.uid}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Created
                                            </Typography>
                                                <Typography variant="body1">
                                                    {localeDate(memberDetails.created_at, 'fullDate')}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="h6">
                                                    Account info: {withdrawDetails.currency && withdrawDetails.currency.toUpperCase()}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Total balance
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.currency && memberDetails.accounts && this.renderTotalBalance(withdrawDetails.currency, memberDetails.accounts)}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Locked
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.currency && memberDetails.accounts && this.renderLocked(withdrawDetails.currency, memberDetails.accounts)}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Available balance
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails && withdrawDetails.currency && memberDetails.accounts && this.renderAvailableBalance(withdrawDetails.currency, memberDetails.accounts)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12} sm={6} md={6} lg={6}>
                                    <Paper className={classes.paper} style={{ marginBottom: 15, height: '100%' }}>
                                        <Grid container={true} spacing={16}>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="h6" gutterBottom={true}>
                                                    Withdraw
                                            </Typography>
                                            </Grid>
                                            <Grid item={true} xs={3} sm={3} md={3} lg={3}>
                                                <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px', backgroundColor: '#E23328' }} onClick={e => this.handleRejectWithdraw()}>
                                                    Reject
                                            </Button>
                                            </Grid>
                                            <Grid item={true} xs={3} sm={3} md={3} lg={3}>
                                                <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px', }} onClick={e => this.handleProcessWithdraw()}>
                                                    Process
                                            </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid container={true} direction="column" style={{ marginTop: 15 }} spacing={16}>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    ID
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.uid}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    TxID
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.blockchain_txid}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Date
                                            </Typography>
                                                <Typography variant="body1">
                                                    {localeDate(withdrawDetails.created_at, 'fullDate')}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    State
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.state}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Email
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Recipient Address
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.rid}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Amount
                                            </Typography>
                                                <Typography variant="body1">
                                                    {withdrawDetails.amount}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container={true} direction="row" justify="space-between">
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <TextField
                                                    id="standard"
                                                    label="Txid"
                                                    margin="normal"
                                                    value={this.state.txid}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Button variant="raised" size="small" color="primary" style={{ float: 'right', marginTop: 30 }} onClick={e => this.handleLoadWithdraw()}>
                                                    Load withdraw
                                            </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                            :
                            <React.Fragment>
                                {
                                    this.state.mxn ?
                                        <React.Fragment>
                                            <Paper className={classes.paper} style={{ marginBottom: 15, height: '100%' }}>

                                                <Grid container={true} style={{ marginTop: 15 }} spacing={16}>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            UID
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails[0].uid}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            State
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails[0].state}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            Price
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails && withdrawDetails[0].price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            Created
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {localeDate(withdrawDetails[0].created_at, 'fullDate')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            Total
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails && withdrawDetails[0].total}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            Amount
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails[0].amount}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            Source Currency
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails[0].currency_src}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            Destination Currency
                                                    </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails[0].currency_dst}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                                                        <Divider />
                                                    </Grid>
                                                    {
                                                        withdrawDetails[0].state === 'pending' &&
                                                        <Grid container={true}>
                                                            <Grid item={true} direction="row" xs={12} sm={12} md={12} lg={12}>
                                                                <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px', backgroundColor: '#E23328', marginLeft: 20, marginRight: 10 }} disabled={actionLoading} onClick={e => this.handleRejectWithdraw()}>
                                                                    Reject
                                                            </Button>
                                                                <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px' }} disabled={actionLoading} onClick={e => this.handleFiatProcessWithdraw()}>
                                                                    Process
                                                            </Button>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                </Grid>
                                            </Paper>
                                            {
                                                withdrawDetails[0].beneficiary &&
                                                <Paper className={classes.paper} style={{ marginBottom: 15, height: '100%' }}>
                                                    <Typography variant="h5">
                                                        Bank Information
                                                    </Typography>
                                                    <Grid container={true} style={{ marginTop: 15 }} spacing={16}>
                                                        {/* <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                            <Typography variant="caption">
                                                                Beneficiary
                                                    </Typography>
                                                            <Typography style={{ fontWeight: 'bold' }} variant="body1">
                                                                OMIEX SAPI DE CV
                                                            </Typography>
                                                        </Grid> */}
                                                        <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                            <Typography variant="caption">
                                                                Bank
                                                    </Typography>
                                                            <Typography variant="body1">
                                                                {withdrawDetails[0].beneficiary && withdrawDetails[0].beneficiary.data.bank_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                            <Typography variant="caption">
                                                                CLABE Mexican Code
                                                    </Typography>
                                                            <Typography variant="body1">
                                                                {withdrawDetails[0].beneficiary && withdrawDetails[0].beneficiary.data.clabe_number}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                            <Typography variant="caption">
                                                                Full Name
                                                    </Typography>
                                                            <Typography variant="body1">
                                                                {withdrawDetails[0].beneficiary && withdrawDetails[0].beneficiary.data.full_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                            <Typography variant="caption">
                                                                Name
                                                    </Typography>
                                                            <Typography variant="body1">
                                                                {withdrawDetails && withdrawDetails[0].beneficiary && withdrawDetails[0].beneficiary.name}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            }
                                        </React.Fragment>
                                        :
                                        <Paper className={classes.paper} style={{ marginBottom: 15, height: '100%' }}>
                                            <Typography variant="body1">
                                                {withdrawDetails.email}
                                            </Typography>
                                            <Grid container={true} style={{ marginTop: 15 }} spacing={16}>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        State
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails.state}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Full name
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.beneficiary && withdrawDetails.beneficiary.data && withdrawDetails.beneficiary.data.full_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Created
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {localeDate(withdrawDetails.created_at, 'fullDate')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Address
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.beneficiary && withdrawDetails.beneficiary.data.address ? withdrawDetails.beneficiary.data.address : '-'}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        UID
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.uid}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Country
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.beneficiary && withdrawDetails.beneficiary.data.country ? withdrawDetails.beneficiary.data.country : '-'}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Amount
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails.amount}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Account number
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.account}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Currency
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.currency}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        RID
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {withdrawDetails && withdrawDetails.rid}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                                                    <Divider />
                                                </Grid>

                                                {withdrawDetails && withdrawDetails.beneficiary && Object.keys(withdrawDetails.beneficiary.data).map((key, i) =>
                                                    <Grid key={i} item={true} xs={6} sm={6} md={6} lg={6}>
                                                        <Typography variant="caption">
                                                            {key}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {withdrawDetails && withdrawDetails.beneficiary.data[key]}
                                                        </Typography>
                                                    </Grid>
                                                )}
                                                {
                                                    withdrawDetails.state === 'accepted' &&
                                                    <Grid container={true} spacing={16}>
                                                        <Grid item={true} xs={8} sm={8} md={8} lg={8}>
                                                            <Typography variant="h6" gutterBottom={true}>
                                                                {' '}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item={true} direction="row" xs={3} sm={2} md={2} lg={4}>
                                                            <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px', backgroundColor: '#E23328', marginLeft: 20, marginRight: 10 }} onClick={e => this.handleRejectWithdraw()}>
                                                                Reject
                                            </Button>
                                                            <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px' }} onClick={e => this.handleFiatProcessWithdraw()}>
                                                                Process
                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Paper>
                                }
                            </React.Fragment>

                        : 'Loading'
                }

                {
                    !this.state.mxn ?
                        <Grid container={true} spacing={24} direction={'row'}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={withdrawals && withdrawals}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.rows}
                                        dataLength={total}
                                        hidePagination={false}
                                        withDetails={true}
                                        handleGoToDetails={this.handleGoToDetailsPage}
                                    />
                                </Paper>
                            </Grid>
                        </Grid> : null
                }

            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private renderTotalBalance = (currency: string, accounts: any) => {
        const account = accounts.filter(x => x.currency === currency)[0];
        return (parseFloat(account.balance) + parseFloat(account.locked)).toFixed(8);
    }

    // tslint:disable-next-line:no-any
    private renderAvailableBalance = (currency: string, accounts: any) => {
        const account = accounts.filter(x => x.currency === currency)[0];
        return account.balance;
    }

    // tslint:disable-next-line:no-any
    private renderLocked = (currency: string, accounts: any) => {
        const account = accounts.filter(x => x.currency === currency)[0];
        return account.locked;
    }

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${root()}/accountings/withdrawals/${event.id}/details`, { id: event.id });
        const id = event.id;
        this.props.getWithdrawDetails({ id });
    };

    // tslint:disable-next-line:no-any
    private handleChange = (event: any) => {
        this.setState({ txid: event.target.value });
    }

    private handleLoadWithdraw = () => {
        const { txid } = this.state;
        const id = Number(this.props.match.params.id);
        const data = { action: 'load', id, txid };
        this.props.actionWithdraw(data);
    }

    private handleProcessWithdraw = () => {
        const id = Number(this.props.match.params.id);
        const data = { action: 'process', id };
        this.props.actionWithdraw(data);
    }

    private handleFiatProcessWithdraw = () => {
        const id = Number(this.props.match.params.id);
        const data = { id, mxn: this.state.mxn };
        this.props.processWithdraw(data);
    }

    private handleRejectWithdraw = () => {
        const id = Number(this.props.match.params.id);
        const data = { action: 'reject', id, mxn: this.state.mxn };
        this.props.actionWithdraw(data);
    }

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
        this.props.getWithdrawals({ limit, page: page + 1, type: 'coin' });
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        withdrawals: selectWithdrawals(state),
        withdrawDetails: selectWithdrawDetails(state),
        memberDetails: selectMemberDetails(state),
        loading: selectWithdrawDetailsLoading(state),
        actionLoading: selectWithdrawDetailsProcess(state),
        total: selectWithdrawalsTotalNumber(state),
        page: selectWithdrawalsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getWithdrawals: params => dispatch(getWithdrawals(params)),
        getWithdrawDetails: params => dispatch(getWithdrawDetails(params)),
        actionWithdraw: params => dispatch(actionWithdraw(params)),
        processWithdraw: params => dispatch(processWithdrawFiat(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const WithdrawDetail = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(WithdrawDetailScreen as any)));

