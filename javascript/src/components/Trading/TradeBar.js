import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar/Avatar';

import { styles } from '../../styles/main'


class TradeBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        }
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    splitByDecimal = (value) => {
        const precision = '00000000';
        const trimmed = eval(value);
        const split_value = trimmed.toString().split('.');
        const part1 = parseFloat(split_value[0]);
        const part2 = split_value[1];
        const zeroes = part2 ? precision.substr(part2.toString().length) : precision

        return (
            <div style={{ display: 'inherit' }}>
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

    render() {
        const { classes, wallets, tickers, market } = this.props;
        const { open } = this.state;
        const { list } = tickers
        const data = list && Object.entries(list).length !== 0 &&
            list.constructor === Object &&
            list[`${market.id.toLowerCase()}`];

        return (
            <div className={classes.tradeBarRoot}>
                <AppBar
                    position="static"
                    classes={{
                        root: classes.tradeBar
                    }}
                >
                    <Toolbar
                        classes={{
                            root: classes.tradeToolbar,
                            gutters: classes.toolbarGutters
                        }}
                    >
                        {
                            data && data.ticker &&
                            <React.Fragment>
                                <Hidden smDown implementation="css">
                                    <div style={{ marginRight: 20 }}>
                                        <h4 className={classes.primaryText}>
                                            {market.base_unit.toUpperCase()}
                                        </h4>
                                    </div>
                                </Hidden>
                                <div>
                                    <h4>
                                        <span
                                            className={clsx(
                                                classes.marketValue,
                                                classes.primaryNumber,
                                                parseFloat(data.ticker.price_change_percent) >= 0 ? classes.positiveChange : classes.negativeChange
                                            )}>
                                            {data.ticker.price_change_percent}
                                        </span>
                                        <span className={clsx(classes.heading,classes.tabbarTabNumber)}> 24</span>
                                        <span className={classes.heading}> h {this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.change' })}</span>
                                    </h4>
                                </div>
                                <div className={classes.statusItem}>
                                    <h4>
                                        <span className={clsx(classes.primaryNumber, classes.marketValue)}>{this.splitByDecimal(parseFloat(data.ticker.last).toFixed(8))}</span>
                                        <span className={clsx(classes.primaryText, classes.marketValue)}> {market.quote_unit.toUpperCase()} </span>
                                        <span style={{ fontSize: 13 }} className={classes.heading}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.last_price' })}</span>
                                    </h4>
                                </div>
                                <div className={classes.statusItem}>
                                    <h4>
                                        <span className={clsx(classes.primaryNumber, classes.marketValue)}>{this.splitByDecimal(parseFloat(data.ticker.vol).toFixed(8))}</span>
                                        <span className={clsx(classes.primaryText, classes.marketValue)}> {market.base_unit.toUpperCase()} </span>
                                        <span className={clsx(classes.heading,classes.tabbarTabNumber)}> 24</span>
                                        <span className={classes.heading}>h {this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.volume' })}</span>
                                    </h4>
                                </div>
                            </React.Fragment>
                        }

                        <div className={classes.grow} />

                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                            open={open}
                            onClose={this.handleRequestClose}
                            classes={{
                                paper: classes.menuPaper
                            }}
                        >
                            <MenuItem
                                dense
                                classes={{
                                    root: classes.balanceListHeader
                                }}>
                                <div>{this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.assets' })}</div>
                                <div>{this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.totalBalance' })}</div>
                            </MenuItem>

                            {Object.entries(wallets).map(([currency, data], key) => (
                                <MenuItem
                                    key={key}
                                    classes={{
                                        root: classes.balanceListItem
                                    }}>
                                    <div className={classes.assetsTab}>
                                        <div className={classes.assetIcon}>
                                            <Avatar
                                                src={data.icon_url}
                                                className={classes.coinImg}
                                            />
                                        </div>
                                        <div>
                                            {data.name}
                                        </div>
                                    </div>
                                    <div>{parseFloat(data.balance).toFixed(data.precision)}</div>
                                </MenuItem>
                            ))
                            }

                            <MenuItem
                                classes={{
                                    root: classes.balanceListFooter
                                }}
                            >
                                <Button
                                    size="small"
                                    variant="contained"
                                    component="span"
                                    className={classes.viewWalletButton}
                                    onClick={() => this.props.history.push('/wallets')}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.totalBalance' })}
                                </Button>
                            </MenuItem>

                        </Menu>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

export default withStyles(styles)(TradeBar);
