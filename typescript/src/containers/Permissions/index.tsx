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
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tablePageLimit } from '../../api/config';
import { PermissionsTable } from '../../components';
import {
    addPermission,
    AppState,
    deletePermission,
    editPermission,
    getPermissions,
    PermissionDataInterface,
    selectPermissions,
    selectPermissionsCurrentPage,
    selectPermissionsLoading,
    selectPermissionsTotalNumber,
} from '../../modules';

const styles = (theme: Theme) => (createStyles({
    emptyTable: {
        padding: theme.spacing.unit,
    },
    root: {
        width: '100%',
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableRow: {
        '&:hover': {
            backgroundColor: '#f9f9f9',
        },
    },
    title: {
        padding: theme.spacing.unit * 2.5,
        paddingBottom: 0,
        fontWeight: 600,
        letterpacing: '0.1px',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
    button: {
        margin: theme.spacing.unit * 2.5,
        paddingBottom: 0,
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface ReduxProps {
    loading: boolean;
    total: number;
    page: number;
    permissions: PermissionDataInterface[];
}

interface DispatchProps {
    getPermissions: typeof getPermissions;
    deletePermission: typeof deletePermission;
    editPermission: typeof editPermission;
    addPermission: typeof addPermission;
}

interface OwnProps {
    location?: {
        pathname: string;
    };
}

interface State {
    mode: number;
    id: number;
    role: string;
    path: string;
    verb: string;
    topic: string;
    action: string;
    openEditPermissionModal: boolean;
    openConfirmationModal: boolean;
    currentPage: number;
    currentLimit: number;
    searchValue: string;
}

type Props = StyleProps & ReduxProps & DispatchProps & OwnProps;

class PermissionsScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            mode: 0,
            id: 0,
            role: '',
            path: '',
            verb: '',
            topic: '',
            action: '',
            openEditPermissionModal: false,
            openConfirmationModal: false,
            currentPage: 0,
            currentLimit: tablePageLimit(),
            searchValue: '',
        };
    }

    private permissionRows = [
        { key: 'role', alignRight: false, label: 'Role' },
        { key: 'verb', alignRight: false, label: 'Verb' },
        { key: 'path', alignRight: false, label: 'Path' },
        { key: 'topic', alignRight: false, label: 'Topic' },
        { key: 'action', alignRight: false, label: 'Action' },
    ];

    public componentDidMount() {
        const {
            currentLimit,
            currentPage,
        } = this.state;
        this.props.getPermissions({ page: currentPage + 1, limit: currentLimit});
    }

    public render() {
        const {
            permissions,
            loading,
            classes,
        } = this.props;
        return (
            <React.Fragment>
                <Paper>
                    <Grid container={true} justify="space-between">
                        <Grid item={true}>
                            <Typography variant="h6" gutterBottom={true} className={classes.title}>
                                Permissions
                            </Typography>
                        </Grid>
                        <Grid item={true}>
                            <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={() => this.handleOpenAddPermissionModal()}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                    {permissions[0] && this.renderContent()}
                    {!permissions.length && !loading && <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                </Paper>
            </React.Fragment>
        );
    }

    public renderContent = () => {
        const {
            permissions,
            total,
            location,
        } = this.props;
        const {
            mode,
            currentLimit,
            currentPage,
            id,
            role,
            verb,
            path,
            topic,
            action,
            openEditPermissionModal,
            openConfirmationModal
        } = this.state;

        return (
            <PermissionsTable
                mode={mode}
                dataLength={total}
                rows={this.permissionRows}
                data={permissions}
                page={currentPage}
                rowsPerPage={currentLimit}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                hidePagination={false}
                location={location}
                id={id}
                role={role}
                path={path}
                topic={topic}
                verb={verb}
                action={action}
                closeModal={this.handleCloseModal}
                handleChange={this.handleChange}
                isEditPermissionModalOpened={openEditPermissionModal}
                isConfirmPermissionModalOpened={openConfirmationModal}
                openEditPermissionModal={this.handleOpenEditPermissionModal}
                editPermission={this.handleEditPermission}
                createPermission={this.handleCreatePermission}
                deletePermission={this.handleDeletePermission}
                openConfirmPermissionModal={this.handleOpenConfirmPermissionModal}
            />
        );
    };

    private handleOpenEditPermissionModal = (id: number, role: string, verb: string, path: string, topic: string, action: string) => {
        this.setState({
            mode: 1,
            openEditPermissionModal: true,
            id: id,
            role: role,
            path: path,
            verb: verb,
            topic: topic,
            action: action,
        });
    };

    private handleOpenAddPermissionModal = () => {
        this.setState({
            mode: 0,
            role: '',
            path: '',
            verb: 'ALL',
            topic: '',
            action: 'ACCEPT',
            openEditPermissionModal: true
        });
    };

    private handleOpenConfirmPermissionModal = (id: number) => {
        this.setState({
            id: id,
            openConfirmationModal: true
        });
    };

    private handleEditPermission = (id: number, role: string, verb: string, path: string, topic: string, action: string) => {
        const data = { id, role, path, topic, verb, action };
        this.props.editPermission(data);
    };

    private handleCreatePermission = (role: string, verb: string, path: string, topic: string, action: string) => {
        const data = { role, path, topic, verb, action };
        this.props.addPermission(data);
    };

    private handleDeletePermission = (id: number) => {
        this.props.deletePermission({ id });
    };

    private handleChange = (name: string, value: string) => {
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    private handleCloseModal = () => {
        this.setState({
            openEditPermissionModal: false,
            openConfirmationModal: false
        });
    };

    private handleChangePage = (page: number) => {
        this.setState({ currentPage: page });
        this.handleGetPermissions(this.state.currentLimit, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            currentLimit: rows,
            currentPage: 0,
        });
        this.handleGetPermissions(rows, 0);
    };

    private handleGetPermissions = (limit: number, page: number) => {
        this.props.getPermissions({ page: page + 1, limit });
    };
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    permissions: selectPermissions(state),
    loading: selectPermissionsLoading(state),
    total: selectPermissionsTotalNumber(state),
    page: selectPermissionsCurrentPage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getPermissions: params => dispatch(getPermissions(params)),
        deletePermission: params => dispatch(deletePermission(params)),
        editPermission: params => dispatch(editPermission(params)),
        addPermission: params => dispatch(addPermission(params))
    });

// tslint:disable-next-line:no-any
export const Permissions = withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(PermissionsScreen as any)));
