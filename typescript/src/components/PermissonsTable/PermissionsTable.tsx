import {
    createStyles,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import * as React from 'react';
import { ConfirmationModal, InfoPopper, PermissionModal } from '../';
import {
    capitalize
} from '../../helpers';
import { DataInterface } from '../../modules';

interface PermissionTableProps {
    dataLength: number;
    rows: Array<{ key: string; alignRight: boolean; label: string; }>;
    // tslint:disable-next-line:no-any
    data: any;
    page?: number;
    rowsPerPage: number;
    handleChangePage?: (page: number) => void;
    handleChangeRowsPerPage?: (rows: number) => void;
    hidePagination?: boolean;
    label?: string;
    location?: {
        pathname: string;
    };
    mode: number;
    id: number;
    role: string;
    path: string;
    topic: string;
    verb: string;
    action: string;
    closeModal: () => void;
    isEditPermissionModalOpened: boolean;
    isConfirmPermissionModalOpened: boolean;
    editPermission: (id: number, role: string, verb: string, path: string, topic: string, action: string) => void;
    createPermission: (role: string, verb: string, path: string, topic: string, action: string) => void;
    deletePermission: (id: number) => void;
    handleChange: (name: string, value: string) => void;
    openEditPermissionModal: (id: number, role: string, verb: string, path: string, topic: string, action: string) => void;
    openConfirmPermissionModal: (id: number) => void;
}

const styles = (theme: Theme) => (createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    link: {
        cursor: 'pointer',
        color: '#309CEA',
        textDecoration: 'none',
        letterSpacing: '0.4px',
    },
    label: {
        letterSpacing: '0.15px',
        padding: '16px',
        paddingBottom: '0px',
        fontWeight: 600,
    },
    headers: {
        fontWeight: 600,
        fontSize: '14px',
        letterpacing: '0.1px',
    },
    content: {
        fontWeight: 500,
        letterSpacing: '0.4px',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    emptyTable: {
        padding: theme.spacing.unit,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
    active: {
        color: '#00A41A',
    },
    banned: {
        color: '#E23328',
    },
    icon: {
        cursor: 'pointer',
        color: '#309CEA',
    },
    cell: {
        padding: '4px 16px',
    },
    info: {
        textAlign: 'center',
        padding: '4px 16px',
    },
    title: {
        opacity: 0.54,
    },
    popper: {
        padding: '8px 10px',
    },
    value: {
        paddingBottom: 8,
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface State {
    anchorEl: HTMLElement | null;
    selectIndex: number;
}

type Props = StyleProps & PermissionTableProps;

class TableComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectIndex: 0,
        };
    }

    public render() {
        const {
            classes,
            mode,
            data,
            label,
            id,
            role,
            verb,
            path,
            topic,
            action
        } = this.props;
        return (
            <div className={classes.root}>
                {label && (<Typography variant="h6" gutterBottom={true} className={classes.label}>{label}</Typography>)}
                {data.length ? this.renderContent() : <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                <PermissionModal
                    editPermission={this.props.editPermission}
                    createPermission={this.props.createPermission}
                    handleChange={this.props.handleChange}
                    modalClose={this.modalClose}
                    mode={mode}
                    id={id}
                    role={role}
                    path={path}
                    topic={topic}
                    verb={verb}
                    action={action}
                    open={this.props.isEditPermissionModalOpened}
                />
                <ConfirmationModal
                    handleDone={this.props.deletePermission}
                    modalClose={this.modalClose}
                    id={id}
                    title={'Delete Permission'}
                    description={'[WARNING] Deleting this permission will block user role to access it. Are you sure you want to delete this permission?'}
                    open={this.props.isConfirmPermissionModalOpened}
                />
            </div>
        );
    }

    private renderContent = () => {
        const {
            classes,
            page,
            hidePagination,
            dataLength,
            data,
            rows,
        } = this.props;
        const { anchorEl, selectIndex } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        {this.getHeaderForTable()}
                        <TableBody>
                            { // tslint:disable:no-any
                                data.map((n: any, i: number) => {
                                    return (
                                        <TableRow hover={true} key={i}>
                                            {rows.map((row: any, index: number) => {
                                                return (
                                                    <TableCell key={index} component="td" align={row.alignRight ? 'right' : 'left'} className={classes.cell}>
                                                        {n[row.key]}
                                                    </TableCell>
                                                );
                                            })
                                            }
                                            <TableCell component="td" className={classes.info}>
                                                <IconButton onClick={e => this.openEditPermissionModal(n.id, n.role, n.verb, n.path, n.topic, n.action)}>
                                                    <Edit className={classes.icon} />
                                                </IconButton>
                                                <IconButton onClick={e => this.openConfirmPermissionModal(n.id)}>
                                                    <Delete className={classes.icon} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) // tslint:enable:no-any
                            }
                        </TableBody>
                    </Table>
                </div>
                {!hidePagination ? (
                    <TablePagination
                        component="div"
                        count={Number(dataLength)}
                        rowsPerPage={this.props.rowsPerPage}
                        page={page || 0}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        classes={{ selectIcon: classes.selectIcon }}
                    />
                ) : null}
                <InfoPopper
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    handleClose={this.handleClose}
                    data={this.renderData(data[selectIndex].data)}
                />
            </div>
        );
    }

    private openEditPermissionModal = (id: number, role: string, verb: string, path: string, topic: string, action: string) => {
        this.props.openEditPermissionModal(id, role, verb, path, topic, action);
    };

    private openConfirmPermissionModal = (id: number) => {
        this.props.openConfirmPermissionModal(id);
    };

    // tslint:disable-next-line:no-any
    private handleChangePage = (event: any, page: number) => {
        this.props.handleChangePage && this.props.handleChangePage(page);
    };

    private handleChangeRowsPerPage = event => {
        this.props.handleChangeRowsPerPage && this.props.handleChangeRowsPerPage(event.target.value);
    };

    private handleClose = () => {
        this.setState({ anchorEl: null });
    };

    private modalClose = () => {
        this.props.closeModal();
    };

    private getHeaderForTable = () => {
        const { classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {this.props.rows.map((row: { key: string, alignRight: boolean, label: string }) => (
                        <TableCell key={row.key} align={row.alignRight ? 'right' : 'left'} className={classes.cell}>
                            <Typography variant="subtitle2" gutterBottom={true} className={classes.headers}>
                                {row.label}
                            </Typography>
                        </TableCell>
                    ), this)}
                    <TableCell className={classes.info} />
                </TableRow>
            </TableHead>
        );
    };

    private renderData = list => {
        const { classes } = this.props;

        if (list && list.length > 0) {
            return list.map((i: DataInterface, index: number) => (
                i.type === 'key' ?
                    <Typography variant="body2" className={classes.title} key={index}>{capitalize(i.value)}</Typography> :
                    <Typography variant="body1" className={classes.value} key={index}>{i.value}</Typography>
            ),
            );
        } else {
            return <Typography variant="caption" align="center">There is no data to show</Typography>;
        }
    };
}

export const PermissionsTable = withStyles(styles, { withTheme: true })(TableComponent);
