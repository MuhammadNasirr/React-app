import * as React from 'react';
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { minutesUntilAutoLogout, root } from '../../api/config';
import {
    Activities,
    AddAdjustment,
    AddBlockchains,
    AddCurrencies,
    AddMarkets,
    AddWallets,
    Adjustment,
    AdjustmentDetail,
    AdminActivities,
    BankAccount,
    BankAccountDetails,
    Blockchains,
    Currency,
    Dashboard,
    Deposit,
    DepositDetail,
    DocumentReview,
    FeesSchedules,
    InfoMarketsWrapper,
    Login,
    Markets,
    OperationWrapper,
    OrderWrapper,
    Permissions,
    Restriction,
    Trade,
    UserDirectory,
    UserInfo,
    UserWrapper,
    Wallets,
    WithdrawalPendingWrapper,
    WithdrawalWrapper,
    WithdrawDetail,
    WithdrawInfo,
    WithdrawList,
} from '../../containers';
import { UserInterface } from '../../modules';

const renderLoading = () => {
    return (
        <div>Loading...</div>
    );
};

const CHECK_INTERVAL = 15000;
const STORE_KEY = 'lastAction';

// tslint:disable-next-line
const PrivateRoute: React.SFC<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={`${root()}/login`} />
        </Route>
    );
};

// tslint:disable-next-line
const SuperAdminRoute: React.SFC<any> = ({ component: CustomComponent, loading, isLogged, user, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged && user && user.role === 'superadmin') {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={`${root()}/login`} />
        </Route>
    );
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    if (isLogged) {
        return <Route {...rest}><Redirect to={root()} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;
    return <Route {...rest} render={renderCustomerComponent} />;
};

interface RouterProps {
    isCurrentSession: boolean;
    userLoading: boolean;
    logout: () => void;
    user?: UserInterface;
}

class Router extends React.Component<RouterProps> {
    public static eventsListen = [
        'click',
        'keydown',
        'scroll',
        'resize',
        'mousemove',
        'TabSelect',
        'TabHide',
    ];

    public timer;

    constructor(props: RouterProps) {
        super(props);
        this.initListener();
    }

    public componentDidMount() {
        this.initInterval();
        this.check();
    }

    public componentWillUnmount() {
        for (const type of Router.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
    }

    public render() {
        const { isCurrentSession, userLoading, user } = this.props;

        return (
            <Switch>
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/users`}
                    component={UserDirectory}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/pending`}
                    component={DocumentReview}
                />
                <PrivateRoute
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/pending/:uid`}
                    component={UserInfo}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/activities`}
                    component={Activities}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/settings/fees-schedules`}
                    component={FeesSchedules}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/settings/restrictions`}
                    component={Restriction}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/deposits/:tid/details`}
                    component={DepositDetail}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/accountings/deposits`}
                    component={Deposit}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/withdrawals/:id/details`}
                    component={WithdrawDetail}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/accountings/withdrawals`}
                    component={WithdrawalWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/withdrawals-pending/:id/details`}
                    component={WithdrawDetail}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/accountings/withdrawals-pending`}
                    component={WithdrawalPendingWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/adjustments`}
                    component={Adjustment}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/adjustments/add`}
                    component={AddAdjustment}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/adjustments/:id`}
                    component={AdjustmentDetail}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/bank-account`}
                    component={BankAccount}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/accountings/bank-account/:id`}
                    component={BankAccountDetails}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/accountings/operations`}
                    component={OperationWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={Currency}
                    path={`${root()}/exchange/currencies`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={AddCurrencies}
                    path={`${root()}/exchange/currencies/add`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={AddCurrencies}
                    path={`${root()}/exchange/currencies/:currency/edit`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/exchange/markets`}
                    component={Markets}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/exchange/markets/add`}
                    component={AddMarkets}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/exchange/markets/:id`}
                    component={InfoMarketsWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/exchange/trades`}
                    component={Trade}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/exchange/orders`}
                    component={OrderWrapper}
                />
                <SuperAdminRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/admin-activities`}
                    component={AdminActivities}
                    user={user}
                />
                <SuperAdminRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/admin-activities/:uid`}
                    component={UserInfo}
                    user={user}
                />
                <SuperAdminRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/settings/permissions`}
                    component={Permissions}
                    user={user}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={root()}
                    component={Dashboard}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/activities/:uid`}
                    component={UserInfo}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/users/:uid`}
                    component={UserWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/withdraws`}
                    component={WithdrawList}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/orders`}
                    component={OrderWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/orderbooks`}
                    component={OrderWrapper}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path={`${root()}/withdraws/:id`}
                    component={WithdrawInfo}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={Wallets}
                    path={`${root()}/settings/wallets`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={AddWallets}
                    path={`${root()}/settings/wallets/add`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={AddWallets}
                    path={`${root()}/settings/wallets/:id/edit`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    component={Blockchains}
                    path={`${root()}/settings/blockchains`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    component={AddBlockchains}
                    exact={true}
                    path={`${root()}/settings/blockchains/add`}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    component={AddBlockchains}
                    path={`${root()}/settings/blockchains/:id/edit`}
                />
                <PublicRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path={`${root()}/login`}
                    component={Login}
                />
                <Route path="**"><Redirect to={`${root()}/`} /></Route>
            </Switch>
        );
    }

    private getLastAction = () => {
        if (localStorage.getItem(STORE_KEY) !== null) {
            return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
        }
        return 0;
    };

    private setLastAction = (lastAction: number) => {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    };

    private initListener = () => {
        this.reset();
        for (const type of Router.eventsListen) {
            document.body.addEventListener(type, this.reset);
        }
    };

    private reset = () => {
        this.setLastAction(Date.now());
    };

    private initInterval = () => {
        this.timer = setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    };

    private check = () => {
        const { user } = this.props;
        const now = Date.now();
        const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout && user && user.email) {
            this.props.logout();
        }
    };
}

export const AppRouter = Router;
