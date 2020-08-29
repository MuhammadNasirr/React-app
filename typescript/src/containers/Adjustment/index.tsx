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
import FilterIcon from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import { History } from 'history';
import { Moment } from 'moment';
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
    FilterDrawer
} from '../../components';
import {
    InfoTable
} from '../../components/InfoTable/InfoTable';
import {
    addDeposit,
    AdjustmentsDataInterface,
    alertPush,
    AppState,
    CurrenciesDataInterface,
    getAdjustments,
    getCurrencies,
    selectAdjustments,
    selectAdjustmentsCurrentPage,
    selectAdjustmentsLoading,
    selectAdjustmentsTotalNumber,
    selectCurrencies,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    depositTotal: number;
    page: number;
    adjustments: AdjustmentsDataInterface[];
    currencies: CurrenciesDataInterface[];
}

interface DispatchProps {
    getAdjustments: typeof getAdjustments;
    addDeposit: typeof addDeposit;
    getCurrencies: typeof getCurrencies;
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


interface AdjustmentState {
    page: number;
    rowsPerPage: number;
    FilterDrawerState: [
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
    ];
    selectedStartDate?: string | null;
    selectedEndDate?: string | null;
    drawerOpen: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class AdjustmentScreen extends React.Component<Props, AdjustmentState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            selectedStartDate: null,
            selectedEndDate: null,
            drawerOpen: false,
            FilterDrawerState: [
                { key: 'Currency', value: '' },
                { key: 'State', value: '' },
                { key: 'Category', value: '' },
            ]
        };
    }

    private adjustmentRows = [
        { key: 'id', alignRight: false, label: 'ID' },
        { key: 'reason', alignRight: false, label: 'Reason' },
        { key: 'amount', alignRight: false, label: 'Amount' },
        { key: 'state', alignRight: true, label: 'State' },
        { key: 'currency', alignRight: false, label: 'Currency' },
        { key: 'category', alignRight: true, label: 'Category' },
        { key: 'creator_uid', alignRight: true, label: 'Creator ID' },
        { key: 'receiving_account_code', alignRight: true, label: 'Receiving Account' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getAdjustments({ page: page + 1, limit: rowsPerPage, ordering: 'desc' });
        this.props.getCurrencies({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            selectedStartDate,
            selectedEndDate,
            FilterDrawerState,
            drawerOpen
        } = this.state;
        const {
            classes,
            adjustments,
            loading,
            depositTotal,
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true}>
                            Adjustments
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={this.handleGoToCreatePage}>
                            <AddIcon />
                        </Fab>
                        <Fab size="small" color="primary" aria-label="add" className={classnames(classes.ml10, classes.button)} onClick={this.handleOpenFilterDrawer}>
                            <FilterIcon />
                        </Fab>
                    </Grid>
                </Grid>
                {!loading ?
                    (
                        <Grid container={true} spacing={24} direction={'row'} style={{ marginBottom: 15, marginTop: 15 }}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={adjustments}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleDepositChangePage}
                                        handleChangeRowsPerPage={this.handleDepositChangeRowsPerPage}
                                        rows={this.adjustmentRows}
                                        dataLength={depositTotal}
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
                <FilterDrawer
                    closeFilterDrawer={this.handleCloseFilterDrawer}
                    open={drawerOpen}
                    handleChange={this.handleChange}
                    handleClose={this.handleCloseFilterDrawerCLick}
                    list={FilterDrawerState}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleFilter={this.handleGetFilterAdjustments}
                    handleReset={this.handleReset}
                />
            </React.Fragment>
        );
    }

    // tslint:disable:no-any
    private handleChange = (key: number, name: string, e: any) => {
        const { FilterDrawerState } = this.state;
        FilterDrawerState[key].value = e;
        this.setState({ FilterDrawerState });
    };
    private handleReset = () => {
        const { FilterDrawerState } = this.state;
        FilterDrawerState[0].value = '';
        FilterDrawerState[1].value = '';
        FilterDrawerState[2].value = '';
        this.setState({ FilterDrawerState, selectedEndDate: null, selectedStartDate: null });
    };

    private handleStartDateChange = (date: Moment) => {
        this.setState({
            selectedStartDate: date.format(),
        });
    };

    private handleEndDateChange = (date: Moment) => {
        this.setState({
            selectedEndDate: date.format(),
        });
    };

    private handleOpenFilterDrawer = (): void => {
        this.setState({ drawerOpen: true });
    };

    private handleCloseFilterDrawerCLick = (): void => {
        this.setState({ drawerOpen: false });
    };

    private handleCloseFilterDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        this.setState({ drawerOpen: open });
    };

    private handleGoToCreatePage = () => {
        this.props.history.push(`${this.props.location.pathname}/add`);
    };

    // tslint:disable-next-line:no-any
    private handleGoToDetailsPage = (event: any) => {
        this.props.history.push(`${this.props.location.pathname}/${event.id}`, { id: event.id });
    };

    private handleDepositChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetDeposits(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleDepositChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetDeposits(rows, 0);
    };

    private handleGetDeposits = (limit: number, page: number) => {
        this.props.getAdjustments({ limit, page: page + 1, ordering: 'desc' });
    }

    private handleGetFilterAdjustments = () => {
        const { FilterDrawerState, rowsPerPage, page, selectedStartDate, selectedEndDate } = this.state;
        this.props.getAdjustments({
            limit: rowsPerPage,
            page: page + 1,
            ordering: 'desc',
            currency: FilterDrawerState[0].value,
            state: FilterDrawerState[1].value,
            category: FilterDrawerState[2].value,
            from: selectedStartDate !== null ? selectedStartDate : '',
            to: selectedEndDate !== null ? selectedEndDate : '',
        });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        adjustments: selectAdjustments(state),
        currencies: selectCurrencies(state),
        loading: selectAdjustmentsLoading(state),
        depositTotal: selectAdjustmentsTotalNumber(state),
        page: selectAdjustmentsCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getAdjustments: params => dispatch(getAdjustments(params)),
        addDeposit: params => dispatch(addDeposit(params)),
        getCurrencies: params => dispatch(getCurrencies(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Adjustment = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AdjustmentScreen as any)));
