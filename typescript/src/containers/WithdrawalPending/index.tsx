import {
    createStyles,
    Fab,
    Grid,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { root } from '../../api/config';
import { TabBar } from '../../components';
import { Coin } from './Coin';
import { Fiat } from './Fiat';
import { FiatMXN } from './FiatMXN';

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

interface WithdrawalPendingState {
    drawerOpen: boolean;
}


const styles = (theme: Theme) => createStyles({
    button: {
        paddingBottom: 0,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 312,
    },
    menu: {
        width: 400,
    },
    ml10: {
        marginLeft: 10
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}

type Props = RouteProps & OwnProps & StyleProps;
class WithdrawalPendingScreen extends React.Component<Props, WithdrawalPendingState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            drawerOpen: false
        };
    }

    private tabRows = [
        {
            key: 1,
            label: 'Coin',
            pathname: `${root()}/accountings/withdrawals-pending/coin`
        },
        {
            key: 2,
            label: 'Fiat (MXN)',
            pathname: `${root()}/accountings/withdrawals-pending/fiat-mxn`
        },
        {
            key: 3,
            label: 'Fiat',
            pathname: `${root()}/accountings/withdrawals-pending/fiat`
        }
    ];

    private value = [
        `${root()}/accountings/withdrawals-pending/coin`,
        `${root()}/accountings/withdrawals-pending/fiat-mxn`,
        `${root()}/accountings/withdrawals-pending/fiat`,
    ];

    public render() {
        const { location, classes } = this.props;
        const { drawerOpen } = this.state;

        return (
            <React.Fragment>
                <Grid container={true} justify="flex-end">
                    {
                        location.pathname === '/management/accountings/withdrawals-pending/fiat-mxn' ? null
                            :
                            <Grid item={true}>
                                <Fab size="small" color="primary" aria-label="add" className={classnames(classes.ml10, classes.button)} onClick={this.handleOpenFilterDrawer}>
                                    <FilterIcon />
                                </Fab>
                            </Grid>
                    }
                </Grid>
                <TabBar
                    value={this.value}
                    tabRows={this.tabRows}
                    pathname={location.pathname}
                    search={location.search}
                >
                    <Switch>
                        <Route
                            path={`${root()}/accountings/withdrawals-pending/coin`}
                            render={() => <Coin drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/withdrawals-pending/fiat-mxn`}
                            render={() => <FiatMXN drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/withdrawals-pending/fiat`}
                            render={() => <Fiat drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                    </Switch>
                </TabBar>
            </React.Fragment>
        );
    }

    private handleOpenFilterDrawer = (): void => {
        this.setState({ drawerOpen: true });
    };

    private handleCloseFilterDrawerCLick = (): void => {
        this.setState({ drawerOpen: false });
    };

    private handleCloseFilterDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        this.setState({ drawerOpen: open });
    };
}

// tslint:disable-next-line:no-any
export const WithdrawalPendingWrapper = withStyles(styles)(WithdrawalPendingScreen);
