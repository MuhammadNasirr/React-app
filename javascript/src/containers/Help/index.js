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
import { tidioID } from '../../config';


var list = []
class Help extends Component {
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
                title: props.intl.formatMessage({ id: 'page.body.help.Security' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que1' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans1head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans1' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que2' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans2head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans2' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que3' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans3head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans3' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.Deposits' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que4' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans4head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans4' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que5' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans5head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans5' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.Withdrawals' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que6' }),
                subTitle: '',
                description: props.intl.formatMessage({ id: 'page.body.help.ans6' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que7' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans7head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans7' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.Fees' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que8' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans8head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans8' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que9' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans9head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans9' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.KYC' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que10' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans10head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans10' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.TradeLimits' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que11' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans11head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans11' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.Email' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que12' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans12head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans12' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que13' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans13head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans13' }),
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.SocialMedia' }),
                subTitle: '',
                description: false,
            },
            {
                title: props.intl.formatMessage({ id: 'page.body.help.que14' }),
                subTitle: props.intl.formatMessage({ id: 'page.body.help.ans14head' }),
                description: props.intl.formatMessage({ id: 'page.body.help.ans14' }),
            }
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
        const getKey = tidioID();
        return (
            <Layout>

                {
                    (isAuthenticated && getKey) ?
                        <Helmet>
                            <script src={`//code.tidio.co/${getKey}.js`} async></script>
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
                        </div>
                        {/* <Typography className={clsx(classes.fontItalic, classes.secondaryText, classes.mt10)}>{this.props.intl.formatMessage({ id: 'page.body.help.ifYou' })}</Typography> */}
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
                                            <Typography className={classes.primaryTextBold}>
                                                {item.subTitle}
                                            </Typography>
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
    }), actions))(injectIntl((Help)));
