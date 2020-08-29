import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { styles } from '../../styles/main'

class LoginForm extends Component {
  onChange = field => e => this.props.onChange(field, e.target.value.trim());

  render() {
    const { classes, email, password, onSubmit, intl } = this.props;
    const is_disabled = (!email || !password) ? true : false

    return (
      <Paper className={clsx(classes.paper, classes.center)}>
        <Grid direction="column" justify="center" container className={classes.paperTitleRoot}>
          <Typography className={classes.basicTextMedium} component="h2" variant="h2">{intl.formatMessage({ id: 'page.header.signIn' })}</Typography>
        </Grid>
        <form className={clsx(classes.form,classes.paperInner)} onSubmit={onSubmit}>
          <FormControl required fullWidth>
            <TextField
              placeholder={intl.formatMessage({ id: 'page.header.signIn.email' })}
              id="email"
              margin="normal"
              variant="standard"
              value={email}
              onChange={this.onChange('email')}
              InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
            />
          </FormControl>
          <FormControl required fullWidth>
            <TextField
              placeholder={intl.formatMessage({ id: 'page.header.signIn.password' })}
              id="password"
              type="password"
              margin="normal"
              variant="standard"
              value={password}
              onChange={this.onChange('password')}
              // classes={{ root: classes.textinput,  }}
              InputProps={{ disableUnderline: true, classes: { input: classes.textinput } }}
            />
          </FormControl>

          <Button
            disabled={is_disabled}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            classes={{
              disabled: classes.disabledButton
            }}
          >
            {intl.formatMessage({ id: 'page.header.signIn' })}
          </Button>

          <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <Typography variant="body2" >
              <Link className={classes.primaryText} to="/signup">{intl.formatMessage({ id: 'page.header.signUp' })}</Link>
            </Typography>
            <Typography variant="body2">
              <Link className={classes.primaryText} to="/forgot">{this.props.intl.formatMessage({ id: 'page.header.signIn.forgotPassword' })}</Link>
            </Typography>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginForm);
