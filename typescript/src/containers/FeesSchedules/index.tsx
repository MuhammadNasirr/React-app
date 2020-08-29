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
    addFees,
    alertPush,
    AppState,
    deleteFees,
    editFees,
    FeesDataInterface,
    getFees,
    selectFees,
    selectFeesCurrentPage,
    selectFeesLoading,
    selectFeesTotalNumber,
} from '../../modules';

interface ReduxProps {
    loading: boolean;
    total: number;
    page: number;
    fees: FeesDataInterface[];
}

interface DispatchProps {
    getFees: typeof getFees;
    addFees: typeof addFees;
    editFees: typeof editFees;
    deleteFees: typeof deleteFees;
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
    title: {
        paddingBottom: 0,
        fontWeight: 600,
        letterpacing: '0.1px',
    },
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


interface FeesScheduleState {
    page: number;
    rowsPerPage: number;
    open: boolean;
    mode: number;
    id: number;
    group: string;
    market_id: string;
    maker: string;
    taker: string;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class FeesSchedulesScreen extends React.Component<Props, FeesScheduleState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            open: false,
            mode: 0,
            id: 0,
            group: '',
            market_id: 'any',
            maker: '',
            taker: ''
        };
    }

    private feeRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'group', alignRight: false, label: 'Group' },
        { key: 'market_id', alignRight: false, label: 'Market' },
        { key: 'maker', alignRight: true, label: 'Maker Fee' },
        { key: 'taker', alignRight: true, label: 'Taker Fee' },
    ];

    private markets = [
        {
            value: 'any',
            key: 'any',
        },
        {
            value: 'trstbtc',
            key: 'trstbtc',
        },
        {
            value: 'btcusd',
            key: 'btcusd',
        },
        {
            value: 'ethusd',
            key: 'ethusd',
        },
        {
            value: 'fthusd',
            key: 'fthusd',
        }
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getFees({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            open,
            mode,
            group,
            market_id,
            maker,
            taker
        } = this.state;
        const {
            classes,
            fees,
            total,
            loading
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true} className={classes.title}>
                            Fees Schedules
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={this.handleOpenCreateModal}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
                {!loading
                    ? (
                        <Grid container={true} spacing={24} direction={'row'} style={{ marginBottom: 15, marginTop: 15 }}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper>
                                    <InfoTable
                                        data={fees}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.feeRows}
                                        dataLength={total}
                                        hidePagination={false}
                                        withActions={true}
                                        handleEdit={this.handleOpenEditModal}
                                        handleDelete={this.handleDeleteFee}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }

                <ModalBox
                    open={open}
                    mode={mode}
                    label={`${!mode ? 'Create' : 'Edit'} Fees Schedule`}
                    handleClose={this.handleCloseModal}
                    handleCreate={this.handleCreateFee}
                    handleEdit={this.handleEditFee}
                >
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Name"
                            name="group"
                            value={group}
                            onChange={this.handleChangeGroup}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            select={true}
                            label="Market ID"
                            name="market_id"
                            value={market_id}
                            onChange={this.handleChangeMarketID}
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
                            {this.markets.map(option => (<option key={option.key} value={option.key}>{option.value}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Maker fee"
                            name="maker_fee"
                            value={maker}
                            onChange={this.handleChangeMakerFee}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Taker fee"
                            name="taker_fee"
                            value={taker}
                            onChange={this.handleChangeTakerFee}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </ModalBox>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChangeGroup = (e: any) => {
        this.setState({ group: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeMarketID = (e: any) => {
        this.setState({ market_id: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeMakerFee = (e: any) => {
        this.setState({ maker: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeTakerFee = (e: any) => {
        this.setState({ taker: e.target.value });
    };

    private handleCloseModal = (): void => {
        this.setState({ open: false });
    };

    // tslint:disable-next-line:no-any
    private handleOpenEditModal = (e: any): void => {
        this.setState({
            id: e.id,
            group: e.group,
            market_id: e.market_id,
            maker: e.maker,
            taker: e.taker,
            open: true,
            mode: 1
        });
    };

    private handleOpenCreateModal = (): void => {
        this.setState({ open: true, mode: 0 });
        this.setState({
            id: 0,
            group: '',
            market_id: 'any',
            maker: '',
            taker: '',
            open: true,
            mode: 0
        });
    };

    private handleCreateFee = (): void => {
        const { group, market_id, maker, taker } = this.state;
        const data = { group, market_id, maker, taker };
        this.props.addFees(data);
    };

    private handleEditFee = (): void => {
        const { id, group, market_id, maker, taker } = this.state;
        const data = { id, group, market_id, maker, taker };
        this.props.editFees(data);
    };

    private handleDeleteFee = (id: number): void => {
        const data = { id };
        this.props.deleteFees(data);
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetFees(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetFees(rows, 0);
    };

    private handleGetFees = (limit: number, page: number) => {
        this.props.getFees({ limit, page: page + 1 });
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        fees: selectFees(state),
        loading: selectFeesLoading(state),
        total: selectFeesTotalNumber(state),
        page: selectFeesCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getFees: params => dispatch(getFees(params)),
        addFees: params => dispatch(addFees(params)),
        editFees: params => dispatch(editFees(params)),
        deleteFees: params => dispatch(deleteFees(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const FeesSchedules = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(FeesSchedulesScreen as any)));

