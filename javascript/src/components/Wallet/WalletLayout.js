import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Hidden from '@material-ui/core/Hidden';
import { styles } from '../../styles/main'


const WalletLayout = ({ classes, location, activeWallet, wallets, intl, children }) => {
  const tabClasses = {
    wrapper: classes.tabWrapper,
    labelIcon: classes.labelIcon
  };

  return (
    <Fragment>
      <main className={classes.content}>
        <Hidden smDown implementation="css">
          <div style={{ display: activeWallet ? 'none' : 'block' }}>
            <Typography variant="h2" className={classes.primaryText} style={{ padding: 40 }}>{intl.formatMessage({ id: 'page.body.walletLayout.pleaseSelect' })}</Typography>
          </div>
        </Hidden>
        <div className={classes.tabDetails} style={{ display: activeWallet ? 'block' : 'none' }}>
          <Hidden smDown implementation="css">
            <Tabs
              indicatorColor="secondary"
              classes={{
                root: classes.walletTabsRoot
              }}
              value={Math.max(['/wallets/deposit', '/wallets/withdrawal'].indexOf(location.pathname), 0)}
            >
              <Tab
                label={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
                classes={tabClasses}
                component={Link}
                to={{ pathname: '/wallets/deposit', search: location.search }}
                icon={<VerticalAlignBottomIcon className={classes.verticalMiddle} />}
              />
              <Tab
                label={intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' })}
                classes={tabClasses}
                component={Link}
                to={{ pathname: '/wallets/withdrawal', search: location.search }}
                icon={<VerticalAlignTopIcon className={classes.verticalMiddle} />}
              />
            </Tabs>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Tabs
             classes={{
              root: classes.walletTabsRoot
            }}
              indicatorColor="secondary"
              value={Math.max(['/wallets/deposit', '/wallets/withdrawal'].indexOf(location.pathname), 0)}
            >
              <Tab
                label={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
                component={Link}
                classes={tabClasses}
                to={{ pathname: '/wallets/deposit', search: location.search }}
                icon={<VerticalAlignBottomIcon className={classes.verticalMiddle} />}
              />
              <Tab
                label={intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' })}
                component={Link}
                classes={tabClasses}
                to={{ pathname: '/wallets/withdrawal', search: location.search }}
                icon={<VerticalAlignTopIcon className={classes.verticalMiddle} />}
              />
            </Tabs>
          </Hidden>
          <Divider />
          <div className={classes.inner}>
            {children}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default withStyles(styles)(WalletLayout);
