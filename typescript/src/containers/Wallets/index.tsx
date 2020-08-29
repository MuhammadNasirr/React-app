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
    CurrenciesDataInterface,
    getWallets,
    selectCurrencies,
    selectWallets,
    selectWalletsCurrentPage,
    selectWalletsLoading,
    selectWalletsTotalNumber,
    WalletsDataInterface,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    walletsTotal: number;
    page: number;
    wallets: WalletsDataInterface[];
    currencies: CurrenciesDataInterface[];
}

interface DispatchProps {
    getWallets: typeof getWallets;
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


interface WalletsState {
    open: boolean;
    currency: string;
    amount: number;
    uid: string;
    page: number;
    rowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class WalletsScreen extends React.Component<Props, WalletsState> {
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

    private walletsRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'currency', alignRight: false, label: 'Code' },
        { key: 'kind', alignRight: false, label: 'Kind' },
        { key: 'name', alignRight: false, label: 'Name' },
        { key: 'address', alignRight: true, label: 'Address' },
        { key: 'max_balance', alignRight: true, label: 'Max Balance' },
        { key: 'status', alignRight: true, label: 'Status' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getWallets({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage
        } = this.state;
        const {
            classes,
            wallets,
            loading,
            walletsTotal,
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true}>
                            Wallets
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
                                        data={wallets}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.walletsRows}
                                        dataLength={walletsTotal}
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
        this.props.history.push(`${this.props.location.pathname}/${event.id}/edit`, { id: event.id });
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handlegetWallets(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handlegetWallets(rows, 0);
    };

    private handlegetWallets = (limit: number, page: number) => {
        this.props.getWallets({ limit, page: page + 1 });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        wallets: selectWallets(state),
        currencies: selectCurrencies(state),
        loading: selectWalletsLoading(state),
        walletsTotal: selectWalletsTotalNumber(state),
        page: selectWalletsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getWallets: params => dispatch(getWallets(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Wallets = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(WalletsScreen as any)));

