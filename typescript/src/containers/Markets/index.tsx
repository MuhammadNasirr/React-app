import {
    createStyles,
    Fab,
    Grid,
    Paper,
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
    alertPush,
    AppState,
    getMarkets,
    MarketsDataInterface,
    selectMarkets,
    selectMarketsCurrentPage,
    selectMarketsLoading,
    selectMarketsTotalNumber
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    total: number;
    page: number;
    markets: MarketsDataInterface[];
}

interface DispatchProps {
    getMarkets: typeof getMarkets;
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


interface MarketState {
    page: number;
    rowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class MarketsScreen extends React.Component<Props, MarketState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    private marketsRows = [
        { key: 'id', alignRight: false, label: 'Market ID' },
        { key: 'price_precision', alignRight: false, label: 'Prce precision' },
        { key: 'amount_precision', alignRight: false, label: 'Amount precision' },
        { key: 'min_price', alignRight: false, label: 'Min price' },
        { key: 'max_price', alignRight: true, label: 'Max price' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'state', alignRight: true, label: 'Status' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getMarkets({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage
        } = this.state;
        const {
            classes,
            loading,
            total,
            markets
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true}>
                        Markets
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
                                        data={markets}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.marketsRows}
                                        dataLength={total}
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
            </React.Fragment>
        );
    }

    private handleGoToCreatePage = () => {
        this.props.history.push(`${this.props.location.pathname}/add`);
    };

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${this.props.location.pathname}/${event.id}/info`, { id: event.id });
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetMarkets(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetMarkets(rows, 0);
    };

    private handleGetMarkets = (limit: number, page: number) => {
        this.props.getMarkets({ limit, page: page + 1 });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        markets: selectMarkets(state),
        loading: selectMarketsLoading(state),
        total: selectMarketsTotalNumber(state),
        page: selectMarketsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getMarkets: params => dispatch(getMarkets(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Markets = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(MarketsScreen as any)));

