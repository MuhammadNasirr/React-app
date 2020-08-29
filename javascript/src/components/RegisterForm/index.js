import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../../styles/main'
import clsx from 'clsx'

class RegisterForm extends Component {
    onChange = field => e => this.props.onChange(field, e);

    render() {
        const {
            classes,
            email,
            password,
            confirm_password,
            refid,
            onSubmit,
            checked,
            is_valid_pass,
            is_valid_email,
            intl,
            language
        } = this.props;

        const is_matched = password !== confirm_password ? false : true;

        return (
            <Grid container item xs={12} sm={12}>
                <Grid item sm={12} className={classes.signUpDiv}>
                    <Grid item sm={6} container justify="center">
                        <Typography className={classes.HeadingSignUp} component="h2" variant="h1" >{intl.formatMessage({ id: 'page.body.signUp.Since' })}</Typography>
                    </Grid>
                    <Grid item container sm={6} md={5} lg={4} direction="column">
                        <Paper className={classes.signUpBox}>
                            <Grid container direction="column" justify="center" className={classes.paperTitleRoot}>
                                <Typography className={classes.basicTextMedium} component="h2" variant="h2" >{intl.formatMessage({ id: 'page.header.signUp' })}</Typography>
                            </Grid>
                            <form className={clsx(classes.paperInner, classes.form)} onSubmit={onSubmit}>
                                <FormControl required fullWidth>
                                    <TextField
                                        error={!is_valid_email && email ? true : false}
                                        placeholder={intl.formatMessage({ id: 'page.header.signUp.email' })}
                                        // className={classes.textField}
                                        value={email}
                                        onChange={this.onChange('email')}
                                        margin="normal"
                                        variant="standard"
                                        helperText={!is_valid_email && email ? intl.formatMessage({ id: 'page.body.signUp.error.email' }) : ''}
                                        InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        error={!is_valid_pass && password ? true : false}
                                        placeholder={intl.formatMessage({ id: 'page.header.signUp.password' })}
                                        type="password"
                                        // className={classes.textField}
                                        value={password}
                                        onChange={this.onChange('password')}
                                        margin="normal"
                                        variant="standard"
                                        helperText={!is_valid_pass && password ? intl.formatMessage({ id: 'page.body.signUp.error.password' }) : ''}
                                        InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                        FormHelperTextProps={{ classes: { root: classes.errorText } }}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        error={(!is_matched && confirm_password) ? true : false}
                                        placeholder={intl.formatMessage({ id: 'page.header.signUp.confirmPassword' })}
                                        type="password"
                                        FormHelperTextProps={{ classes: { root: classes.errorText } }}
                                        // className={classes.textField}
                                        value={confirm_password}
                                        onChange={this.onChange('confirm_password')}
                                        margin="normal"
                                        variant="standard"
                                        helperText={!is_matched && confirm_password ? intl.formatMessage({ id: 'page.body.signUp.error.matchPassword' }) : ''}
                                        InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        placeholder={intl.formatMessage({ id: 'page.header.signUp.referalCode' })}
                                        // className={classes.textField}
                                        value={refid}
                                        onChange={this.onChange('refid')}
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <Select
                                        ref={this.inputLabel}
                                        classes={{
                                            icon: classes.caretIcon,
                                            root: classes.buySellDropdown,
                                        }}
                                        disableUnderline
                                        style={{ marginTop: 10 }}
                                        value={language}
                                        onChange={this.onChange("language")}
                                        inputProps={{
                                            name: 'language',
                                            id: 'outlined-age-simple',
                                        }}
                                    >
                                        <MenuItem className={classes.primaryText} value={'es'}>{intl.formatMessage({ id: 'page.body.signup.spanish' })}</MenuItem>
                                        <MenuItem className={classes.primaryText} value={'en'}>{intl.formatMessage({ id: 'page.body.signup.english' })}</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={checked} classes={{ checked: classes.primaryText }} onChange={this.onChange('checked')} value="checked" />
                                    }
                                    label={intl.formatMessage({ id: 'page.header.signUp.terms' })}
                                    classes={{
                                        label: clsx(classes.primaryText, classes.signUpTermLabel)
                                    }}
                                />

                                <Button
                                    disabled={is_matched && is_valid_email && is_valid_pass && checked ? false : true}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    classes={{
                                        disabled: classes.disabledButton
                                    }}
                                >
                                    {intl.formatMessage({ id: 'page.header.signUp' })}
                                </Button>
                            </form>
                            {/* </Grid> */}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item container sm={12} xs={12} className={classes.signUpLoginDiv}>
                    <Grid item sm={6}></Grid>
                    <Grid className={classes.xsfull} item sm={6} md={5} lg={4}>
                        <Paper className={clsx(classes.paperInner, classes.signUpBox)}>

                            <div className={classes.alignCenterDiv} style={{ marginTop: 10 }}>
                                <Typography className={classes.primaryText} style={{ marginRight: 5 }} variant="body2" >{intl.formatMessage({ id: 'page.signup.alreadyExist' })}</Typography>
                                {/* <Typography variant="body2">
                            <Link className={classes.primaryTextBold} style={{ textDecoration: 'none' }} to="/login">{intl.formatMessage({ id: 'page.signup.signinNow' })}</Link>
                        </Typography> */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    component={Link}
                                    to={`/login`}
                                    variant="contained"
                                    className={classes.signupLoginButton}
                                >
                                    {this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders.content.login' })}
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(RegisterForm);