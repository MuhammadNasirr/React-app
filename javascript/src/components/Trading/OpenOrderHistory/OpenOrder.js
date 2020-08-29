import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import { styles, color, secondary_solid_colors } from '../../../styles/main'

class OpenOrders extends Component {

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
        const { classes, openOrder, user, market } = this.props;
        const { list } = openOrder ? openOrder : [];

        const currentAskUnit = market ? ` (${market.base_unit.toUpperCase()})` : '';
        const currentBidUnit = market ? ` (${market.quote_unit.toUpperCase()})` : '';

        return (
            <div className={classes.openOrdRoot}>
                {
                    // Object.entries(market).length != 0 &&
                    <div className={clsx(classes.primaryText, classes.openOrdheader)}>
                        <div className={clsx(classes.primaryText, classes.headerPrice)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.date' })}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.state' })}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerAmount)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.type' })}
                    </div>
                    <div className={clsx(classes.primaryText, classes.headerTotal)}>
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.price' })} {currentBidUnit}
                        {/* {`Price(${market.quote_unit.toUpperCase()})`} */}
                    </div>
                    <div className={clsx(classes.primaryText, classes.headerTotal)}>
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.amount' })} {currentAskUnit}
                        {/* {`Amount(${market.base_unit.toUpperCase()})`} */}
                    </div>
                    <div className={clsx(classes.primaryText, classes.headerTotal)}>
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.cancel' })}
                    </div>
                    </div>
                }

                <div className={classes.orderParts}>
    <div className={classes.openOrdPart1}>
        {
            user && !user.email &&
            <div className={classes.emptyIcon}>
                <img src={require('../../../assets/no-transaction.svg')} alt='no-transaction' />
                <p className={classes.primaryText}>
                    <button
                        onClick={() => this.goTo('/signup')}
                        className={classes.orderButton}
                    >
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.signUp' })}
                    </button>
                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.or' })}
                    <button
                        onClick={() => this.goTo('/login')}
                        className={classes.orderButton}>
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.login' })}
                    </button>
                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.message1' })}
                </p>
            </div>
        }
        {
            user && user.email && list && !list.length ?
                <div className={classes.emptyIcon}>
                    <img src={require('../../../assets/no-transaction.svg')} alt='no-transaction' />
                    <p className={classes.primaryText}>
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.message2' })}
                    </p>
                </div>
                : null
        }
        {
            user && user.email && list && list.length > 0 && list.map((order, i) => {
                return (
                    <div key={i}>
                        <div className={classes.tabItem} style={{
                            backgroundColor: this.isEven(i) ? secondary_solid_colors.color2 : color.boxColor
                        }}>
                            <div className={clsx(classes.openOrdtabPrice, classes.primaryNumber)}>
                                {moment(order.created_at).format('M/D/YY hh:mm')}
                            </div>
                            <div className={clsx(classes.primaryText,classes.openOrdTabAmount)}>
                                {this.props.intl.formatMessage({ id: `page.body.trade.header.openOrders.content.state.${order.state}` })}
                            </div>
                            <div className={clsx(classes.primaryText,classes.openOrdTabAmount)}>
                                {this.props.intl.formatMessage({ id: `page.body.history.trade.content.side.${order.side}` })}
                            </div>
                            <div className={clsx(classes.openOrdTabTotal, classes.primaryNumber)}>
                                {parseFloat(order.price).toFixed(8)}
                            </div>
                            <div className={clsx(classes.openOrdTabTotal, classes.primaryNumber)}>
                                {parseFloat(order.origin_volume).toFixed(8)}
                            </div>
                            <div className={classes.openOrdTabTotal}>
                                <IconButton className={classes.cancelIcon} onClick={() => this.onCancel(order.id)} aria-label="delete">
                                    <CancelIcon className={classes.primaryText} fontSize="small" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
</div>
            </div >
        );
    }
};

export default withStyles(styles)(OpenOrders);
