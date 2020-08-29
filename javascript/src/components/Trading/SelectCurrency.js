import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import Divider from '@material-ui/core/Divider';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import {
    setMarket,
    fetchDepth
}
    from '../../actions/tradeV2';
import { styles } from '../../styles/main';
import {
    marketSelection,
    setBase,
    setFee,
    setPrecision,
    fetchTickers
} from '../../actions/trade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

class SelectCurrency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            activeCurrency: '',
            filter: '',
        }
    }

    componentWillReceiveProps() {
        if (!this.state.activeCurrency && this.props.markets.length) {
            const groupedMarkets = this.groupBy(this.props.markets, 'quote_unit');
            const quote_currencies = Object.keys(groupedMarkets);
            this.setState({ activeCurrency: quote_currencies[0] })
        }
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    getCurrentRoute = () => {
        var pathname = window.location.pathname;
        pathname.indexOf(1);
        pathname.toLowerCase();
        pathname = pathname.split("/")[1];
        return pathname
    }

    onSelect = (market) => {
        this.setState({ open: false });
        this.props.setMarket(market);
        if (this.getCurrentRoute() === 'trading') {
            this.props.history.push(`/trading/${market.id.toUpperCase()}`)
        }
        this.props.marketSelection(market.base_unit)                                        // Selecting ask value
        this.props.fetchDepth(market.id);                                                          // Getting asks and bid depths
        this.props.setBase(market.quote_unit)                                             // Setting bid value
        // this.props.setFee(selectedMarket.ask_fee, selectedMarket.bid_fee)                       // Setting ask fee and bid fee
        this.props.setFee(0, 0);
        this.props.setPrecision(market.amount_precision, market.price_precision)     // Setting ask fee and bid fee
        this.props.fetchTickers(market.id)                                                         // Getting price value
    }

    isEven(n) {
        return n % 2 === 0;
    }

    groupBy = (objectArray, property) => {
        return objectArray.reduce(function (acc, obj) {
            var key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    onFilter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ filter: e.target.value })
    }

    render() {
        const { classes, markets, market, tickers } = this.props;
        const { open, activeCurrency, filter } = this.state;
        const { list } = tickers;
        const isValid = list && Object.entries(list).length !== 0 && list.constructor === Object
        const groupedMarkets = this.groupBy(markets, 'quote_unit');
        groupedMarkets['All'] = markets;
        const quote_currencies = Object.keys(groupedMarkets);
        const regex = new RegExp(filter, "gi");

        return (
            <React.Fragment>
                <div className={clsx(classes.selectedMarket, open ? classes.marketActive : null)} onClick={this.handleClick}>
                    <div className={classes.showMarket}>
                        {this.props.intl.formatMessage({ id: `page.header.navbar.market` })}
                    </div>
                    <IconButton className={classes.marketArrowIcon} aria-label="delete">
                        <ArrowDown />
                    </IconButton>
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    onClose={this.handleRequestClose}
                    classes={{
                        paper: classes.menuPaperSelect
                    }}
                >
                    <div tabIndex={null} style={{
                        display: 'flex',
                        width: '95%',
                        margin: '0 auto',
                        marginBottom: '10px',
                        justifyContent: 'space-between'
                    }}>

                        <Typography variant="subtitle1" className={classes.primaryText} >
                            {activeCurrency.toUpperCase()} {this.props.intl.formatMessage({ id: `page.header.navbar.market` })}
                        </Typography>

                        <form className={classes.textField} noValidate autoComplete="off">
                            {/* <InputLabel htmlFor="filter-coins" style={{ color: 'white' }}>Filter</InputLabel> */}
                            <Input
                                placeholder={this.props.intl.formatMessage({ id: `page.header.navbar.filter` })}
                                disableUnderline={true}
                                value={filter}
                                classes={{
                                    underline: classes.underline,
                                    input: classes.primaryTextBold
                                }}
                                className={clsx(classes.buyInput, classes.textinput)}
                                onChange={(e) => this.onFilter(e)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            style={{ color: '#fff' }}
                                            aria-label="toggle password visibility"
                                        >
                                            <Search className={classes.primaryText} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </form>
                    </div>

                    <div tabIndex={null} style={{
                        display: 'flex',
                        width: '95%',
                        margin: '0 auto',
                        marginBottom: '10px'
                    }}>
                        {
                            quote_currencies.map((currency, i) => (
                                <div key={i} style={{ marginRight: 5 }}>
                                    <Button variant="contained" size="small" className={activeCurrency === currency ? classes.marketActiveButton : null} onClick={() => this.setState({ activeCurrency: currency })}>
                                        {currency}
                                    </Button>
                                </div>
                            ))
                        }
                    </div>

                    <Divider style={{
                        border: '1px solid rgba(234,239,245,.1)',
                        width: '95%',
                        margin: '0 auto'
                    }} />

                    <MenuItem
                        tabIndex={null}
                        dense={true}
                        classes={{
                            root: classes.marketListHeader
                        }}>
                        <div className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.market' })}</div>
                        <div className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.price' })}</div>
                    </MenuItem>

                    {
                        activeCurrency && markets.length &&
                        groupedMarkets[activeCurrency]
                            .filter(x => x.base_unit.match(regex))
                            .map((market, i) => (
                                <MenuItem
                                    tabIndex={null}
                                    key={i}
                                    onClick={() => this.onSelect(market)}
                                    className={this.isEven(i) ? classes.marketitemColor : ''}
                                    classes={{
                                        root: this.props.market.name === market.name?clsx(classes.marketListItem,classes.activeMarketList): classes.marketListItem
                                    }}>
                                    <div className={classes.assetsTab}>
                                        <div className={classes.primaryText}>
                                            {market.name}
                                        </div>
                                    </div>
                                    {
                                        isValid &&
                                        <div className={classes.primaryNumber}>
                                            {list[`${market.id}`] && list[`${market.id}`].ticker.last}
                                        </div>
                                    }
                                </MenuItem>
                            ))
                    }
                    {
                        markets && market.length === 0 &&
                        <div className={classes.primaryText} style={{ textAlign: 'center' }}>{this.props.intl.formatMessage({ id: 'page.body.markets.unavailable' })}</div>
                    }
                </Menu>
            </React.Fragment>

        );
    }
};

function mapStateToProps(state) {
    return {
        markets: state.trade.markets,
        market: state.tradev2.market,
        tickers: state.tradev2.allTickers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setMarket: (market) => dispatch(setMarket(market)),
        marketSelection: market => dispatch(marketSelection(market)),
        setFee: (ask_fee, bid_fee) => dispatch(setFee(ask_fee, bid_fee)),
        fetchTickers: market => dispatch(fetchTickers(market)),
        setBase: base => dispatch(setBase(base)),
        setPrecision: (amount_precision, price_precision) => dispatch(setPrecision(amount_precision, price_precision)),
        fetchDepth: market => dispatch(fetchDepth(market))
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(injectIntl(SelectCurrency));
