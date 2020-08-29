import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import { sortByDate } from '../../../utils/sortByDate'
import { styles, color, secondary_solid_colors } from '../../../styles/main'

class OrderHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    isEven(n) {
        return n % 2 === 0;
    }

    onCancel = (id) => {
        this.props.cancelOrder(id)
    }

    goTo = (pathName) => {
        this.props.history.push(pathName)
    }

    render() {
        const { classes, orderHistory, user, market } = this.props;
        const { list } = orderHistory ? orderHistory : [];

        const currentAskUnit = market ? ` (${market.base_unit.toUpperCase()})` : '';
        const currentBidUnit = market ? ` (${market.quote_unit.toUpperCase()})` : '';

        return (
            <div className={classes.orderHisRoot}>
                {
                    // Object.entries(market).length != 0 &&
                    <div className={classes.orderHisHeader}>
                        <div className={clsx(classes.primaryText, classes.headerPrice)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.date' })}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.state' })}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerAmount)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.type' })}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.price' })} {currentBidUnit}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.amount' })} {currentAskUnit}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.total' })} {currentBidUnit}
                        </div>
                    </div>
                }

                <div className={classes.orderHisParts}>
                    <div className={classes.orderHisPart1}>
                        {
                            user && !user.email &&
                            <div className={classes.emptyIcon}>
                                <img src={require('../../../assets/no-transaction.svg')} alt='no-transaction' />
                                <p className={classes.primaryText}>
                                    <button
                                        onClick={() => this.goTo('/signup')}
                                        className={classes.orderButton}
                                    >
                                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.signUp' })}
                                    </button>
                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.or' })}
                                    <button
                                        onClick={() => this.goTo('/login')}
                                        className={classes.orderButton}>
                                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.login' })}
                                    </button>
                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.message1' })}
                                </p>
                            </div>
                        }
                        {
                            user && user.email && list && !list.length ?
                                <div className={classes.emptyIcon}>
                                    <img src={require('../../../assets/no-transaction.svg')} alt='no-transaction' />
                                    <p className={classes.primaryText}>
                                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderHistory.content.message2' })}
                                    </p>
                                </div>
                                : null
                        }
                        {
                            user && user.email && list && list.length > 0 && sortByDate(list).map((order, i) => {
                                return (
                                    <div key={i}>
                                        <div className={classes.tabItem} style={{
                                            backgroundColor: this.isEven(i) ? secondary_solid_colors.color2 : color.boxColor
                                        }}>
                                            <div className={clsx(classes.openOrdtabPrice, classes.primaryNumber)}>
                                                {moment(order.created_at).format('M/D/YY hh:mm')}
                                            </div>
                                            <div className={clsx(classes.primaryText, classes.openOrdTabAmount)}>
                                                {this.props.intl.formatMessage({ id: `page.body.trade.header.orderHistory.content.state.${order.state}` })}
                                            </div>
                                            <div className={clsx(classes.primaryText, classes.openOrdTabAmount)}>
                                                {this.props.intl.formatMessage({ id: `page.body.history.trade.content.side.${order.side}` })}
                                            </div>
                                            <div className={clsx(classes.openOrdTabTotal, classes.primaryNumber)}>
                                                {order.price ? parseFloat(order.price).toFixed(8) : parseFloat(order.avg_price).toFixed(8)}
                                            </div>
                                            <div className={clsx(classes.openOrdTabTotal, classes.primaryNumber)}>
                                                {parseFloat(order.origin_volume).toFixed(8)}
                                            </div>
                                            <div className={clsx(classes.openOrdTabTotal, classes.primaryNumber)}>
                                                {
                                                    order.price ?
                                                        (parseFloat(order.price) * parseFloat(order.origin_volume)).toFixed(8)
                                                        :
                                                        (parseFloat(order.avg_price) * parseFloat(order.origin_volume)).toFixed(8)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(OrderHistory);
