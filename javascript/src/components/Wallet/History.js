import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Paper from '@material-ui/core/Paper';
import { styles } from '../../styles/main'
import clsx from 'clsx'

class HistoryTable extends Component {
  render() {
    const { classes, history, type, coinType, historyType } = this.props;
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h2" style={{ paddingLeft: 0 }} classes={{ h2: classes.walletHistoryHeading, }} gutterBottom>
              {this.props.intl.formatMessage({ id: `page.body.history.${type}` })}
            </Typography>
          </Grid>
        </Grid>
        <Paper className={classes.historyTableRoot}>
          <Table className={classes.addressTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.date' })}</TableCell>
                <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.status' })}</TableCell>
                <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.amount' })}</TableCell>
                {
                  historyType === 'mxn' ?
                    <React.Fragment>
                      <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.price' })}</TableCell>
                      <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.total' })}</TableCell>
                    </React.Fragment>
                    :
                    <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.txid' })}</TableCell>
                }
                {/* {
                  coinType !== "compound" &&
                  <TableCell className={classes.primaryText} padding="none" style={{ minWidth: '100px' }}>{this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.txid' })}</TableCell>
                } */}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                history.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.primaryText} padding="none">{data.created_at}</TableCell>
                    <TableCell className={classes.primaryText} padding="none">{this.props.intl.formatMessage({ id: `page.body.history.${type}.content.status.${coinType === "compound" ? data.status : data.state}` })}</TableCell>
                    <TableCell padding="none" className={clsx(classes.primaryText, classes.primaryNumber)}>{data.amount}</TableCell>
                    {
                      historyType === 'mxn' ?
                        <React.Fragment>
                          <TableCell className={classes.primaryText} padding="none">{Number(data.price).toFixed(8)}</TableCell>
                          <TableCell className={classes.primaryText} padding="none">{Number(data.total).toFixed(8)}</TableCell>
                        </React.Fragment>
                        :
                        <TableCell className={classes.primaryText} padding="none">{type === 'deposit' && coinType !== "compound" ? (data.txid || '-') : coinType === "compound" ? (data.tx_hash || '-') : (data.blockchain_txid || '-')}</TableCell>
                    }
                    {/* {
                      coinType !== "compound" &&
                      <TableCell className={classes.primaryText} padding="none">{type === 'deposit' ? (data.txid || '-') : (data.blockchain_txid || '-')}</TableCell>
                    } */}
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
        {!history.length && <Typography className={classes.primaryText} variant="body2" align="center">
          {this.props.intl.formatMessage({ id: 'page.noDataToShow' })}
        </Typography>}
      </Fragment>
    );
  }
}

export default withStyles(styles)(HistoryTable);
