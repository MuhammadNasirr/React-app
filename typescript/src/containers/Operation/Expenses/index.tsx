import {
    Grid,
    Paper,
} from '@material-ui/core';
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
} from '../../../api/config';
import {
    FilterDrawer
} from '../../../components';
import {
    InfoTable
} from '../../../components/InfoTable/InfoTable';
import {
    alertPush,
    AppState,
    ExpensesDataInterface,
    getExpenses,
    selectExpenses,
    selectExpensesCurrentPage,
    selectExpensesLoading,
    selectExpensesTotalNumber,
} from '../../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    loading: boolean;
    total: number;
    page: number;
    expenses: ExpensesDataInterface[];
}

interface DispatchProps {
    getExpenses: typeof getExpenses;
    alertPush: typeof alertPush;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
    drawerOpen: boolean;
    // tslint:disable-next-line:no-any
    handleCloseFilterDrawer: any;
    // tslint:disable-next-line:no-any
    handleCloseFilterDrawerCLick: any;
}

interface ExpensesState {
    page: number;
    rowsPerPage: number;
    FilterDrawerState: [
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
        { key: string, value: string },
    ];
    selectedStartDate?: string | null;
    selectedEndDate?: string | null;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class ExpensesScreen extends React.Component<Props, ExpensesState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            selectedStartDate: null,
            selectedEndDate: null,
            FilterDrawerState: [
                { key: 'Reference type', value: '' },
                { key: 'Ref ID', value: '' },
                { key: 'Code', value: '' },
                { key: 'Currency', value: '' },
            ]
        };
    }

    private expensesRows = [
        { key: 'id', alignRight: false, label: 'Revenues ID' },
        { key: 'code', alignRight: false, label: 'Code' },
        { key: 'currency', alignRight: false, label: 'Currency ID' },
        { key: 'rid', alignRight: true, label: 'Ref ID' },
        { key: 'reference_type', alignRight: true, label: 'Ref type' },
        { key: 'credit', alignRight: true, label: 'Credit' },
        { key: 'debit', alignRight: true, label: 'Debit' },
        { key: 'created_at', alignRight: true, label: 'Date' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getExpenses({ page: page + 1, limit: rowsPerPage, ordering: 'desc' });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            selectedStartDate,
            selectedEndDate,
            FilterDrawerState,
        } = this.state;
        const {
            expenses,
            loading,
            total,
            drawerOpen,
            handleCloseFilterDrawer,
            handleCloseFilterDrawerCLick
        } = this.props;

        return (
            <React.Fragment>
                {!loading
                    ? (
                        <Grid container={true} spacing={24} direction={'row'}>
                            <Grid item={true} xs={12} lg={12}>
                                <Paper style={{ marginBottom: 15 }}>
                                    <InfoTable
                                        data={expenses}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.expensesRows}
                                        dataLength={total}
                                        hidePagination={false}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }
                <FilterDrawer
                    closeFilterDrawer={handleCloseFilterDrawer}
                    open={drawerOpen}
                    handleChange={this.handleChange}
                    handleClose={handleCloseFilterDrawerCLick}
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
        FilterDrawerState[3].value = '';
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

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetExpenses(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetExpenses(rows, 0);
    };

    private handleGetExpenses = (limit: number, page: number) => {
        this.props.getExpenses({ limit, page: page + 1, ordering: 'desc' });
    }

    private handleGetFilterAdjustments = () => {
        const { FilterDrawerState, rowsPerPage, page, selectedStartDate, selectedEndDate } = this.state;
        this.props.getExpenses({
            limit: rowsPerPage,
            page: page + 1,
            ordering: 'desc',
            reference_type: FilterDrawerState[0].value,
            rid: FilterDrawerState[1].value,
            code: FilterDrawerState[2].value,
            currency: FilterDrawerState[3].value,
            from: selectedStartDate !== null ? selectedStartDate : '',
            to: selectedEndDate !== null ? selectedEndDate : '',
        });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        expenses: selectExpenses(state),
        loading: selectExpensesLoading(state),
        total: selectExpensesTotalNumber(state),
        page: selectExpensesCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getExpenses: params => dispatch(getExpenses(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

const ExpensesPage = connect(mapStateToProps, mapDispatchToProps)(ExpensesScreen);

// tslint:disable-next-line:no-any
export const Expenses = withRouter(ExpensesPage);
