import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import SideBarList from './SideBarList';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Drawer from '@material-ui/core/Drawer/Drawer';
import { styles } from '../../styles/main'
import { injectIntl } from 'react-intl';


class SideBar extends Component {
  onClickWallet = (id, data) => () => {
    this.props.setActiveWallet(id);
    if (!data.address) {
      this.props.fetchWalletAddress(id);
    }
  };

  render() {
    const { classes, wallets, activeWallet, filterCoins, coins, intl, mxn } = this.props;

    return (// TODO resolve twice api call
      <Fragment>
        <Hidden mdUp implementation="js">
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100vw', display: activeWallet ? 'none' : 'block' }}>
              <SideBarList
                wallets={wallets}
                onClickWallet={this.onClickWallet}
                filterCoins={filterCoins}
                mxn={mxn}
                coins={coins}
                intl={intl}
              />
            </div>
          </div>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            {/* <div className={classes.toolbar} /> */}
            <SideBarList
              wallets={wallets}
              activeWallet={activeWallet}
              onClickWallet={this.onClickWallet}
              mxn={mxn}
              filterCoins={filterCoins}
              coins={coins}
              intl={intl}
            />
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

export default withStyles(styles)(injectIntl(SideBar));
