import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment'
import { styles } from '../../styles/main'
import clsx from 'clsx'

class History extends Component {

    renderValues = (item, key) => {
        switch (key) {
            case 'currency':
                return item[key] && item[key] ? item[key].toUpperCase() : '-'

            case 'fee_currency':
                return item[key] && item[key].toUpperCase()

            case 'market':
                return item[key].toUpperCase()

            case 'created_at':
                return moment(item[key]).format('M/D/YY hh:mm A')

            case 'state':
                return this.props.intl.formatMessage({ id: `page.body.history.withdraw.content.status.${item[key]}` })

            default:
                return item[key] ? item[key] : '-'
        }
    }

    render() {
        const {
            classes,
            data,
            headerItems,
            rowsPerPage,
            page,
            onChangePage,
            onChangeRowsPerPage,
            keys
        } = this.props;

        return (
            <Fragment>
                <Paper className={classes.historyRoot}>
                    <div className={classes.tableRoot}>
                        <Table className={classes.historyTable}>
                            <TableHead className={classes.tabsBackground}>
                                <TableRow>
                                    {headerItems.map((item, i) =>
                                        (
                                            <TableCell key={i} className={clsx(classes.tableCell, classes.primaryText)}>{item}</TableCell>
                                        )
                                    )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                                        <TableRow key={index}>
                                            {
                                                keys && keys.map((key, i) => (
                                                    <TableCell key={i} className={clsx(classes.tableCell, key === "amount" || key === "fee" || key === "price" || key === "created_at" ? classes.primaryNumber : classes.primaryText)}>
                                                        {this.renderValues(item, key)}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
                {data && !data.length &&
                    <Typography className={classes.primaryText} variant="h6" align="center">
                        {this.props.intl.formatMessage({ id: 'page.noDataToShow' })}
                    </Typography>}

                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    classes={{
                        root: classes.tablePagination,
                        actions: classes.tablePaginationActions,
                        toolbar: classes.primaryText
                    }}
                />
            </Fragment>
        );
    }
}

export default withStyles(styles)(History);
