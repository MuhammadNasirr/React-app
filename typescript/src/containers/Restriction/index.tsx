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
    addRestriction,
    alertPush,
    AppState,
    deleteRestriction,
    editRestriction,
    getRestrictions,
    RestrictionDataInterface,
    selectRestrictionCurrentPage,
    selectRestrictionLoading,
    selectRestrictions,
    selectRestrictionTotalNumber,
} from '../../modules';

interface ReduxProps {
    loading: boolean;
    total: number;
    page: number;
    restrictions: RestrictionDataInterface[];
}

interface DispatchProps {
    getRestrictions: typeof getRestrictions;
    addRestriction: typeof addRestriction;
    editRestriction: typeof editRestriction;
    deleteRestriction: typeof deleteRestriction;
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


interface RestrictionState {
    page: number;
    rowsPerPage: number;
    open: boolean;
    mode: number;
    id: number;
    scope: string;
    value: string;
    state: string;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class RestrictionScreen extends React.Component<Props, RestrictionState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            open: false,
            mode: 0,
            id: 0,
            scope: 'ip',
            value: '',
            state: 'disabled'
        };
    }

    private restrictionRows = [
        { key: 'scope', alignRight: false, label: 'Scope' },
        { key: 'value', alignRight: false, label: 'Value' },
        { key: 'created_at', alignRight: false, label: 'Created' },
        { key: 'updated_at', alignRight: true, label: 'Updated' },
        { key: 'state', alignRight: true, label: 'State' },
    ];

    private scopes = [
        {
            value: 'ip',
            key: 'ip',
        },
        {
            value: 'ip_subnet',
            key: 'ip_subnet',
        },
        {
            value: 'country',
            key: 'country',
        }
    ];

    private states = [
        {
            value: 'enabled',
            key: 'enabled',
        },
        {
            value: 'disabled',
            key: 'disabled',
        }
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage
        } = this.state;
        this.props.getRestrictions({ page: page + 1, limit: rowsPerPage });
    }

    public render() {
        const {
            page,
            rowsPerPage,
            open,
            mode,
            scope,
            value,
            state
        } = this.state;
        const {
            classes,
            restrictions,
            total,
            loading
        } = this.props;

        return (
            <React.Fragment>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography variant="h6" gutterBottom={true} className={classes.title}>
                            Restrictions
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
                                        data={restrictions}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleChangePage={this.handleChangePage}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rows={this.restrictionRows}
                                        dataLength={total}
                                        hidePagination={false}
                                        withActions={true}
                                        handleEdit={this.handleOpenEditModal}
                                        handleDelete={this.handleDeleteRestrictions}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : 'Loading'
                }

                <ModalBox
                    open={open}
                    mode={mode}
                    label={`${!mode ? 'Add' : 'Edit'} Parameter`}
                    handleClose={this.handleCloseModal}
                    handleCreate={this.handleCreateRestrictions}
                    handleEdit={this.handleEditRestrictions}
                >
                    <Grid item={true}>
                        <TextField
                            select={true}
                            required={true}
                            id="standard-required"
                            label="Scope"
                            name="Scope"
                            value={scope}
                            onChange={this.handleChangeScope}
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
                            {this.scopes.map(option => (<option key={option.key} value={option.key}>{option.value}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            label="Value"
                            name="Value"
                            value={value}
                            onChange={this.handleChangeValue}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            select={true}
                            required={true}
                            id="standard-required"
                            label="State"
                            name="state"
                            value={state}
                            onChange={this.handleChangeState}
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
                            {this.states.map(option => (<option key={option.key} value={option.key}>{option.value}</option>))}
                        </TextField>
                    </Grid>
                </ModalBox>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChangeScope = (e: any) => {
        this.setState({ scope: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeValue = (e: any) => {
        this.setState({ value: e.target.value });
    };

    // tslint:disable-next-line:no-any
    private handleChangeState = (e: any) => {
        this.setState({ state: e.target.value });
    };

    private handleCloseModal = (): void => {
        this.setState({ open: false });
    };

    // tslint:disable-next-line:no-any
    private handleOpenEditModal = (e: any): void => {
        this.setState({
            id: e.id,
            scope: e.scope,
            value: e.value,
            state: e.state,
            open: true,
            mode: 1
        });
    };

    private handleOpenCreateModal = (): void => {
        this.setState({ open: true, mode: 0 });
        this.setState({
            id: 0,
            scope: 'ip',
            value: '',
            state: 'disabled',
            open: true,
            mode: 0
        });
    };

    private handleCreateRestrictions = (): void => {
        const { scope, value, state } = this.state;
        const data = { scope, value, state };
        this.props.addRestriction(data);
    };

    private handleEditRestrictions = (): void => {
        const { id, scope, value, state } = this.state;
        const data = { id, scope, value, state };
        this.props.editRestriction(data);
    };

    private handleDeleteRestrictions = (id: number): void => {
        const data = { id };
        this.props.deleteRestriction(data);
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetRestrictions(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetRestrictions(rows, 0);
    };

    private handleGetRestrictions = (limit: number, page: number) => {
        this.props.getRestrictions({ limit, page: page + 1 });
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        restrictions: selectRestrictions(state),
        loading: selectRestrictionLoading(state),
        total: selectRestrictionTotalNumber(state),
        page: selectRestrictionCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getRestrictions: params => dispatch(getRestrictions(params)),
        addRestriction: params => dispatch(addRestriction(params)),
        editRestriction: params => dispatch(editRestriction(params)),
        deleteRestriction: params => dispatch(deleteRestriction(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const Restriction = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(RestrictionScreen as any)));

