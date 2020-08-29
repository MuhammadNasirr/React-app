/* eslint-disable */
import React, { Component } from 'react';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../../styles/main'
import Layout from '../Layout';
import { injectIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx'

class TermsAndCondition extends Component {
    state = {
    };

    render() {
        const { classes, intl } = this.props;
        return (
            <Layout>
                <main className={classes.main}>
                    <CssBaseline />
                    <Typography variant="h1" className={clsx(classes.tandCHeadng, classes.primaryText)}>{intl.formatMessage({ id: 'page.body.terms.mainheading' })}</Typography>
                    <Paper className={classes.aboutusPaper}>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.heading' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryTextBold)}>
                            {intl.formatMessage({ id: 'page.body.terms.text1' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text2' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text3' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text4' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text5' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text6' })}
                        </Typography>
                        <Typography variant="h3" className={clsx(classes.termsText, classes.primaryTextBold)}>
                            {intl.formatMessage({ id: 'page.body.terms.text7' })}
                        </Typography>
                        <Typography variant="h3" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text8' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text9' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text10' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text11' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text12' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text13' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text14' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text15' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text16' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text17' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text18' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text19' })}
                        </Typography>
                        <Typography variant="h3" className={clsx(classes.termsText, classes.primaryTextBold)}>
                            {intl.formatMessage({ id: 'page.body.terms.text20' })}
                        </Typography>
                        <Typography variant="h3" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text21' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text22' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text23' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text24' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text25' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text26' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text27' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text28' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text29' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text30' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text31' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text32' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text33' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text34' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text35' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text36' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text37' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text38' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text39' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text40' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text41' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text43' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text44' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text45' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text46' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text47' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text48' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text49' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text50' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text51' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text52' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text53' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text54' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text55' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text56' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text57' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text58' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text59' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text60' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text61' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text62' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text63' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text64' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text65' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text66' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text67' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text68' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text69' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text70' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text71' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text72' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text73' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text74' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text75' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text76' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text77' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text78' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text79' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text80' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text81' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text82' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text83' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text84' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text85' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text86' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text87' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text88' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text89' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text90' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text91' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text92' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text93' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text94' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text95' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text96' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text97' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text98' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text99' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text100' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text101' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text102' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text103' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text104' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text105' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text106' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text107' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text108' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text109' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text110' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text111' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text112' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text113' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text114' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text115' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text116' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text117' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text118' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text119' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text120' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text121' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text122' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text123' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text124' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text125' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text126' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text127' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text128' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text129' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text130' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text131' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text132' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text133' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text134' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text135' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text136' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text137' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text138' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text139' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text140' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text141' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text142' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text143' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text144' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text145' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text146' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text147' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text148' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text149' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text150' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text151' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text152' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text153' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text154' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text155' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text156' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text157' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text158' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text159' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text160' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text161' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text162' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text163' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text164' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text165' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text166' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text167' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text168' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text169' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text170' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text171' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text172' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text173' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text174' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text175' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text176' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text177' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text178' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text179' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text180' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text181' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text182' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text183' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text184' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text185' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text186' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text187' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text188' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text189' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text190' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text191' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text192' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text193' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text194' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text195' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text196' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text197' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text198' })}
                        </Typography>
                        <Typography variant="h2" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text199' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryText)}>
                            {intl.formatMessage({ id: 'page.body.terms.text200' })}
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.termsText, classes.primaryTextBold)}>
                            {intl.formatMessage({ id: 'page.body.terms.text201' })}
                        </Typography>
                    </Paper>
                </main>
            </Layout>
        );
    }
}

export default compose(
    withStyles(styles),
)(injectIntl((TermsAndCondition)));
