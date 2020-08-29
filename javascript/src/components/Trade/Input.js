import React, { Component } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core';
import { styles } from '../../styles/main';
import clsx from 'clsx'


class TextInput extends Component {
  render() {
    const { isValid, helperText, groupedMarkets, classes, selectedCurrency, iconUrl } = this.props;
    return (
      <React.Fragment>
        <InputLabel className={classes.secondaryText}>{this.props.label}</InputLabel>
        <TextField
          error={!isValid}
          variant={this.props.variant}
          onChange={e => this.props.onChange(e.target.value)}
          className={clsx(classes.buyInput, classes.textinput)}
          value={this.props.value}
          InputProps={{
            [this.props.position]:
              <InputAdornment position="end">
                <Avatar src={iconUrl} aria-label="recipe" classes={{ img: classes.buyAvatarImg }} className={classes.avatar} />
                <Select
                  disableUnderline
                  id="currency-selector"
                  value={selectedCurrency}
                  onChange={this.props.onChangeCurrency}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                  classes={{
                    icon: classes.caretIcon,
                    root: classes.buySellDropdown,
                  }}
                >
                  {
                    groupedMarkets && Object.keys(groupedMarkets).map((market, key) => (
                      <MenuItem key={key} className={classes.primaryText} value={market}>{market.toUpperCase()}</MenuItem>
                    ))
                  }
                </Select>
              </InputAdornment>,
            disableUnderline: true, classes: { root: clsx(classes.buyTextField, classes.primaryNumber) }
          }}
        />
        {
          !isValid
          &&
          <div style={{ paddingLeft: 5 }}>
            <span className={classes.errorText} style={{ fontSize: '0.75rem' }}>{helperText}</span>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TextInput);