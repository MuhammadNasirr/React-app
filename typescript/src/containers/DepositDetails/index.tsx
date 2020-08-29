import {
    Button,
    createStyles,
    Divider,
    Grid,
    Paper,
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
import { GoBack } from '../../components';
import {
    localeDate,
} from '../../helpers';
import {
    actionDeposit,
    alertPush,
    AppState,
    DepositDetailsDataInterface,
    getDepositDetails,
    selectDepositDetails,
    selectDepositDetailsLoading,
    selectDepositDetailsProcess
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    actionLoading: boolean;
    depositDetails: DepositDetailsDataInterface;
}

interface DispatchProps {
    getDepositDetails: typeof getDepositDetails;
    actionDeposit: typeof actionDeposit;
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

interface DepositDetailState {
    mxn: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class DepositDetailScreen extends React.Component<Props, DepositDetailState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            mxn: false
        };
    }
    public componentDidMount() {
        const tid = this.props.match.params.tid;
        const mxn = this.props.history.location.state.mxn;
        if (mxn) {
            this.setState({ mxn: true });
            this.props.getDepositDetails({ tid, mxn });
        } else {
            this.props.getDepositDetails({ tid });
        }
    }

    public render() {
        const {
            classes,
            loading,
            depositDetails,
            actionLoading
        } = this.props;

        return (
            <React.Fragment>
                <GoBack history={history} />
                {
                    !loading ?
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
                                                        {depositDetails.uid}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        State
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {depositDetails && depositDetails.state}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Price
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {depositDetails && depositDetails.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Created
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {localeDate(depositDetails && depositDetails.created_at, 'fullDate')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Total
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {depositDetails && depositDetails.total}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Amount
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {depositDetails && depositDetails.amount}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Source Currency
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {depositDetails && depositDetails.currency_src}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="caption">
                                                        Destination Currency
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {depositDetails && depositDetails.currency_dst}
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                                                    <Divider />
                                                </Grid>
                                                {
                                                    depositDetails && depositDetails.state === 'pending' &&
                                                    <Grid container={true}>
                                                        <Grid item={true} direction="row" xs={12} sm={12} md={12} lg={12}>
                                                            <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px', backgroundColor: '#E23328', marginLeft: 20, marginRight: 10 }} disabled={actionLoading} onClick={e => this.handleRejectDeposit(depositDetails.price)}>
                                                                Reject
                                                            </Button>
                                                            <Button variant="raised" size="small" color="primary" style={{ float: 'right', width: '100px' }} disabled={actionLoading} onClick={e => this.handleFiatProcessDeposit(depositDetails.price)}>
                                                                Process
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Paper>
                                    </React.Fragment>
                                    :
                                    <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                                        <Typography variant="h6" gutterBottom={true}>
                                            Deposit Details
                            </Typography>
                                        <Grid container={true} style={{ marginTop: 15 }} spacing={16}>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    UID
                                    </Typography>
                                                <Typography variant="body1">
                                                    {depositDetails.uid}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Date
                                    </Typography>
                                                <Typography variant="body1">
                                                    {localeDate(depositDetails.created_at, 'fullDate')}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Member
                                    </Typography>
                                                <Typography variant="body1">
                                                    {depositDetails.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    State
                                    </Typography>
                                                <Typography variant="body1">
                                                    {depositDetails.state}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                                <Typography variant="caption">
                                                    Amount
                                    </Typography>
                                                <Typography variant="body1">
                                                    {depositDetails.amount}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {
                                            depositDetails.state === 'submitted' &&
                                            <Grid container={true} style={{ marginTop: 15 }} justify={'flex-end'} spacing={16}>
                                                <Grid item={true}>
                                                    <Button className={classes.button} variant="contained" size="small" onClick={e => this.handleReject('reject', depositDetails.id)}>
                                                        Reject
                                    </Button>
                                                </Grid>
                                                <Grid item={true}>
                                                    <Button variant="contained" size="small" color="primary" onClick={e => this.handleAccept('accept', depositDetails.id)}>
                                                        Accept
                                    </Button>
                                                </Grid>
                                            </Grid>
                                        }
                                    </Paper>
                            }
                        </React.Fragment>
                        : 'Loading'
                }
            </React.Fragment>
        );
    }

    private handleAccept = (action: string, id: number) => {
        const data = { action: action, tid: this.props.match.params.tid, id: id };
        this.props.actionDeposit(data);
    }

    private handleReject = (action: string, id: number) => {
        const data = { action: action, tid: this.props.match.params.tid, id: id };
        this.props.actionDeposit(data);
    }

    private handleFiatProcessDeposit = (price: number | undefined) => {
        const id = Number(this.props.match.params.tid);
        const data = { id, mxn: this.state.mxn, action: 'completed', price };
        this.props.actionDeposit(data);
    }

    private handleRejectDeposit = (price: number | undefined) => {
        const id = Number(this.props.match.params.tid);
        const data = { action: 'rejected', id, mxn: this.state.mxn, price };
        this.props.actionDeposit(data);
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        depositDetails: selectDepositDetails(state),
        loading: selectDepositDetailsLoading(state),
        actionLoading: selectDepositDetailsProcess(state)
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getDepositDetails: params => dispatch(getDepositDetails(params)),
        actionDeposit: params => dispatch(actionDeposit(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const DepositDetail = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(DepositDetailScreen as any)));

