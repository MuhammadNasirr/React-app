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
    BlockchainsDataInterface,
    getBlockchains,
    selectBlockchains,
    selectBlockchainsCurrentPage,
    selectBlockchainsLoading,
    selectBlockchainsTotalNumber,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    blockchainsTotal: number;
    page: number;
    blockchains: BlockchainsDataInterface[];
}

interface DispatchProps {
    getBlockchains: typeof getBlockchains;
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


interface BlockchainsState {
    open: boolean;
    currency: string;
    amount: number;
    uid: string;
    page: number;
    rowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class BlockchainsScreen extends React.Component<Props, BlockchainsState> {
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

    private blockchainsRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'key', alignRight: false, label: 'Key' },
        { key: 'name', alignRight: false, label: 'Name' },
        { key: 'client', alignRight: false, label: 'Client' },
        { key: 'height', alignRight: true, label: 'Height' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'status', alignRight: true, label: 'Status' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getBlockchains({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage
        } = this.state;
        const {
            classes,
            blockchains,
            loading,
            blockchainsTotal,
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true}>
                            Blockchains
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
                                        data={blockchains}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleBlockchainsChangePage}
                                        handleChangeRowsPerPage={this.handleBlockchainsChangeRowsPerPage}
                                        rows={this.blockchainsRows}
                                        dataLength={blockchainsTotal}
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

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${this.props.location.pathname}/${event.id}/edit`, { id: event.id });
    };

    private handleGoToCreatePage = () => {
        this.props.history.push(`${this.props.location.pathname}/add`);
    };

    private handleBlockchainsChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetBlockchains(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleBlockchainsChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetBlockchains(rows, 0);
    };

    private handleGetBlockchains = (limit: number, page: number) => {
        this.props.getBlockchains({ limit, page: page + 1 });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        blockchains: selectBlockchains(state),
        loading: selectBlockchainsLoading(state),
        blockchainsTotal: selectBlockchainsTotalNumber(state),
        page: selectBlockchainsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBlockchains: params => dispatch(getBlockchains(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Blockchains = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(BlockchainsScreen as any)));

