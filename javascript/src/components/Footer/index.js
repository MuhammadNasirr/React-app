import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography/Typography";
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ListItemText from '@material-ui/core/ListItemText';
import { styles } from '../../styles/main';
import { changeLanguage } from '../../actions/translation';
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { host } from '../../config';

class Footer extends React.Component {

    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        anchorEl1: null
    }

    renderLanguageBtn = () => {
        const { classes, lang } = this.props;
        const { anchorEl1 } = this.state;
        const languageName = lang.toUpperCase();

        return (
            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="text"
                    onClick={this.handleLangClick}
                    className={classes.langBtn}
                    classes={{
                        root: classes.langRoot
                    }}
                >
                    {/* <img style={{ marginRight: 20 }} src={require(`../../assets/${lang}.svg`)} alt="en-flag" /> */}
                    <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 100, textTransform: 'none' }}>
                        <div>
                            {languageName === 'EN' ? 'English' : 'Spanish'}
                        </div>
                        <ArrowDownIcon className={classes.ArrowDownIcon} />
                    </Grid>
                </Button>
                <Menu
                    id="customized-menu"
                    anchorEl={anchorEl1}
                    keepMounted
                    open={Boolean(anchorEl1)}
                    onClose={this.handleClose}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    classes={{
                        paper: classes.menuLangPaper,
                        list: classes.menuList
                    }}
                >
                    <MenuItem
                        onClick={() => this.handleChangeLanguage('en')}
                        classes={{
                            root: lang !== 'ru' && lang !== 'es' ? classes.active : classes.inActive,
                            gutters: classes.langList
                        }}
                        disableGutters={false}
                    >
                        {/* <ListItemIcon>
                            <img className={classes.up} src={require('../../assets/en.svg')} alt="en-flag" />
                        </ListItemIcon> */}
                        <ListItemText
                            primary="English"
                            classes={{
                                primary: classes.langText
                            }}
                        />
                    </MenuItem>
                    {/* <MenuItem
                        onClick={() => this.handleChangeLanguage('ru')}
                        classes={{
                            root: lang !== 'en' && lang !== 'es' ? classes.active : classes.inActive,
                            gutters: classes.langList
                        }}
                        disableGutters={false}
                    >
                        <ListItemIcon>
                            <img className={classes.up} src={require('../../assets/ru.svg')} alt="ru-flag" />
                        </ListItemIcon>
                        <ListItemText
                            primary="RU"
                            classes={{
                                primary: classes.langText
                            }}
                        />
                    </MenuItem> */}
                    <MenuItem
                        onClick={() => this.handleChangeLanguage('es')}
                        classes={{
                            root: lang !== 'ru' && lang !== 'en' ? classes.active : classes.inActive,
                            gutters: classes.langList
                        }}
                        disableGutters={false}
                    >
                        {/* <ListItemIcon>
                            <img className={classes.up} src={require('../../assets/es.svg')} alt="ar-flag" />
                        </ListItemIcon> */}
                        <ListItemText
                            primary="Spanish"
                            classes={{
                                primary: classes.langText
                            }}
                        />
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
        this.setState({ anchorEl1: null });
    };

    handleLangClick = event => {
        this.setState({ anchorEl1: event.currentTarget });
    };

    handleClose = () => this.setState({ anchorEl: null, menuAnchorEl: null, anchorEl1: null });

    render() {
        const { classes, user } = this.props;

        return (
            <div className={classes.footerDiv}>
                <div className={classes.footer}>
                    <Grid
                        container
                        style={{ width: '100%' }}
                        classes={{
                            root: classes.footerGrid
                        }}
                    >
                        <Grid item xs={12} sm={12} md={3} lg={3} style={{ textAlign: 'left' }}>
                            <Grid item container direction="column" className={classes.footerdividerhorizotal} spacing={1}>
                                <Grid item xs={12} sm={7}>
                                    <Typography variant="subtitle1" className={classes.primaryText} style={{ fontSize: 20 }}>
                                        {this.props.intl.formatMessage({ id: 'page.footer.yourInvestor' })}
                                    </Typography>
                                </Grid>
                                {
                                    !(user && user.email) &&
                                    <Grid item className={classes.buttonGrid}>
                                        <Grid item className={classes.footerSignupGrid}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                component={Link}
                                                to={`/signup`}
                                                variant="contained"
                                                className={classes.footerSignupButton}
                                            >
                                                {this.props.intl.formatMessage({ id: 'page.header.signUp' })}
                                            </Button>
                                        </Grid>
                                        <Grid item className={classes.footerSignupGrid}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                component={Link}
                                                to={`/login`}
                                                variant="contained"
                                                className={classes.footerLoginButton}
                                            >
                                                {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.login' })}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3} style={{ textAlign: 'left' }}>
                            <Grid item container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="subtitle1" className={classes.primaryText} style={{ fontSize: 20 }}>
                                        {this.props.intl.formatMessage({ id: 'page.footer.features' })}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link className={classes.loginFooter} to={"/support"} >{this.props.intl.formatMessage({ id: 'page.footer.support' })}</Link>
                                </Grid>
                                <Grid item>
                                    <Link className={classes.loginFooter} to="/account-management">{this.props.intl.formatMessage({ id: 'page.footer.accountManagement' })}</Link>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.loginFooter} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.feeSchedule' })}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.loginFooter} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.depositOption' })}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.loginFooter} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.feeSchedule' })}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.loginFooter} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.OTC' })}</Typography>
                                </Grid>
                                <Grid item>
                                    <Link className={classes.loginFooter} to="/security">{this.props.intl.formatMessage({ id: 'page.footer.security' })}</Link>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.loginFooter} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.helpDesk' })}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3} style={{ textAlign: 'left' }}>
                            <Grid item container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="subtitle1" className={classes.primaryText} style={{ fontSize: 20 }}>
                                        {this.props.intl.formatMessage({ id: 'page.footer.help' })}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <a className={clsx(classes.loginFooter)} href={`${host}/faq`} target="blank" rel="noopener noreferrer" >{this.props.intl.formatMessage({ id: 'page.footer.frequent' })}</a>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" className={classes.primaryText} style={{ fontSize: 20, marginTop: 20 }}>
                                        {this.props.intl.formatMessage({ id: 'page.footer.learn' })}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}>{this.props.intl.formatMessage({ id: 'page.footer.buyBitcoin' })}</span>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}> {this.props.intl.formatMessage({ id: 'page.footer.buyEthereum' })}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3} style={{ textAlign: 'left' }}>
                            <Grid item container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="subtitle1" className={classes.primaryText} style={{ fontSize: 20 }}>
                                        Kapytal
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}>{this.props.intl.formatMessage({ id: 'page.footer.whyKapital' })}</span>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}>{this.props.intl.formatMessage({ id: 'page.footer.careers' })}</span>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}>{this.props.intl.formatMessage({ id: 'page.footer.contact' })}</span>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}>{this.props.intl.formatMessage({ id: 'page.footer.press' })}</span>
                                </Grid>
                                <Grid item>
                                    <span className={clsx(classes.loginFooter)}>{this.props.intl.formatMessage({ id: 'page.footer.affiliates' })}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.footerdivider}></div>
                <Grid container item direction="row" style={{ marginBottom: 70, marginTop: 0 }} xs={10} md={10}>
                    <Grid item style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} xs={12} md={5}>
                        <img width="150px" height="40px" alt="logo" src={require('../../assets/kapytal-horizontal.png')} />
                        <div className={classes.socialIcons}>
                            <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/kapytalio">
                                <TwitterIcon className={classes.socialIcon} />
                            </a>
                            <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/kapytalio">
                                <FacebookIcon className={classes.socialIcon} />
                            </a>
                            <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/company/kapytalio/">
                                <LinkedInIcon className={classes.socialIcon} />
                            </a>
                            <a rel="noopener noreferrer" target="_blank" href="https://t.me/KapytalExchange">
                                <TelegramIcon className={classes.socialIcon} />
                            </a>
                        </div>
                    </Grid>
                    <Grid item container alignItems="center" xs={false} md={1} />
                    <Grid item container alignItems="center" xs={12} md={6}>
                        <Grid item style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'flex-end' }} xs={12} md={12}>
                            <Grid item>
                                <Typography className={classes.primaryText} variant="subtitle1" style={{ fontSize: 11, textAlign: 'left' }}>
                                    © <span className={classes.primaryNumber}>2017-2020</span> OMIEX S.A.P.I. DE C.V.
                            </Typography>
                                <Grid item>
                                    <Link className={classes.loginFooter} style={{ fontSize: 11, textDecoration: 'underline' }} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.privacyNotice' })}</Link>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Link className={classes.loginFooter} style={{ fontSize: 11, textDecoration: 'underline' }} to="/terms">{this.props.intl.formatMessage({ id: 'page.footer.termsofService' })}</Link>
                            </Grid>
                            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                <Typography className={clsx(classes.primaryText, classes.Language)} variant="subtitle1">
                                    {this.props.intl.formatMessage({ id: 'page.footer.language' })}
                                </Typography>
                                {this.renderLanguageBtn()}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeLanguage: payload => dispatch(changeLanguage(payload)),
    };
}

export default compose(
    withStyles(styles),
    connect(state => ({
        lang: state.i18n.lang,
        user: state.user.data,
    }), mapDispatchToProps),
)(injectIntl(Footer));