import {
    Button,
    createStyles,
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
import {
    localeDate,
} from '../../helpers';
import {
    actionBankAccounts,
    alertPush,
    AppState,
    BankAccountsDetailsDataInterface,
    getBankAccountsDetails,
    selectBankAccountsDetails,
    selectBankAccountsDetailsLoading,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    bankAccountsDetails: BankAccountsDetailsDataInterface;
}

interface DispatchProps {
    getBankAccountsDetails: typeof getBankAccountsDetails;
    actionBankAccounts: typeof actionBankAccounts;
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

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class BankAccountsDetailScreen extends React.Component<Props> {

    public componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getBankAccountsDetails({ id });
    }

    public render() {
        const {
            classes,
            loading,
            bankAccountsDetails
        } = this.props;

        return (
            <React.Fragment>
                {
                    !loading ?
                        <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                            <Typography variant="h6" gutterBottom={true}>
                                Bank Account Details
                            </Typography>
                            <Grid container={true} style={{ marginTop: 15 }} spacing={16}>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {bankAccountsDetails[0].id}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        State
                                    </Typography>
                                    <Typography variant="body1">
                                        {bankAccountsDetails[0].state}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        created
                                    </Typography>
                                    <Typography variant="body1">
                                        {localeDate(bankAccountsDetails[0].created_at, 'fullDate')}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Updated
                                    </Typography>
                                    <Typography variant="body1">
                                        {localeDate(bankAccountsDetails[0].updated_at, 'fullDate')}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Bank
                                    </Typography>
                                    <Typography variant="body1">
                                        {bankAccountsDetails[0].bank}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Beneficiary
                                    </Typography>
                                    <Typography variant="body1">
                                        {bankAccountsDetails[0].beneficiary}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Clabe Code
                                    </Typography>
                                    <Typography variant="body1">
                                        {bankAccountsDetails[0].clabe_code}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {
                                bankAccountsDetails[0].state !== 'deleted' &&
                                <Grid container={true} style={{ marginTop: 15 }} justify={'flex-end'} spacing={16}>
                                    <Grid item={true}>
                                        <Button className={classes.button} variant="contained" size="small" onClick={e => this.handleReject('deleted', bankAccountsDetails[0].id)}>
                                            Reject
                                    </Button>
                                    </Grid>
                                    <Grid item={true}>
                                        <Button variant="contained" size="small" color="primary" onClick={e => this.handleAccept(bankAccountsDetails[0].state === 'active' ? 'disabled' : 'active', bankAccountsDetails[0].id)}>
                                            {bankAccountsDetails[0].state === 'active' ? 'Disabled' : 'Active'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </Paper>
                        : 'Loading'
                }
            </React.Fragment>
        );
    }

    private handleAccept = (action: string, id: number) => {
        const data = { action, id };
        this.props.actionBankAccounts(data);
    }

    private handleReject = (action: string, id: number) => {
        const data = { action, id };
        this.props.actionBankAccounts(data);
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        bankAccountsDetails: selectBankAccountsDetails(state),
        loading: selectBankAccountsDetailsLoading(state)
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBankAccountsDetails: params => dispatch(getBankAccountsDetails(params)),
        actionBankAccounts: params => dispatch(actionBankAccounts(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const BankAccountDetails = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(BankAccountsDetailScreen as any)));

