import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { root } from '../../api/config';
import { TabBar } from '../../components';
import {
    Balances,
    OpenOrders,
    UserActivityInfo,
    UserHistory,
    UserInfo,
} from '../../containers';
import {
    AppState,
    getMemberData,
    getMemberGroup,
    MemberDataDataInterface,
    selectMemberData
} from '../../modules';

interface ReduxProps {
    memberData: MemberDataDataInterface;
}


interface DispatchProps {
    getMemberGroup: typeof getMemberGroup;
    getMemberData: typeof getMemberData;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

type Props = RouteProps & OwnProps & DispatchProps;

class UserScreen extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    private uid = this.props.match.params.uid;
    private tabRows = [
        {
            key: 1,
            label: 'Main Info',
            pathname: `${root()}/users/${this.uid}/main`
        },
        {
            key: 2,
            label: 'Balances',
            pathname: `${root()}/users/${this.uid}/balances`
        },
        {
            key: 3,
            label: 'Open Orders',
            pathname: `${root()}/users/${this.uid}/open-orders`
        },
        {
            key: 4,
            label: 'Activities',
            pathname: `${root()}/users/${this.uid}/activities`
        },
        {
            key: 5,
            label: 'History',
            pathname: `${root()}/users/${this.uid}/history`
        }
    ];

    private value = [
        `${root()}/users/${this.uid}/main`,
        `${root()}/users/${this.uid}/balances`,
        `${root()}/users/${this.uid}/open-orders`,
        `${root()}/users/${this.uid}/activities`,
        `${root()}/users/${this.uid}/history`
    ];

    public componentDidMount() {
        this.props.getMemberData({ uid: this.uid });
        this.props.getMemberGroup();
    }

    public render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <TabBar
                    value={this.value}
                    tabRows={this.tabRows}
                    pathname={location.pathname}
                    search={location.search}
                >
                    <Switch>
                        <Route
                            path={`${root()}/users/:uid/main`}
                            render={() => <UserInfo />}
                        />
                        <Route
                            path={`${root()}/users/:uid/balances`}
                            render={() => <Balances />}
                        />
                        <Route
                            path={`${root()}/users/:uid/open-orders`}
                            render={() => <OpenOrders />}
                        />
                        <Route
                            path={`${root()}/users/:uid/activities`}
                            render={() => <UserActivityInfo />}
                        />
                        <Route
                            path={`${root()}/users/:uid/history`}
                            render={() => <UserHistory />}
                        />
                    </Switch>
                </TabBar>
            </React.Fragment>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        memberData: selectMemberData(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getMemberGroup: () => dispatch(getMemberGroup()),
    getMemberData: payload => dispatch(getMemberData(payload)),
});

// tslint:disable-next-line:no-any
export const UserWrapper = connect(mapStateToProps, mapDispatchToProps)(UserScreen);
