import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import { styles } from '../../../styles/main'

class TradeHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    isEven(n) {
        return n % 2 === 0;
    }

    render() {
        const { classes, tradeHistory, market } = this.props;
        const { list } = tradeHistory

        return (
            <div className={classes.tradeHistoryRoot}>
                {
                    Object.entries(market).length !== 0 &&
                    <div className={classes.bookHeader}>
                        <div className={clsx(classes.primaryText,classes.headerPrice)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.price' })}
                            {`(${market.quote_unit.toUpperCase()})`}
                        </div>
                        <div className={clsx(classes.primaryText,classes.headerAmount)} style={{textAlign: 'center'}}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.amount' })}
                            {`(${market.base_unit.toUpperCase()})`}
                        </div>
                        <div className={clsx(classes.primaryText,classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.time' })}
                        </div>
                    </div>
                }

                <div className={classes.orderParts}>
                    <div className={classes.tradePart1}>
                        {
                            list && list.length > 0 && list.map((item, key) => {
                                return (
                                    <div key={key} className={classes.tabItem}>

                                        <div
                                            style={{ width: '100%' }}
                                            className={clsx(
                                                classes.tradeProgressBar,
                                                // item.taker_type == 'sell' ? classes.asks : classes.bids,
                                            )} />

                                        <img className={classes.up} src={item.taker_type === 'sell' ? require('../../../assets/down.svg') : require('../../../assets/up.svg')} alt="trade-arrow" />
                                        <div className={clsx(
                                            classes.tradeTabPrice,
                                            item.taker_type === 'sell' ? classes.askPrice : classes.bidPrice,
                                            classes.primaryNumber
                                        )}>
                                            {parseFloat(item.price).toFixed(8)}
                                        </div>
                                        <div className={clsx(classes.tradeTabAmount, classes.primaryNumber)} style={{textAlign: 'center'}}>
                                            {parseFloat(item.amount).toFixed(8)}
                                        </div>
                                        <div className={clsx(classes.tradeTabTime, classes.primaryNumber)}>
                                            {moment(item.created_at).format('M/D hh:mm A')}
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

export default withStyles(styles)(TradeHistory);
