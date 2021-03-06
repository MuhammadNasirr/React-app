/* eslint-disable */
import React, { Component } from 'react';
import Layout from '../Layout';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../styles/main'
import { injectIntl } from 'react-intl';
import clsx from 'clsx';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll'

class SecurityPage extends Component {

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
                            <Grid item container md={12} xs={12} className={classes.investGrid}>
                                <Grid item sm={6} className={classes.imageDiv1}>
                                    <img className={classes.earn} src={require("../../assets/tim-evans.jpg")} />
                                </Grid>
                                <Grid item container className={classes.investOuterGrid} justify="center" sm={6}>
                                    <Grid item container className={classes.investOuterGrid} sm={10}>
                                        <Typography component="h2" variant="h2" className={clsx(classes.primaryTextBold, classes.fullWidth, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.security.firstBoxHead' })}
                                        </Typography>
                                        <Typography variant="h5" className={clsx(classes.primaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.security.firstBoxSubHead' })}
                                        </Typography>
                                    </Grid>
                                    <Grid item container sm={10} className={classes.mobileHCenter}>
                                        <IconButton aria-label="delete" className={classes.arrowDownBtn} size="small">
                                            <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={1500}>
                                                <KeyboardArrowDown className={clsx(classes.primaryText, classes.arrowDown)} fontSize="inherit" />
                                            </Link>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                    <section>
                        <Element name="secondInsideContainer" className={classes.section}>
                            <Grid item container justify="center" sm={9}>
                                <Grid item container className={classes.secureFeature}>
                                    <Typography component="h1" variant="h1" className={clsx(classes.basicTextBold)}>
                                        {this.props.intl.formatMessage({ id: 'page.body.security.security' })}
                                    </Typography>
                                    <Typography component="h1" variant="h1" style={{ marginLeft: 5 }} className={clsx(classes.primaryText)}>
                                        {this.props.intl.formatMessage({ id: 'page.body.security.features' })}
                                    </Typography>
                                </Grid>
                                <Grid item container className={classes.featuresGrid} sm={12}>
                                    <Grid item container className={classes.features}  alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features1' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container className={classes.features}  alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features2' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container className={classes.featuresGrid} sm={12}>
                                    <Grid item container className={classes.features} alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features3' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container className={classes.features} alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features4' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container className={classes.featuresGrid} sm={12}>
                                    <Grid item container className={classes.features} alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features5' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container className={classes.features} alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features6' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container className={classes.featuresGrid} sm={12}>
                                    <Grid item container className={classes.features} alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features7' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container className={classes.features} alignItems="center" sm={6}>
                                        <Grid item className={classes.checkIconGrid}>
                                            <CheckIcon className={classes.securityCheckicon} />
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                            <Typography component="h3" variant="h3" className={clsx(classes.primaryText)}>
                                                {this.props.intl.formatMessage({ id: 'page.body.security.features8' })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Element>
                    </section>

                </div>
            </Layout>
        );

    }
}

export default withStyles(styles)(injectIntl(SecurityPage));
