import {
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
    tablePageLimit,
} from '../../api/config';
import {
    InfoTable
} from '../../components/InfoTable/InfoTable';
import {
    alertPush,
    AppState,
    getTrades,
    selectTrades,
    selectTradesCurrentPage,
    selectTradesLoading,
    selectTradesTotalNumber,
    TradesDataInterface,
} from '../../modules';

interface ReduxProps {
    loading: boolean;
    total: number;
    page: number;
    trades: TradesDataInterface[];
}

interface DispatchProps {
    getTrades: typeof getTrades;
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '75%',
    },
    menu: {
        width: 200,
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#3598D5',
        letterSpacing: '0.44px',
    },
    arrow: {
        color: '#979797',
        paddingTop: '3px',
        margin: '0 10px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 24px 24px 0',
        fontWeight: 600,
    },
    label: {
        height: 32,
        paddingLeft: 16,
        borderRadius: 24,
        width: 'auto',
        cursor: 'pointer',
        letterSpacing: '0.15px',
        fontWeight: 600,
    },
    icon: {
        width: 20,
        height: 20,
        margin: '7px 4px',
        cursor: 'pointer',
        opacity: 0.6,
    },
    labelName: {
        paddingTop: 5,
        color: '#ffffff',
        fontSize: 14,
        marginRight: 7,
        letterSpacing: '0.25px',
    },
    paper: {
        padding: '20px 24px 24px 24px',
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        letterSpacing: '0.15px',
        fontWeight: 600,
        paddingLeft: 26,
        paddingTop: 26,
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}


interface TradeState {
    page: number;
    rowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class TradeScreen extends React.Component<Props, TradeState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    private tradeRows = [
        { key: 'id', alignRight: false, label: 'Trade ID' },
        { key: 'maker_order_email', alignRight: false, label: 'Maker order email' },
        { key: 'taker_order_email', alignRight: false, label: 'Taker order email' },
        { key: 'maker_uid', alignRight: true, label: 'Maker UID' },
        { key: 'taker_uid', alignRight: true, label: 'Taker UID' },
        { key: 'market', alignRight: true, label: 'Market' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'amount', alignRight: true, label: 'Amount' },
        { key: 'total', alignRight: true, label: 'Total' },
        { key: 'taker_type', alignRight: true, label: 'Side' },
        { key: 'created_at', alignRight: true, label: 'Trade time' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getTrades({ page: page + 1, limit: rowsPerPage, ordering: 'desc' });
    }

    public render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const {
            trades,
            total,
            loading,
        } = this.props;


        return (
            <React.Fragment>
                <div>
                    <Typography variant="h6" gutterBottom={true}>
                        Trades
                    </Typography>
                    {!loading
                        ? (
                            <Grid container={true} spacing={24} direction={'row'}>
                                <Grid item={true} xs={12} lg={12}>
                                    <Paper style={{ marginBottom: 15 }}>
                                        <InfoTable
                                            data={trades}
                                            page={page}
                                            rowsPerPage={rowsPerPage}
                                            handleChangePage={this.handleChangePage}
                                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            rows={this.tradeRows}
                                            dataLength={total}
                                            hidePagination={false}
                                            withActions={false}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        ) : 'Loading'
                    }
                </div>
            </React.Fragment>
        );
    }

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetTrades(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetTrades(rows, 0);
    };

    private handleGetTrades = (limit: number, page: number) => {
        this.props.getTrades({ page: page + 1, limit, ordering: 'desc' });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        trades: selectTrades(state),
        loading: selectTradesLoading(state),
        total: selectTradesTotalNumber(state),
        page: selectTradesCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getTrades: params => dispatch(getTrades(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Trade = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(TradeScreen as any)));

