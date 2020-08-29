/* eslint-disable */
import React, { Component } from 'react';
import Layout from '../Layout';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../styles/main'
import { injectIntl } from 'react-intl';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            defi: true,
            buy: false,
            exchange: false,
            easy: true,
            free: false,
            safe: false,
        }
    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <div className={classes.fullWidth}>
                    <section>
                        <div className={classes.section}>
                            <Grid item container xs={12} md={12} className={classes.earnGrid} direction="row" alignItems="center" justify="center" >
                                <Grid item container className={clsx(classes.sectionsBackground, classes.investOuterGrid)} justify={'center'} sm={6}>
                                    <Grid item container className={clsx(classes.earnSection, classes.investOuterGrid)} sm={10}>
                                        <Typography component="h2" variant="h2" className={clsx(classes.mt10, classes.secondaryText, classes.fontBold, classes.fullWidth, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.firstBoxHead' })}
                                        </Typography>
                                        <Typography component="h5" variant="h5" className={clsx(classes.secondaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.firstBoxSubHead' })}
                                        </Typography>
                                        <Grid item container sm={10} className={classes.mobileHCenter}>
                                            <IconButton aria-label="delete" className={classes.arrowDownBtn} size="small">
                                                <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={1500}>
                                                    <KeyboardArrowDown className={classes.arrowDown} fontSize="inherit" />
                                                </Link>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <div className={classes.imageDiv1}>
                                    <img className={classes.earnFirst} src={require("../../assets/bermix-studio.jpg")} />
                                </div>
                            </Grid>
                        </div>
                    </section>
                    <section id="section2">
                        <Element name="firstInsideContainer" className={classes.section}>
                            <Grid item container md={12} xs={12} className={classes.investGrid}>
                                <Grid item sm={6} className={classes.imageDiv1}>
                                    <img className={classes.earn} src={require("../../assets/christian-buehner.jpg")} />
                                </Grid>
                                <Grid item container className={classes.investOuterGrid} justify="center" sm={6}>
                                    <Grid item container className={classes.investOuterGrid} sm={10}>
                                        <Typography component="h2" variant="h2" className={clsx(classes.mt10, classes.primaryTextBold, classes.fullWidth, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.secondBoxHead' })}
                                        </Typography>
                                        <Typography variant="h5" className={clsx(classes.primaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.secondBoxSubHead' })}
                                        </Typography>
                                        <Typography variant="h5" className={clsx(classes.primaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.secondBoxSubHead1' })}
                                        </Typography>
                                        {/* <Grid item container sm={10} className={classes.mobileHCenter}>
                                            <IconButton aria-label="delete" className={classes.arrowDownBtn} size="small">
                                                <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={1500}>
                                                    <KeyboardArrowDown className={clsx(classes.primaryText, classes.arrowDown)} fontSize="inherit" />
                                                </Link>
                                            </IconButton>
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Element>
                    </section>
                    {/* <section>
                        <Element name="secondInsideContainer" className={classes.section}>
                            <Grid item container md={12} xs={12} className={classes.sendGrid}>
                                <Grid item container className={clsx(classes.sectionsBackground, classes.investOuterGrid)} justify={'center'} sm={6}>
                                    <Grid item container className={classes.investOuterGrid} sm={10}>
                                        <Typography component="h2" variant="h2" className={clsx(classes.mt20, classes.fullWidth, classes.secondaryText, classes.fontBold, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.invest' })}
                                        </Typography>
                                        <Typography component="h5" variant="h5" className={clsx(classes.secondaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.majorInvest' })}
                                        </Typography>
                                        <Grid item container sm={10} className={classes.mobileHCenter}>
                                            <IconButton aria-label="delete" className={classes.arrowDownBtn} size="small">
                                                <Link activeClass="active" to="thirdInsideContainer" spy={true} smooth={true} duration={1500}>
                                                    <KeyboardArrowDown className={classes.arrowDown} fontSize="inherit" />
                                                </Link>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={6} className={classes.imageDiv1}>
                                    <img className={classes.earn} src={require("../../assets/caroline-minor-christensen-1.jpg")} />
                                </Grid>
                            </Grid>
                        </Element>
                    </section>
                    <section>
                        <Element name="thirdInsideContainer" className={classes.section}>
                            <Grid item container md={12} xs={12} className={classes.investGrid}>
                                <Grid item sm={6} className={classes.imageDiv1}>
                                    <img className={classes.earn} src={require("../../assets/al-nik.jpg")} />
                                </Grid>
                                <Grid item container className={classes.investOuterGrid} justify="center" sm={6}>
                                    <Grid item container className={classes.investOuterGrid} sm={10}>
                                        <Typography component="h2" variant="h2" className={clsx(classes.mt10, classes.fullWidth, classes.primaryTextBold, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.simple' })}
                                        </Typography>
                                        <Typography component="h5" variant="h5" className={clsx(classes.primaryText, classes.fullWidth, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.sendMoney' })}
                                        </Typography>
                                        <Grid item container sm={10} className={classes.mobileHCenter}>
                                            <IconButton aria-label="delete" className={classes.arrowDownBtn} size="small">
                                                <Link activeClass="active" to="forthInsideContainer" spy={true} smooth={true} duration={1500}>
                                                    <KeyboardArrowDown className={clsx(classes.primaryText, classes.arrowDown)} fontSize="inherit" />
                                                </Link>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Element>
                    </section>
                    <section>
                        <Element name="forthInsideContainer" className={clsx(classes.sectionsBackground, classes.exploreSection)}>
                            <div className={classes.leftDiv}>
                                <div className={classes.textBox}>
                                    <div className={classes.textBoxInner}>
                                        <Typography component="h2" variant="h2" className={clsx(classes.secondaryText, classes.fontBold, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.explore' })}
                                        </Typography>
                                        <Typography component="h5" variant="h5" className={clsx(classes.secondaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.landing.aWorld' })}
                                        </Typography>
                                    </div>
                                </div>
                                <div className={classes.firstBox}>
                                    <div className={classes.greenBox}>
                                        <img width="100%" height="100%" src={require("../../assets/aleksandar-popovski.jpg")} />
                                    </div>
                                    <div className={classes.lightPurpleBox}>
                                        <img width="100%" height="100%" src={require("../../assets/kreated-media.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.secondBox}>
                                    <div className={classes.transparentBox}></div>
                                    <div className={classes.blueBox}>
                                        <img width="100%" height="100%" src={require("../../assets/jurica-koletic.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.secondBox}>
                                    <div className={classes.greyBox}></div>
                                </div>
                            </div>
                            <div className={classes.rightDiv}>
                                <div className={classes.firstBoxRight}>
                                    <div className={classes.lightBlueBox}>
                                        <img width="100%" height="100%" src={require("../../assets/aatik-tasneem.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.firstBoxRight}>
                                    <div className={classes.orangeBox}></div>
                                    <div className={classes.greyBox1}></div>
                                </div>
                                <div className={classes.firstBoxRight}>
                                    <div className={classes.lightBlueBox}>
                                        <img width="100%" height="fit-content" src={require("../../assets/david-siglin.jpg")} />
                                    </div>
                                    <div className={classes.transparentBox}></div>
                                    <div className={classes.greyBox2}></div>
                                    <div className={classes.navyBlueBox}>
                                        <img width="100%" src={require("../../assets/paola-aguilar.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.secondBox}>
                                    <div className={classes.transparentBox}></div>
                                    <div className={classes.whiteBox}>
                                        <img width="100%" height="fit-content" src={require("../../assets/mile-modic.jpg")} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.leftDivMobile}>
                                <div className={classes.textBoxMobile}>
                                    <Typography component="h2" variant="h2" className={clsx(classes.secondaryTextBold, classes.textcenter, classes.taglineMobile)}>
                                        {this.props.intl.formatMessage({ id: 'page.body.landing.explore' })}
                                    </Typography>
                                    <Typography component="h5" variant="h5" className={clsx(classes.secondaryTextBold, classes.investText, classes.mt20)}>
                                        {this.props.intl.formatMessage({ id: 'page.body.landing.aWorld' })}
                                    </Typography>
                                </div>
                                <div className={classes.firstBox}>
                                    <div className={classes.lightBlueBoxMobile}>
                                        <img width="100%" height="100%" src={require("../../assets/aatik-tasneem.jpg")} />
                                    </div>
                                    <div className={classes.greyBoxMobile}></div>
                                </div>
                                <div className={classes.secondBoxMobile}>
                                    <div className={classes.transparentBoxMobile}></div>
                                    <div className={classes.orangeBoxMobile}></div>
                                </div>
                                <div className={classes.firstBox}>
                                    <div className={classes.greenBoxMobile}>
                                        <img width="100%" height="100%" src={require("../../assets/aleksandar-popovski.jpg")} />
                                    </div>
                                    <div className={classes.lightPurpleBoxMobile}>
                                        <img width="100%" height="100%" src={require("../../assets/kreated-media.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.firstBox}>
                                    <div className={classes.blueBoxMobile}>
                                        <img width="100%" height="100%" src={require("../../assets/jurica-koletic.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.firstBox}>
                                    <div className={classes.transparentBoxMobile}></div>
                                    <div className={classes.blueBoxMobile}>
                                        <img width="100%" height="auto" src={require("../../assets/david-siglin.jpg")} />
                                    </div>
                                    <div className={classes.greyBoxMobile1}></div>
                                    <div className={classes.navyBlueBoxMobile}>
                                        <img width="100%" height="100%" src={require("../../assets/paola-aguilar.jpg")} />
                                    </div>
                                </div>
                                <div className={classes.firstBox}>
                                    <div className={classes.greyBoxMobile3}></div>
                                    <div className={classes.transparentBoxMobile}></div>
                                    <div className={classes.whiteBoxMobile}>
                                        <img width="100%" height="100%" src={require("../../assets/mile-modic.jpg")} />
                                    </div>
                                    <div className={classes.transparentBoxMobile}></div>
                                </div>
                            </div>
                        </Element>
                    </section> */}
                </div>
            </Layout>
        );

    }
}

export default withStyles(styles)(injectIntl(LandingPage));
