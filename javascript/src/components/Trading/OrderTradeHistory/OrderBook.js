/* eslint-disable */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { sortAsks } from '../../../utils/sortByPrice'
import { List } from "react-virtualized";
import { styles, color, secondary_solid_colors } from '../../../styles/main'

const listHeight = 268;
const rowHeight = 30;
const rowWidth = 332;

class OrderBook extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.renderAskRow = this.renderAskRow.bind(this);
        this.renderBidRow = this.renderBidRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderBook.data && Object.entries(nextProps.orderBook.data).length) {
            const { asks, bids } = nextProps.orderBook.data;
            const ask_total = asks && asks.length && asks.reduce((a, b) => parseFloat(a) + ((parseFloat(b[0]) * parseFloat(b[1])) || 0), 0);
            const bid_total = bids && bids.length && bids.reduce((a, b) => parseFloat(a) + ((parseFloat(b[0]) * parseFloat(b[1])) || 0), 0);
            this.setState({ ask_total, bid_total })
        }
    }

    isEven(n) {
        return n % 2 === 0;
    }

    renderWidth(price, volume, sum) {
        const total = parseFloat(price) * parseFloat(volume);
        return `${(total / sum) * 100}%`
    }

    splitByDecimal = (value) => {
        const precision = '00000000';
        const trimmed = value.replace(/[0]+$/, '');
        const split_value = trimmed.toString().split('.');
        const part1 = parseFloat(split_value[0]);
        const part2 = split_value[1];
        const zeroes = part2 ? precision.substr(part2.toString().length) : precision

        return (
            <div>
                <span>
                    {part1}
                </span>
                <span>.</span>
                {
                    part2 &&
                    <span>
                        <span>
                            {part2}
                        </span>
                        <span className={this.props.classes.primaryNumber} style={{ opacity: 0.2 }}>
                            {zeroes}
                        </span>
                    </span>
                }
                {
                    !part2 &&
                    <span className={this.props.classes.primaryNumber} style={{ opacity: 0.2 }}>
                        {precision}
                    </span>
                }
            </div>
        )
    }

    renderAskRow({ index, key, style }) {
        const { orderBook, classes } = this.props;
        const { asks } = orderBook.data;
        const asksData = sortAsks(asks).slice(0).reverse();

        let customStyles = { ...style };
        customStyles.backgroundColor = this.isEven(index) ? secondary_solid_colors.color2 : color.boxColor
        return (
            <div key={key} style={customStyles} className={classes.tabItem}>
                <div
                    className={clsx(classes.progressBar, classes.asks)}
                    style={{
                        // width: '100%',
                        width: this.renderWidth(asksData[index][0], asksData[index][1], this.state.ask_total)
                    }} />

                <div onClick={() => this.props.changeBidPrice(asksData[index][0])} className={clsx(classes.tabPrice, classes.askPrice)}>
                    {/* {parseFloat(asksData[index][0]).toFixed(8)} */}
                    <span className={clsx(classes.sellText, classes.primaryNumber)}>{this.splitByDecimal(parseFloat(asksData[index][0]).toFixed(8))}</span>
                </div>
                <div onClick={() => this.props.changeBidAmount(asksData[index][1])} className={classes.tabAmount} style={{ textAlign: 'center' }}>
                    {/* {parseFloat(asksData[index][1]).toFixed(8)} */}
                    <span className={classes.primaryNumber}>{this.splitByDecimal(parseFloat(asksData[index][1]).toFixed(8))}</span>
                </div>
                <div className={classes.tabTotal}>
                    {/* {(parseFloat(asksData[index][0]) * parseFloat(asksData[index][1])).toFixed(8)} */}
                    <span className={classes.primaryNumber}>{this.splitByDecimal((parseFloat(asksData[index][0]) * parseFloat(asksData[index][1])).toFixed(8))}</span>
                </div>
            </div>
        );
    }

    renderBidRow({ index, key, style }) {
        const { orderBook, classes } = this.props;
        const { bids } = orderBook.data;
        const bidsData = bids

        let customStyles = { ...style };
        customStyles.backgroundColor = this.isEven(index) ? secondary_solid_colors.color2 : color.boxColor

        return (
            <div key={key} style={customStyles} className={classes.tabItem}>
                <div
                    className={clsx(classes.progressBar, classes.bids)}
                    style={{
                        // width: '100%',
                        width: this.renderWidth(bidsData[index][0], bidsData[index][1], this.state.bid_total),
                        // opacity: this.isEven(index) ? 0.2 : 0.1
                    }} />

                <div onClick={() => this.props.changeAskPrice(bidsData[index][0])} className={clsx(classes.tabPrice, classes.bidPrice)}>
                    {/* {parseFloat(bidsData[index][0]).toFixed(8)} */}
                    <span className={clsx(classes.buyText, classes.primaryNumber)}>{this.splitByDecimal(parseFloat(bidsData[index][0]).toFixed(8))}</span>
                </div>
                <div onClick={() => this.props.changeAskAmount(bidsData[index][1])} className={clsx(classes.primaryNumber, classes.tabAmount)} style={{ textAlign: 'center' }}>
                    {/* {parseFloat(bidsData[index][1]).toFixed(8)} */}
                    <span className={classes.primaryNumber}>{this.splitByDecimal(parseFloat(bidsData[index][1]).toFixed(8))}</span>
                </div>
                <div className={classes.tabTotal}>
                    {/* {(parseFloat(bidsData[index][0]) * parseFloat(bidsData[index][1])).toFixed(8)} */}
                    <span className={classes.primaryNumber}>{this.splitByDecimal((parseFloat(bidsData[index][0]) * parseFloat(bidsData[index][1])).toFixed(8))}</span>
                </div>
            </div>
        );
    }

    render() {
        const { classes, orderBook, tickers, market } = this.props;
        const { data } = orderBook;
        const { list } = tickers;
        const tickerData = list && Object.entries(list).length !== 0 &&
            list.constructor === Object &&
            list[`${market.id.toLowerCase()}`];

        return (
            <div className={classes.orderBookRoot}>
                {
                    Object.entries(market).length !== 0 &&
                    <div className={classes.bookHeader}>
                        <div className={clsx(classes.primaryText, classes.headerPrice)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' })}
                            {`(${market.quote_unit.toUpperCase()})`}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerAmount)} style={{ textAlign: 'center' }}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' })}
                            {`(${market.base_unit.toUpperCase()})`}
                        </div>
                        <div className={clsx(classes.primaryText, classes.headerTotal)}>
                            {this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' })}
                            {`(${market.quote_unit.toUpperCase()})`}
                        </div>
                    </div>
                }

                <div className={classes.orderParts}>
                    <div className={classes.orderPart1}>
                        {
                            data && data.asks && data.asks.length > 0 &&
                            <List
                                ref="List"
                                className={clsx(classes.mainAskList, data.asks.length <= 10 ? classes.askReverse : "")}
                                containerStyle={{ maxWidth: '100%' }}
                                width={rowWidth}
                                height={listHeight}
                                rowHeight={rowHeight}
                                rowRenderer={this.renderAskRow}
                                rowCount={data.asks.length}
                                scrollToIndex={data.asks.length - 1}
                                overscanRowCount={3} />
                        }
                    </div>

                    <div className={classes.orderPart2}>
                        {
                            tickerData && tickerData.ticker &&
                            <h4 className={classes.lastPrice}>
                                <span className={classes.primaryNumber}>{parseFloat(tickerData.ticker.last).toFixed(8)}</span>
                                <span className={classes.primaryText}> {market.quote_unit.toUpperCase()}</span>
                            </h4>
                        }
                    </div>

                    <div className={classes.orderPart3}>

                        {
                            data && data.bids && data.bids.length > 0 &&
                            <List
                                ref="List"
                                className={classes.mainBidList}
                                containerStyle={{ maxWidth: '100%' }}
                                width={rowWidth}
                                height={listHeight}
                                rowHeight={rowHeight}
                                rowRenderer={this.renderBidRow}
                                rowCount={data.bids.length}
                                // scrollToIndex={asks.length - 1}
                                overscanRowCount={3} />
                        }
                    </div>

                </div>
            </div>
        );
    }
};

export default withStyles(styles)(OrderBook);
