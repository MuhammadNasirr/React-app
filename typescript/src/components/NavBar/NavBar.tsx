import {
    AppBar,
    createStyles,
    Divider,
    Drawer,
    IconButton,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import {
    ChevronLeft,
    ChevronRight,
    ExitToApp,
    Menu,
    Refresh,
} from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
import { root } from '../../api/config';
import { AppMenu } from './AppMenu';

const drawerWidth = 256;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#3598D5',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '0 8px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    listItem: {
        borderRadius: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        letterSpacing: '0.1px',
        '&:hover': {
            backgroundColor: 'rgba(48,156,234,0.1)',
        },
        '&:focus': {
            backgroundColor: 'rgba(48, 156, 234, 0.1)',
        },
    },
    selected: {
        backgroundColor: 'rgba(48, 156, 234, 0.1) !important',
    },
    button: {
        color: '#309CEA',
    },
    link: {
        textDecoration: 'none',
    },
    navbarHidden: {
        display: 'none',
    },
    appMenu: {
        width: '100%',
    },
    navList: {
        width: drawerWidth,
    },
    menuItem: {
        borderRadius: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        letterSpacing: '0.1px',
        '&:hover': {
            backgroundColor: 'rgba(48,156,234,0.1)',
        },
        '&:focus': {
            backgroundColor: 'rgba(48, 156, 234, 0.1)',
        },
        '&.active': {
            background: 'rgba(0, 0, 0, 0.08)',
            '& .MuiListItemIcon-root': {
                color: '#000000',
            },
        },
    },
    menuItemIcon: {
        // color: '#979797',
    },
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    logout: () => void;
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    loggedIn: boolean;
    pathname: string;
    isSuperAdmin: boolean;
}

interface NavBarState {
    key: string;
    open: boolean;
}

class NavBar extends React.Component<Props, NavBarState> {
    public state = {
        key: '',
        open: false
    };

    public appMenuItems = [
        {
            name: 'Dashboard',
            link: root(),
            Icon: 'Dashboard',
        },
        {
            name: 'User directory',
            link: `${root()}/users`,
            Icon: 'Users',
        },
        {
            name: 'Pending Documents',
            link: `${root()}/pending`,
            Icon: 'PendingDocuments',
        },
        {
            name: 'User Activities',
            link: `${root()}/activities`,
            Icon: 'UserActivities',
        },
        {
            name: 'Exchange',
            Icon: 'Exchange',
            items: [
                {
                    name: 'Currencies',
                    link: `${root()}/exchange/currencies`,
                    Icon: 'Currencies'
                },
                {
                    name: 'Markets',
                    link: `${root()}/exchange/markets`,
                    Icon: 'Markets'
                },
                {
                    name: 'Orders',
                    link: `${root()}/exchange/orders/open`,
                    Icon: 'Orders'
                },
                {
                    name: 'Trades',
                    link: `${root()}/exchange/trades`,
                    Icon: 'Trades'
                }
            ],
        },
        {
            name: 'Accountings',
            Icon: 'Accountings',
            items: [
                {
                    name: 'Bank Accounts',
                    link: `${root()}/accountings/bank-account`,
                    Icon: 'Deposits'
                },
                {
                    name: 'Deposits',
                    link: `${root()}/accountings/deposits/coin`,
                    Icon: 'Deposits'
                },
                {
                    name: 'Withdrawals',
                    link: `${root()}/accountings/withdrawals/coin`,
                    Icon: 'Withdrawals'
                },
                {
                    name: 'Withdrawals Pending',
                    link: `${root()}/accountings/withdrawals-pending/coin`,
                    Icon: 'WithdrawalsPending'
                },
                {
                    name: 'Adjustments',
                    link: `${root()}/accountings/adjustments`,
                    Icon: 'Adjustments'
                },
                {
                    name: 'Operations',
                    link: `${root()}/accountings/operations/assets`,
                    Icon: 'Operations'
                },
            ],
        },
        {
            name: 'Settings',
            Icon: 'Settings',
            items: [
                {
                    name: 'Fees Schedule',
                    link: `${root()}/settings/fees-schedules`,
                    Icon: 'FeesSchedules',
                },
                {
                    name: 'Permissions',
                    Icon: 'Permissions',
                    link: `${root()}/settings/permissions`
                },
                {
                    name: 'Restrictions',
                    link: `${root()}/settings/restrictions`,
                    Icon: 'Restrictions',
                },
                {
                    name: 'Wallets',
                    link: `${root()}/settings/wallets`,
                    Icon: 'Wallets',
                },
                {
                    name: 'Blockchains',
                    link: `${root()}/settings/blockchains`,
                    Icon: 'Blockchains',
                },
            ],
        },
    ];

    public SuperAdminItems = [
        {
            name: 'Admin Activities',
            Icon: 'AdminActivities',
            link: `${root()}/admin-activities`
        },
    ];

    public componentDidMount() {
        const { pathname } = this.props;
        this.setState({
            key: pathname || root(),
        });
    }

    public componentWillReceiveProps(next: Props) {
        if (next.pathname !== this.props.pathname) {
            this.setState({
                key: next.pathname,
            });
        }
    }

    public render() {
        const { classes, loggedIn, isSuperAdmin } = this.props;

        return (
            <div>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, { [classes.navbarHidden]: !loggedIn })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.props.open && classes.hide)}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow} />
                        <IconButton
                            color="inherit"
                            aria-label="Refresh"
                            onClick={this.handleRefresh}
                        >
                            <Refresh />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="Logout"
                            onClick={this.handleLogout}
                        >
                            <ExitToApp />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.props.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.props.open ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div>
                    <Divider />
                    <AppMenu
                        classes={classes}
                        appMenuItems={this.appMenuItems.slice(0, 1)}
                    />
                    <Divider />
                    <AppMenu
                        classes={classes}
                        appMenuItems={isSuperAdmin ? this.appMenuItems.slice(1, 5).concat(this.SuperAdminItems) : this.appMenuItems.slice(1, 5)}
                    />
                    <Divider />
                    <AppMenu
                        classes={classes}
                        appMenuItems={this.appMenuItems.slice(5, 8)}
                    />
                    {/* <List>
                        {this.renderList(this.NavBarItems.slice(0, 1))}
                    </List>
                    <Divider />
                    <List>
                        {this.renderList(this.NavBarItems.slice(1, 5))}
                        {isSuperAdmin && this.renderList(this.SuperAdminItems)}
                    </List>
                    <Divider />
                    <List>
                        {this.renderList(this.NavBarItems.slice(5, 8))}
                    </List> */}
                </Drawer>
            </div>
        );
    }

    private handleDrawerOpen = () => {
        this.props.handleDrawerOpen();
    };

    private handleDrawerClose = () => {
        this.props.handleDrawerClose();
    };

    private handleLogout = () => {
        this.props.logout();
    };

    private handleRefresh = () => {
        location.reload();
    };
}

export const Navbar = withStyles(styles, { withTheme: true })(NavBar);
