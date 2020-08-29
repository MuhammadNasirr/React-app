/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import actions from "../../actions";
import { styles } from '../../styles/main'
import Layout from '../Layout';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx'
// import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { injectIntl } from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Search from '@material-ui/icons/Search';


var list = []
class Faq extends Component {
    state = {
        loading: true,
        filteredList: null
    };

    componentDidMount() {
        if (document.getElementById("tidio-chat")) {
            document.getElementById("tidio-chat").style.display = "block";
        }
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1500);
        this.renderQuestion(this.props)
    }

    renderQuestion = (props) => {

        list = [

            {
                title: props.intl.formatMessage({ id: 'page.body.faq.About' }),
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que1' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans1' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que2' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans2' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que3' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans3' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que4' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans4' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que5' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans5' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.AboutCrypto' }),
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que6' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans6' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que7' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans7' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que8' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans8' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que9' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans9' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que10' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans10' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que11' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans11' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que12' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans12' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.AboutTrading' }),
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que13' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans13' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que14' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans14' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que15' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans15' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que16' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans16' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que17' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans17' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.AboutTech' }),
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que18' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans18' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que19' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans19' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que20' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans20' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que21' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans21' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que22' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans22' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que23' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans23' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que24' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans24' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que25' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans25' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que26' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans26' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que27' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans27' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que28' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans28' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que29' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans29' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.faq.que30' }),
                description: props.intl.formatMessage({ id: 'page.body.faq.ans30' }),
            },
        ]
        this.setState({ filteredList: list })

    }

    componentWillUnmount() {
        if (document.getElementById("tidio-chat")) {
            document.getElementById("tidio-chat").style.display = "none";
        }
    }

    filtered = (value) => {
        if (value) {
            const re = new RegExp(value, 'i');
            var filtered = list.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.match(re)));
            this.setState({ filteredList: filtered })
        } else {
            this.setState({ filteredList: list })
        }
    }

    render() {
        const { classes, user } = this.props;
        const { loading, filteredList } = this.state;

        let isAuthenticated = false;
        if (user) {
            isAuthenticated = user.email && user.state === 'active';
        }

        return (
            <Layout>

                {
                    isAuthenticated ?
                        <Helmet>
                            <script src="//code.tidio.co/gbkdxmtdcvwn51zustxx4umoelykx34s.js" async></script>
                        </Helmet>
                        :
                        <Helmet>
                            <noscript></noscript>
                        </Helmet>
                }

                <main className={clsx(classes.fullWidth, classes.main)}>
                    <CssBaseline />
                    <Paper className={classes.searchPaper}>
                        <div className={classes.searchPaperinner}>
                            <Typography variant={"h3"} className={clsx(classes.secondaryText, classes.mt10)}>{this.props.intl.formatMessage({ id: 'page.body.help.support' })}</Typography>
                            <Typography variant={"h1"} className={clsx(classes.secondaryText, classes.howCanHelp)}>{this.props.intl.formatMessage({ id: 'page.body.help.howcan' })}</Typography>
                            <FormControl className={clsx(classes.searchInput, classes.secondaryText)}>
                                {/* <InputLabel htmlFor="filter-coins" className={clsx(classes.helpHeading)}>{this.props.intl.formatMessage({ id: 'page.body.help.typeYour' })}</InputLabel> */}
                                <Input
                                    disableUnderline={true}
                                    id="filter-coinss"
                                    placeholder={this.props.intl.formatMessage({ id: 'page.body.help.search' })}
                                    classes={{
                                        underline: classes.underline,
                                        input: classes.primaryTextBold
                                    }}
                                    className={clsx(classes.textinputHelp)}
                                    onChange={(e) => this.filtered(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                className={classes.secondaryText}
                                                aria-label="toggle password visibility"
                                            >
                                                <Search className={classes.primaryText} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {/* <Typography className={clsx(classes.fontItalic, classes.secondaryText, classes.mt10)}>{this.props.intl.formatMessage({ id: 'page.body.faq.ifYou' })}</Typography> */}
                        </div>
                    </Paper>
                    <div className={classes.helpMain}>
                        {
                            filteredList && filteredList.map((item, key) => {
                                if (!item.description) {
                                    return (
                                        <Typography key={key} variant="h2" className={clsx(classes.mt20, classes.helpTitle, classes.primaryText)}>{item.title}</Typography>
                                    )
                                }
                                return (
                                    <ExpansionPanel key={key} className={classes.ExpansionPanel}>
                                        <ExpansionPanelSummary
                                            className={classes.expansionHead}
                                            expandIcon={<ExpandMoreIcon className={classes.ExpandMoreIcon} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.accordionheading}>{item.title}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.expansionBody}>
                                            <Typography className={clsx(classes.primaryText, classes.mt20)}>
                                                {item.description}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })
                        }
                        <Divider className={clsx(classes.helpDivider)} />
                        {/* <Grid className={clsx(classes.displayFlex, classes.mt20)}>
                        <Typography>
                        {this.props.intl.formatMessage({ id: 'page.body.help.forAny' })}
                        </Typography>
                        <Typography className={classes.fontBold}>{this.props.intl.formatMessage({ id: 'page.body.help.contactSupport' })}</Typography>
                    </Grid> */}
                    </div>
                </main>
            </Layout>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => ({
        user: state.user.data
    }), actions))(injectIntl((Faq)));
