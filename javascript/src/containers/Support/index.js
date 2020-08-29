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


class SupportPage extends Component {

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
                                    <img className={classes.earn} src={require("../../assets/alex-kotliarskyi.jpg")} />
                                </Grid>
                                <Grid item container className={classes.investOuterGrid} justify="center" sm={6}>
                                    <Grid item container className={classes.investOuterGrid} sm={10}>
                                        <Typography component="h2" variant="h2" className={clsx( classes.primaryTextBold, classes.fullWidth, classes.taglineMobile)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.support.firstBoxHead' })}
                                        </Typography>
                                        <Typography variant="h5" className={clsx(classes.primaryText, classes.investText, classes.mt20)}>
                                            {this.props.intl.formatMessage({ id: 'page.body.support.firstBoxSubHead' })}
                                        </Typography>
                                    </Grid>
                                    <Grid item container sm={10} className={classes.mobileHCenter}>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </section>

                </div>
            </Layout>
        );

    }
}

export default withStyles(styles)(injectIntl(SupportPage));
