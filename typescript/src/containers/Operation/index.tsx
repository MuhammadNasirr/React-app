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
import { Assets } from './Assets';
import { Expenses } from './Expenses';
import { Liabilities } from './Liabilities';
import { Revenues } from './Revenues';

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

interface OperationState {
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

class OperationScreen extends React.Component<Props, OperationState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            drawerOpen: false
        };
    }

    private tabRows = [
        {
            key: 1,
            label: 'Assets',
            pathname: `${root()}/accountings/operations/assets`
        },
        {
            key: 2,
            label: 'Liabilities',
            pathname: `${root()}/accountings/operations/liabilities`
        },
        {
            key: 3,
            label: 'Revenue',
            pathname: `${root()}/accountings/operations/revenues`
        },
        {
            key: 4,
            label: 'Expenses',
            pathname: `${root()}/accountings/operations/expenses`
        }
    ];

    private value = [
        `${root()}/accountings/operations/assets`,
        `${root()}/accountings/operations/liabilities`,
        `${root()}/accountings/operations/revenues`,
        `${root()}/accountings/operations/expenses`,
    ];

    public render() {
        const { location, classes } = this.props;
        const { drawerOpen } = this.state;
        return (
            <React.Fragment>
                <Grid container={true} justify="flex-end">
                    <Grid item={true}>
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
                            path={`${root()}/accountings/operations/assets`}
                            render={() => <Assets drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/operations/liabilities`}
                            render={() => <Liabilities drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/operations/revenues`}
                            render={() => <Revenues drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
                        />
                        <Route
                            path={`${root()}/accountings/operations/expenses`}
                            render={() => <Expenses drawerOpen={drawerOpen} handleCloseFilterDrawerCLick={this.handleCloseFilterDrawerCLick} handleCloseFilterDrawer={this.handleCloseFilterDrawer} />}
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
export const OperationWrapper = withStyles(styles)(OperationScreen);
