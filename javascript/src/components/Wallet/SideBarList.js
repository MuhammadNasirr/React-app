import React, { Fragment } from 'react';
import cx from 'classnames';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import { toMinFixed } from '../../utils/index';
import { styles } from '../../styles/main'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';

const SideBarList = ({ classes, activeWallet, onClickWallet, filterCoins, coins, intl, mxn }) => {
  const coinItems = Object.entries(coins)
  const index = coinItems.findIndex(([currency, data]) => data.type === "compound");        // Getting index value of compound object
  coinItems.unshift(coinItems[index])                                                       // Put compound object to first item
  coinItems.splice(index + 1, 1)                                                            // Delete the compound object

  return (
    <Fragment>

      <FormControl className={clsx(classes.margin, classes.mt10, classes.textField, classes.SideBarListSearch)}>
        {/* <InputLabel htmlFor="filter-coins" className={classes.secondaryText}>Filter</InputLabel> */}
        <Input
          disableUnderline={true}
          placeholder={intl.formatMessage({ id: 'page.body.sidebarList.filter' })}
          classes={{
            // underline: classes.underline,
          }}
          className={clsx(classes.buyInput, classes.textinput)}
          onChange={(e) => filterCoins(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className={classes.primaryTextBold}
                aria-label="toggle password visibility"
              >
                <Search className={classes.primaryText} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <List className={classes.SideBarList}>
        {coinItems.map(([currency, data]) => {
          const isActive = currency === activeWallet;
          // if (data.type !== 'compound') {                     // compound is not showing in the list
            return (
              <ListItem
                button
                key={currency}
                alignItems="flex-start"
                onClick={onClickWallet(currency, data)}
                selected={isActive}
                className={cx(classes.customListItem, isActive && classes.selectedListItem)}
              >
                <ListItemAvatar classes={{ root: classes.avatarRoot }}>
                  <Avatar
                    alt={currency.toUpperCase()}
                    src={data.icon_url}
                    className={isActive ? classes.selectedIcon : ''}
                    classes={{ img: classes.avatarImg }}
                  />
                </ListItemAvatar>
                <Grid container classes={{ container: classes.textContainer }}>
                  <Grid item xs={6}>
                    <ListItemText
                      primary={data.type === 'compound' ? 'COMPOUND' : currency.toUpperCase()}
                      classes={{
                        primary: cx(

                          isActive ? classes.selectedText : classes.titleText,
                        )
                      }}
                      secondary={
                        <Typography
                          component="span"
                          className={isActive ? classes.selectedText : classes.titleText}
                          color="textPrimary"
                        >
                          {data.name || 'no name'}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText
                      primary={
                        <Fragment>
                          <Typography
                            component="span"
                            className={isActive ? clsx(classes.secondaryNumber, classes.balanceNumber) : clsx(classes.primaryNumber, classes.balanceNumber)}
                          >
                            {currency === 'mxn' ? (mxn && mxn.length && mxn[0].withdrawals.toFixed(8)) : data.balance.toFixed(8)}
                          </Typography>
                          <Typography
                            component="span"
                            className={isActive ? clsx(classes.secondaryText, classes.balanceNumber) : clsx(classes.primaryText, classes.balanceNumber)}
                          >
                            {" "}{currency === 'mxn' ? currency.toUpperCase() + " per DAI" : currency.toUpperCase()}
                          </Typography>
                        </Fragment>
                      }
                      classes={{
                        root: classes.listItemRoot,
                        primary: classes.balanceNumber
                      }}
                      secondary={
                        data.type !== 'compound' &&
                        <Typography
                          component="span"
                          className={isActive ? clsx(classes.secondaryNumber, classes.lockedText) : clsx(classes.primaryNumber, classes.lockedText)}
                          color="textPrimary"
                        >
                          {
                            currency === 'mxn' ? null
                              :
                              <React.Fragment>
                                <img
                                  src={require('../../assets/lock.svg')}
                                  alt="locked"
                                  className={classes.lockedIcon}
                                />{toMinFixed(data.locked, 2)}
                              </React.Fragment>
                          }
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </ListItem>
            );
          // }
        })}
        {
          !Object.entries(coins).length ?
            <p className={classes.primaryText} style={{ textAlign: 'center' }}>{intl.formatMessage({ id: 'page.body.sidebarList.filter.error' })}</p>
            : null
        }
      </List>
    </Fragment>
  );
};

export default withStyles(styles)(SideBarList);
