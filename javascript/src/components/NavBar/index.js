/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import { injectIntl } from 'react-intl';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { getMatch } from '../../utils'
import Typography from "@material-ui/core/Typography/Typography";
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';
import MoreIcon from '@material-ui/icons/MoreVert';

import MYCE from '../../assets/MYCELOGO_WHITE-BRAND.png';
import KAPYTAL from '../../assets/kapytal-horizontal.png';

import { marketSelection, setBase, fetchTickers, setFee, setPrecision } from '../../actions/trade';
import SelectCurrency from '../../components/Trading/SelectCurrency'
import { fetchLogout } from '../../actions/auth';
import { changeLanguage } from '../../actions/translation';
import { styles, main_solid_colors } from '../../styles/main'

const publicRoutes = [
  'login',
  'signup',
  'forgot',
  'accounts',
  'email-verification',
  'profile',
  'help',
  'wallets',
  'trade',
  'faq',
  'terms',
  'security',
  'support',
  'account-management',
  ''
];

const landingPageRoutes = [
  '/security',
  '/support',
  '/account-management',
  '/accounts/password_reset',
  '/'
];

class NavBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    anchorEl1: null
  };

  componentDidMount() {
    this.getCurrentRoute()
  }

  handleMenuClick = event => this.setState({ menuAnchorEl: event.currentTarget });

  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null, menuAnchorEl: null, anchorEl1: null });

  logoutUser = () => {
    this.props.fetchLogout();
    this.setState({ anchorEl: null, mobileMoreAnchorEl: null });
  };

  goBack = () => {
    const { history, location } = this.props;

    if (location.search.length > 0) {
      history.push({
        ...location,
        pathname: location.pathname.slice(0, location.pathname.lastIndexOf('/')),
        search: ''
      });
    }
  }

  getCurrentRoute = () => {
    var pathname = window.location.pathname;
    pathname.indexOf(1);
    pathname.toLowerCase();
    pathname = pathname.split("/")[1];
    return pathname
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleLangClick = event => {
    this.setState({ anchorEl1: event.currentTarget });
  };

  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language);
    this.setState({ anchorEl1: null });
  };

  render() {
    const { classes, user, location, activeWallet, lang, wallets } = this.props;
    const { menuAnchorEl, mobileMoreAnchorEl } = this.state;
    const pathname = this.getCurrentRoute();

    let value = 0;
    if (location.pathname === '/trading') {
      value = 0
    }
    if (location.pathname === '/trade') {
      value = 1
    }
    if (location.pathname.indexOf('/wallets') >= 0) {
      value = 2
    }
    if (location.pathname === '/history') {
      value = 3
    }
    if (location.pathname === '/profile' || location.pathname === '/confirm') {
      value = 4
    }
    if (location.pathname === '/help') {
      value = 5
    }

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
        classes={{
          paper: classes.mobileMenuPaper
        }}
      >

        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to={`/wallets`}>
          {/* <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            style={{ paddingLeft: 0 }}
          >
            <WalletIcon />
          </IconButton> */}
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.body.wallets.balance' })}</p>
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to="/history">
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.header.navbar.history' })}</p>
        </MenuItem>


        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to="/trade">
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.buy' })}</p>
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to={`/trading/${this.props.markets.length && this.props.markets[0].id.toUpperCase()}`}>
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.header.navbar.Trade' })}</p>
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to="/profile">
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.header.navbar.profile' })}</p>
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to="/help">
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.header.navbar.help' })}</p>
        </MenuItem>

        <MenuItem onClick={this.logoutUser}>
          <p className={classes.secondaryText} style={{ paddingRight: 12 }}>{this.props.intl.formatMessage({ id: 'page.header.navbar.logout' })}</p>
        </MenuItem>

      </Menu>
    );

    const menuButton = (
      <IconButton
        color="inherit"
        aria-label="Menu"
        className={classes.hoverTransparent}
        aria-owns={menuAnchorEl ? 'nav-menu' : undefined}
        aria-haspopup="true"
        onClick={() => this.props.history.push('/')}
      >
        <img alt="KAPYTAL" className={classes.logoHeight} src={KAPYTAL} />
      </IconButton>
    );

    return (
      <div>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Hidden mdUp implementation="css">
              {
                (location.pathname.indexOf('/wallet') >= 0) && activeWallet ?
                  (
                    <IconButton color="inherit" onClick={this.goBack}>
                      <BackIcon className={classes.basicText} />
                    </IconButton>
                  ) : menuButton
              }
            </Hidden>
            <Hidden smDown implementation="css">
              {menuButton}
            </Hidden>
            <Hidden mdUp implementation="css">
              <Typography variant="h2" className={classes.basicText} color="inherit">
                {getMatch({
                  '/wallets': activeWallet ? (
                    (wallets[activeWallet] && wallets[activeWallet].name) || 'Ethereum'
                  ) : 'Wallets'
                }, location.pathname, true)}
              </Typography>
            </Hidden>

            {
              !publicRoutes.includes(pathname) &&
              <div>
                <SelectCurrency
                  history={this.props.history}
                  intl={this.props.intl}
                />
              </div>
            }

            <div className={classes.grow} />
            <Hidden smDown implementation="js">
              <Tabs indicatorColor="secondary"
                value={value}
                classes={{
                  flexContainer: classes.tabsFlexContainer,
                  root: classes.antTabsRoot,
                  indicator: location.pathname === '/faq' || location.pathname === '/terms' ? classes.navTabsIndicatorFaq : classes.navTabsIndicator
                }}>
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.header.navbar.Trade' })}
                    // icon={<TradeIcon />}
                    component={Link}
                    to={`/trading/${this.props.markets.length && this.props.markets[0].id.toUpperCase()}`}
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.buy' })}
                    component={Link}
                    to="/trade"
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.body.wallets.balance' })}
                    component={Link}
                    to={`/wallets`}
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.header.navbar.history' })}
                    component={Link}
                    to={`/history`}
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.header.navbar.profile' })}
                    component={Link}
                    to="/profile"
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.header.navbar.help' })}
                    component={Link}
                    to="/help"
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
                {
                  user && user.email &&
                  <Tab
                    label={this.props.intl.formatMessage({ id: 'page.header.navbar.logout' })}
                    onClick={this.logoutUser}
                    classes={{
                      root: classes.navTabRoot,
                      selected: location.pathname === '/faq' || location.pathname === '/terms' ? classes.tabNotActive : classes.tabActive
                    }}
                  />
                }
              </Tabs>
              {
                ((!(user && user.email) && landingPageRoutes.includes(location.pathname))) &&
                <Button
                  type="submit"
                  fullWidth
                  component={Link}
                  to={`/signup`}
                  variant="contained"
                  className={classes.startButton}
                >
                  {this.props.intl.formatMessage({ id: 'page.header.navbar.start' })}
                </Button>
              }
            </Hidden>

            <div className={classes.sectionMobile}>
              {
                user && user.email &&
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                >
                  <MoreIcon className={classes.moreOption} />
                </IconButton>
              }
              {
                ((!(user && user.email) && landingPageRoutes.includes(location.pathname))) &&
                <Button
                  type="submit"
                  fullWidth
                  component={Link}
                  to={`/signup`}
                  variant="contained"
                  className={classes.startButton}
                >
                  {this.props.intl.formatMessage({ id: 'page.header.navbar.start' })}
                </Button>
              }
            </div>

          </Toolbar>
        </AppBar>

        {renderMobileMenu}

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    marketSelection: market => dispatch(marketSelection(market)),
    setBase: base => dispatch(setBase(base)),
    setFee: (ask_fee, bid_fee) => dispatch(setFee(ask_fee, bid_fee)),
    setPrecision: (amount_precision, price_precision) => dispatch(setPrecision(amount_precision, price_precision)),
    fetchTickers: market => dispatch(fetchTickers(market)),
    fetchLogout: () => dispatch(fetchLogout()),
    changeLanguage: payload => dispatch(changeLanguage(payload)),
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(state => ({
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet,
    markets: state.trade.markets,
    tickers: state.trade.tickers,
    market: state.trade.market,
    base: state.trade.base,
    user: state.user.data,
    lang: state.i18n.lang,
  }), mapDispatchToProps),
)(injectIntl(NavBar));
