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
    actionAdjustment,
    AdjustmentDetailsDataInterface,
    alertPush,
    AppState,
    getAdjustmentDetails,
    selectAdjustmentDetails,
    selectAdjustmentDetailsLoading,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    adjustmentDetails: AdjustmentDetailsDataInterface;
}

interface DispatchProps {
    getAdjustmentDetails: typeof getAdjustmentDetails;
    actionAdjustment: typeof actionAdjustment;
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

class AdjustmentDetailScreen extends React.Component<Props> {

    public componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getAdjustmentDetails({ id });
    }

    public render() {
        const {
            classes,
            loading,
            adjustmentDetails
        } = this.props;

        return (
            <React.Fragment>
                {
                    !loading ?
                        <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                            <Typography variant="h6" gutterBottom={true}>
                                Adjustment Details
                            </Typography>
                            <Grid container={true} style={{ marginTop: 15 }} spacing={16}>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Reason
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.id}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        State
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.state}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        created
                                    </Typography>
                                    <Typography variant="body1">
                                        {localeDate(adjustmentDetails.created_at, 'fullDate')}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Updated
                                    </Typography>
                                    <Typography variant="body1">
                                        {localeDate(adjustmentDetails.updated_at, 'fullDate')}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Currency ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.currency}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Category
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.category}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Amount
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.amount}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Asset code
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.asset_account_code}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Receiving code
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.receiving_account_code}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Receiver ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.receiving_member_uid}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Creator ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.creator_uid}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Receiver ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.receiving_member_uid}
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="caption">
                                        Validator ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.validator_uid || '-'}
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Typography variant="caption">
                                        Description
                                    </Typography>
                                    <Typography variant="body1">
                                        {adjustmentDetails.description || '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {
                                adjustmentDetails.state === 'pending' &&
                                <Grid container={true} style={{ marginTop: 15 }} justify={'flex-end'} spacing={16}>
                                    <Grid item={true}>
                                        <Button className={classes.button} variant="contained" size="small" onClick={e => this.handleReject('reject', adjustmentDetails.id)}>
                                            Reject
                                    </Button>
                                    </Grid>
                                    <Grid item={true}>
                                        <Button variant="contained" size="small" color="primary" onClick={e => this.handleAccept('accept', adjustmentDetails.id)}>
                                            Accept
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
        this.props.actionAdjustment(data);
    }

    private handleReject = (action: string, id: number) => {
        const data = { action, id };
        this.props.actionAdjustment(data);
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        adjustmentDetails: selectAdjustmentDetails(state),
        loading: selectAdjustmentDetailsLoading(state)
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getAdjustmentDetails: params => dispatch(getAdjustmentDetails(params)),
        actionAdjustment: params => dispatch(actionAdjustment(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const AdjustmentDetail = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AdjustmentDetailScreen as any)));

