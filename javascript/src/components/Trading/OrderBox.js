import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import { cleanPositiveFloatInput } from '../../utils/cleanPositiveFloatInput'
import { styles } from '../../styles/main';
import { toMinFixed } from '../../utils/toMinFixed'

class OrderBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            price: ''
        }
    }

    handleChangePrice = event => {
        this.props.onChangePrice(event.target.value)
    };

    handleChangeAmount = event => {
        this.props.onChangeAmount(event.target.value)
    };

    setPrice = (balance) => {
        const { tickers, market, price } = this.props;
        const { amount_precision, price_precision } = market;
        const { list } = tickers;
        const { ticker } = Object.entries(list).length !== 0 &&
            list.constructor === Object &&
            list[`${market.id.toLowerCase()}`];
        const convertedValue = cleanPositiveFloatInput(String(ticker.last));
        if (!price) {
            this.props.onChangePrice(parseFloat(convertedValue).toFixed(price_precision));
            this.props.onChangeAmount((balance / convertedValue).toFixed(amount_precision));
        }
        else {
            this.props.onChangeAmount((parseFloat(balance) / price).toFixed(amount_precision))
        }
    };

    onClose = () => {
        this.props.onClose()
    };

    onCreateLimitOrder = () => {
        const { market, type, price, amount } = this.props;
        const data = {
            market: market.id,
            side: type,
            volume: parseFloat(amount),
            price: parseFloat(price),
            ord_type: 'limit'
        }
        this.props.createOrder(data)
    }

    render() {
        const { classes, type, market, wallets, user, price, amount } = this.props;
        const balance = wallets && Object.entries(wallets).length && market && user.email &&
            wallets[`${type === 'buy' ? market.quote_unit : market.base_unit}`].balance

        return (
            <div className={clsx(classes.orderBoxRoot, type === 'buy' ? classes.buyBackground : classes.buyBackground)}>

                <Hidden smDown implementation="css">
                    <div className={classes.header}>
                        <div
                            className={clsx(classes.circle, type === 'buy' ? classes.buyCircle : classes.sellCircle)}
                        />
                        <p className={clsx(classes.primaryText, classes.orderHeading)}>
                            {this.props.intl.formatMessage({ id: `page.body.trade.header.newOrder.content.tabs.${type}` })}
                        </p>
                    </div>
                </Hidden>

                <Grid container className={classes.orderMain} spacing={0}>

                    <Grid container item justify="flex-end">
                        {
                            user.email && market && Object.entries(wallets).length !== 0 &&
                            <span className={classes.orderText} onClick={() => type === 'buy' ? this.setPrice(balance) : this.props.onChangeAmount(balance)}>
                                <span className={classes.primaryNumber}> {toMinFixed(wallets[`${type === 'buy' ? market.quote_unit : market.base_unit}`].balance, 8)} </span>
                                <span className={classes.primaryText}> {(`${type === 'buy' ? market.quote_unit : market.base_unit}`).toUpperCase()} </span>
                            </span>
                        }
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            id="outlined-adornment-amount"
                            // type="number"
                            className={classes.orderTextField}
                            variant="outlined"
                            margin="dense"
                            value={price}
                            onChange={this.handleChangePrice}
                            InputProps={{
                                classes: {
                                    root: clsx(classes.textinput, classes.primaryNumber),
                                    notchedOutline: classes.notchedOutline,
                                },
                                startAdornment: <InputAdornment
                                    position="start"
                                    disableTypography={true}
                                    classes={{ root: classes.labelRoot }}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.price' })} {market ? market.quote_unit.toUpperCase() : ''}
                                </InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            id="outlined-adornment-amount"
                            className={classes.orderTextField}
                            // type="number"
                            variant="outlined"
                            margin="dense"
                            value={amount}
                            onChange={this.handleChangeAmount}
                            InputProps={{
                                classes: {
                                    root: clsx(classes.textinput, classes.primaryNumber),
                                    notchedOutline: classes.notchedOutline,
                                },
                                startAdornment: <InputAdornment
                                    position="start"
                                    disableTypography={true}
                                    classes={{ root: classes.labelRoot }}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.amount' })} {Object.entries(market).length !== 0 ? market.base_unit.toUpperCase() : ''}
                                </InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid container item justify="flex-end">
                        <div>
                            {
                                parseFloat(price) && parseFloat(amount) ?
                                    <p className={classes.orderText}>
                                        <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.total' })} ≈ </span>
                                        <span className={classes.primaryNumber}>{(parseFloat(price || 0) * parseFloat(amount || 0)).toFixed(8)}</span>
                                        <span className={classes.primaryText}> {market && market.quote_unit.toUpperCase()}</span>
                                    </p>
                                    :
                                    <p className={classes.orderText}>
                                        <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.minimum' })}</span>
                                        <span className={classes.primaryNumber}> {market.min_amount && market.min_amount}</span>
                                        <span className={classes.primaryText}> {market && market.base_unit.toUpperCase()}</span>
                                    </p>
                            }
                        </div>
                    </Grid>

                    <Grid container item>
                        <Button
                            disabled={!parseFloat(amount) || !parseFloat(price)}
                            fullWidth
                            variant="contained"
                            className={type === 'buy' ? classes.buyButton : classes.ordersellButton}
                            classes={{
                                disabled: type === 'buy' ? classes.disabledBuy : classes.disabledSell
                            }}
                            onClick={this.onCreateLimitOrder}
                        >
                            {this.props.intl.formatMessage({ id: `page.body.trade.header.newOrder.content.tabs.${type}` })} {this.props.intl.formatMessage({ id: `page.body.trade.header.newOrder.content.tabs.button` })}
                        </Button>
                    </Grid>

                </Grid>
            </div >
        );
    }
};

export default withStyles(styles)(OrderBox);
