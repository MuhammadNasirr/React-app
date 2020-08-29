import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import { styles } from '../../styles/main'

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
// import {color} from '../../styles/static'

// const CustomTableCell = withStyles(theme => ({
//     head: {
//         backgroundColor: color.backgroundColorDark,
//         color: theme.palette.common.white,
//     },

// }))(TableCell);

class AccountActivity extends Component {

    state = {
        rowsPerPage: 10,
        page: 0
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 })
    }

    convertTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const momentObj = moment(date);
        const momentString = momentObj.format('MM-DD-YYYY hh:mm:s');
        return momentString
    }

    getResultOfUserAction = (value) => {
        switch (value) {
            case 'login':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.login' });
            case 'logout':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.logout' });
            case 'request QR code for 2FA':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.request2fa' });
            case 'enable 2FA':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.enable2fa' });
            case 'login::2fa':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.login.2fa' });
            case 'request password reset':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.requestPasswordReset' });
            case 'password reset':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.passwordReset' });
            case 'create':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.create' });
            case 'read':
                return this.props.intl.formatMessage({ id: 'page.body.profile.content.action.read' });
            default:
                return value;
        }
    };

    render() {
        const { classes, activities } = this.props;
        const { rowsPerPage, page } = this.state

        return (
            <div>
                <Paper className={classes.activityPaper}>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                        {this.props.intl.formatMessage({ id: 'page.body.profile.header.accountActivity' })}
                    </Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={classes.tableRoot}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell} classes={{head: classes.tableCellColor}}>{this.props.intl.formatMessage({ id: 'page.body.profile.header.accountActivity.content.date' })}</TableCell>
                                            <TableCell className={classes.tableCell} classes={{head: classes.tableCellColor}} align="right" >{this.props.intl.formatMessage({ id: 'page.body.profile.header.accountActivity.content.action' })}</TableCell>
                                            <TableCell className={classes.tableCell} classes={{head: classes.tableCellColor}} align="right">{this.props.intl.formatMessage({ id: 'page.body.profile.header.accountActivity.content.result' })}</TableCell>
                                            <TableCell className={classes.tableCell} classes={{head: classes.tableCellColor}} align="right">{this.props.intl.formatMessage({ id: 'page.body.profile.header.accountActivity.content.addressip' })}</TableCell>
                                            <TableCell className={classes.tableCell} classes={{head: classes.tableCellColor}} align="right">{this.props.intl.formatMessage({ id: 'page.body.profile.header.accountActivity.content.userAgent' })}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity, key) => (
                                            <TableRow key={key}>
                                                <TableCell component="th" scope="row" className={classes.secondaryNumber}>
                                                    {this.convertTimestamp(activity.created_at)}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} align="right" >{this.getResultOfUserAction(activity.action)}</TableCell>
                                                <TableCell className={`${classes.tableCell} ${activity.result === 'succeed' ? classes.successText : classes.errorText}`} align="right">
                                                    {this.props.intl.formatMessage({ id: `page.body.profile.content.result.${activity.result}` })}
                                                </TableCell>
                                                <TableCell className={clsx(classes.tableCell, classes.secondaryNumber)} align="right">{activity.user_ip}</TableCell>
                                                <TableCell className={classes.tableCell} align="right">{activity.user_agent}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>

                        {/* <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={activities.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            classes={{
                                root: classes.tablePagination,
                                menuItem: classes.primaryText,
                                actions: classes.tablePaginationActions,
                                selectIcon: classes.tablePaginationSelectIcon,
                            }}
                        /> */}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(AccountActivity);
