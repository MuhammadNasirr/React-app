import {
    Button,
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
import {
    AttachFile,
    CancelOutlined,
    ChevronRight,
    Delete,
    Edit
} from '@material-ui/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    convertToOtp,
    getUserBrowser,
    getUserOS,
    localeDate,
} from '../../helpers';

interface InfoTableProps {
    dataLength: number;
    rows: Array<{ key: string; alignRight: boolean; label: string; }>;
    // tslint:disable-next-line:no-any
    data: any;
    page?: number;
    rowsPerPage: number;
    handleChangePage?: (page: number) => void;
    handleChangeRowsPerPage?: (rows: number) => void;
    handleCancel?: (id: number, uid: string) => void;
    hidePagination?: boolean;
    showAll?: boolean;
    label?: string;
    location?: {
        pathname: string;
    };
    handleOpen?: (index: number) => void;
    withActions?: boolean;
    mxnAction?: boolean;
    withDetails?: boolean;
    // tslint:disable-next-line:no-any
    handleGoToDetails?: (e: any) => void;
    // tslint:disable-next-line:no-any
    handleEdit?: (e: any) => void;
    handleDelete?: (id: number) => void;
    handleShowAll?: () => void;
}

const styles = (theme: Theme) => (createStyles({
    root: {
        width: '100%'
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
    attachment: {
        color: 'rgba(0, 0, 0, 0.87)',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
    selectRoot: {
        marginRight: '8px !important'
    },
    active: {
        color: '#00A41A',
    },
    banned: {
        color: '#E23328',
    },
    warning: {
        color: '#E3B930',
    },
    greyIcon: {
        cursor: 'pointer',
        color: '#979797',
    },
    cell: {
        padding: '4px 0px',
    },
    icon: {
        cursor: 'pointer',
        color: '#309CEA',
    },
    disabledIcon: {
        cursor: 'pointer',
        color: '#309CEA',
        opacity: 0.5,
    },
    info: {
        textAlign: 'center',
        padding: '4px 16px',
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = StyleProps & InfoTableProps;

class TableComponent extends React.Component<Props> {

    public render() {
        const {
            classes,
            data,
            label,
        } = this.props;
        return (
            <div className={classes.root}>
                {label && (<Typography variant="h6" gutterBottom={true} className={classes.label}>{label}</Typography>)}
                {Array.isArray(data) && data && data.length ? this.renderContent() : <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
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
            showAll,
            location,
            withActions,
            withDetails,
            mxnAction
        } = this.props;
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
                                                    <TableCell key={index} component="td" align={row.alignRight ? 'right' : 'left'} >
                                                        {row.key === 'email' ? (<Link to={`main`} className={classes.link}>{n.email}</Link>)
                                                            : row.key === 'user_email' ? (<Link to={`${location && location.pathname}/${n.user && n.user.uid}`} className={classes.link}>{n.user && n.user.email}</Link>)
                                                                : row.key === 'otp' ? (convertToOtp(n.otp) === 'true' ? '2FA' : '-')
                                                                    : row.key === 'upload' ? (<span className={classes.attachment}>1 <AttachFile onClick={this.handleOpenCarousel(i)} className={classes.greyIcon} /></span>)
                                                                        : row.key === 'created_at' || row.key === 'validated_at' || row.key === 'updated_at' ? localeDate(n[row.key], 'fullDate')
                                                                            : row.key === 'browser' ? getUserBrowser(n.user_agent)
                                                                                : row.key === 'os' ? getUserOS(n.user_agent)
                                                                                    : row.key === 'result' ? this.getColored(n.result)
                                                                                        : row.key === 'taker_type' ? this.getColored(n.taker_type)
                                                                                            : row.key === 'side' ? this.getColored(n.side)
                                                                                                : row.key === 'state' ? this.getColored(n.state)
                                                                                                    : row.key === 'user_role' ? n.user && n.user.role
                                                                                                        : row.key === 'blockchain_txid' ? (n.blockchain_txid ? n.blockchain_txid : 'Manual Adjustment')
                                                                                                            : row.key === 'txid' ? (n.txid ? n.txid : 'Manual Adjustment')
                                                                                                                : row.key === 'visible' ? (n.visible && this.getColored('active'))
                                                                                                                    : row.key === 'status' ? this.getColored(n.status)
                                                                                                                        : row.key === 'total' ? (parseFloat(n.balance) + parseFloat(n.locked))
                                                                                                                            : row.key === 'totalMXN' ? (parseFloat(n.total))
                                                                                                                                : row.key === 'currency' ? n.currency.toUpperCase()
                                                                                                                                    : row.key === 'deposit_enabled' ? (n.deposit_enabled ? this.getColored('enabled') : null)
                                                                                                                                        : row.key === 'withdrawal_enabled' ? (n.withdrawal_enabled ? this.getColored('enabled') : null)
                                                                                                                                            : row.key === 'completed_at' ? localeDate(n[row.key], 'fullDate')
                                                                                                                                                : row.key === 'maker' ? this.getPercentage(n.maker)
                                                                                                                                                    : row.key === 'taker' ? this.getPercentage(n.taker)
                                                                                                                                                        : row.key === 'doc_expire' ? localeDate(n[row.key], 'date')
                                                                                                                                                            : row.key === 'cancel' ? (
                                                                                                                                                                <IconButton style={{ color: 'red' }} onClick={this.handleCancelOpenOrder(n.id, n.uid)}>
                                                                                                                                                                    <CancelOutlined />
                                                                                                                                                                </IconButton>
                                                                                                                                                            )
                                                                                                                                                                : n[row.key]}
                                                    </TableCell>
                                                );
                                            })
                                            }
                                            {
                                                withActions &&
                                                <TableCell component="td" className={classes.info}>
                                                    <IconButton onClick={e => this.handleEditRow(n)}>
                                                        <Edit className={classes.icon} />
                                                    </IconButton>
                                                    <IconButton onClick={e => this.handleDeleteRow(n.id)}>
                                                        <Delete className={classes.icon} />
                                                    </IconButton>
                                                </TableCell>
                                            }
                                            {
                                                mxnAction &&
                                                <TableCell component="td" className={classes.info}>
                                                    <IconButton disabled={n.state === 'pending' ? false : true} onClick={e => this.handleEditRow(n)}>
                                                        <Edit className={n.state === 'pending' ? classes.icon : classes.disabledIcon} />
                                                    </IconButton>
                                                </TableCell>
                                            }
                                            {
                                                withDetails &&
                                                <TableCell component="td" className={classes.info}>
                                                    <IconButton onClick={e => this.handleGoToDetails(n)}>
                                                        <ChevronRight className={classes.icon} />
                                                    </IconButton>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    );
                                }) // tslint:enable:no-any
                            }
                        </TableBody>
                    </Table>
                </div>
                {
                    showAll ? (
                        <Button
                            style={{ marginTop: 40, marginBottom: -40, marginLeft: 20, zIndex: 100 }}
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleShowAll}
                        >
                            Show all
                        </Button>
                    ) : null
                }
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
                        classes={{ selectIcon: classes.selectIcon, selectRoot: classes.selectRoot }}
                    />
                ) : null}
            </div>
        );
    }

    // tslint:disable-next-line:no-any
    private handleGoToDetails = (event: any) => {
        this.props.handleGoToDetails && this.props.handleGoToDetails(event);
    };

    // tslint:disable-next-line:no-any
    private handleEditRow = (event: any) => {
        this.props.handleEdit && this.props.handleEdit(event);
    };

    private handleDeleteRow = (id: number) => {
        this.props.handleDelete && this.props.handleDelete(id);
    };

    // tslint:disable-next-line:no-any
    private handleChangePage = (event: any, page: number) => {
        this.props.handleChangePage && this.props.handleChangePage(page);
    };

    private handleChangeRowsPerPage = event => {
        this.props.handleChangeRowsPerPage && this.props.handleChangeRowsPerPage(event.target.value);
    };

    private handleOpenCarousel = (i: number) => () => {
        const { handleOpen } = this.props;
        handleOpen && handleOpen(i);
    }

    private handleCancelOpenOrder = (id: number, uid: string) => () => {
        this.props.handleCancel && this.props.handleCancel(id, uid);
    }

    private getHeaderForTable = () => {
        const { classes, withActions, withDetails, mxnAction } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {this.props.rows.map((row: { key: string, alignRight: boolean, label: string }) => (
                        <TableCell key={row.key} align={row.alignRight ? 'right' : 'left'}>
                            <Typography variant="subtitle2" gutterBottom={true} className={classes.headers}>
                                {row.label}
                            </Typography>
                        </TableCell>
                    ), this)}
                    {
                        (withActions || withDetails) &&
                        <TableCell />
                    }
                    {
                        (mxnAction) &&
                        <TableCell />
                    }
                </TableRow>
            </TableHead>
        );
    };

    private getColored = (state: string) => {
        const { classes } = this.props;
        switch (state) {
            case 'active':
            case 'completed':
            case 'succeed':
            case 'done':
            case 'buy':
            case 'collected':
            case 'enabled':
                return <span className={classes.active}>{state}</span>;
            case 'accepted':
            case 'submitted':
            case 'pending':
                return <span className={classes.warning}>{state}</span>;
            default:
                return <span className={classes.banned}>{state}</span>;
        }
    };

    private getPercentage = (value: string) => {
        const feePercentage = (parseFloat(value) * 100).toFixed(4);
        return `${feePercentage}%`;
    };
}

export const InfoTable = withStyles(styles, { withTheme: true })(TableComponent);
