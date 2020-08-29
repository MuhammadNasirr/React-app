import {
    createStyles,
    Fab,
    Grid,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import {
    root,
} from '../../api/config';
import {
    TabBar
} from '../../components';
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


interface DepositState {
    drawerOpen: boolean;
    open: boolean;
}

type Props = RouteProps & OwnProps & StyleProps;

class DepositScreen extends React.Component<Props, DepositState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            drawerOpen: false,
            open: false,
        };
    }

    private tabRows = [
        {
            key: 1,
            label: 'Coin',
            pathname: `${root()}/accountings/deposits/coin`
        },
        {
            key: 2,
            label: 'Fiat (MXN)',
            pathname: `${root()}/accountings/deposits/fiat-mxn`
        },
        {
            key: 3,
            label: 'Fiat',
            pathname: `${root()}/accountings/deposits/fiat`
        }
    ];

    private value = [
        `${root()}/accountings/deposits/coin`,
        `${root()}/accountings/deposits/fiat-mxn`,
        `${root()}/accountings/deposits/fiat`,
    ];

    public render() {
        const {
            drawerOpen,
            open,
        } = this.state;
        const {
            classes,
            location
        } = this.props;
        return (
            <React.Fragment>
                <Grid container={true} justify="flex-end">
                    <Grid item={true}>
                        {
                            location.pathname === '/management/accountings/deposits/fiat-mxn' ? null
                                :
                                <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={this.handleOpenCreateModal}>
                                    <AddIcon />
                                </Fab>
                        }
                        <Fab size="small" color="primary" aria-label="add" className={classnames(classes.ml10, classes.button)} onClick={this.handleOpenFilterDrawer}>
                            <FilterIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <TabBar
                    value={this.value}
                    tabRows={this.tabRows}
                    pathname={location.pathname}
                    search={location.search}
                >
                    <Switch>
                        <Route
                            path={`${root()}/accountings/deposits/coin`}
                            render={() => <Coin drawerOpen={drawerOpen} open={open} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseModal={this.handleCloseModal} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/deposits/fiat-mxn`}
                            render={() => <FiatMXN drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/deposits/fiat`}
                            render={() => <Fiat drawerOpen={drawerOpen} open={open} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseModal={this.handleCloseModal} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                    </Switch>
                </TabBar>
            </React.Fragment>
        );
    }

    // tslint:disable:no-any
    private handleCloseModal = (): void => {
        this.setState({ open: false });
    };

    // tslint:disable:no-any
    private handleOpenCreateModal = (): void => {
        this.setState({ open: true });
    };

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
export const Deposit = withStyles(styles)(DepositScreen);

