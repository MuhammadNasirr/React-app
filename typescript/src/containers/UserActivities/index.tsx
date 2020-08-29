import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import {
    tablePageLimit,
} from '../../api/config';
import {
    UserActivityData,
} from '../../components/UserActivityData';
import {
    alertPush,
    AppState,
    getUserActivity,
    getUserData,
    selectTotalNumber,
    selectUserActivity,
    selectUserActivityCurrentPage,
    selectUserActivityLoading,
    selectUserData,
    UserActivityDataInterface,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    userData: any;
    loading: boolean;
    total: number;
    page: number;
    userActivity: UserActivityDataInterface[];
}

interface DispatchProps {
    getUserData: typeof getUserData;
    getUserActivity: typeof getUserActivity;
    alertPush: typeof alertPush;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

interface UserInfoState {
    page: number;
    rowsPerPage: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class UserInfoScreen extends React.Component<Props, UserInfoState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit()
        };
    }

    private activityRows = [
        { key: 'created_at', alignRight: false, label: 'Date' },
        { key: 'action', alignRight: false, label: 'Action' },
        { key: 'result', alignRight: false, label: 'Result' },
        { key: 'user_ip', alignRight: true, label: 'IP' },
        { key: 'browser', alignRight: true, label: 'Browser' },
        { key: 'os', alignRight: true, label: 'OS' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getUserData({ uid: this.props.match.params.uid });
        this.props.getUserActivity({ page: page + 1, limit: rowsPerPage, uid: this.props.match.params.uid });
    }

    public render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const {
            userActivity,
            total
        } = this.props;

        return (
            <React.Fragment>
                {this.props.userData && !this.props.loading
                    ? (
                        <UserActivityData
                            userActivity={userActivity}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rows={this.activityRows}
                            total={total}
                            goBack={this.goBack}
                            pathname={location.pathname}
                            user={this.props.userData}
                        />
                    ) : 'Loading'
                }
            </React.Fragment>
        );
    }

    private goBack = event => {
        event.preventDefault();
        this.props.history.goBack();
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetUserActivity(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetUserActivity(rows, 0);
    };

    private handleGetUserActivity = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;

        this.props.getUserActivity({ limit, page: page + 1, uid });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        userData: selectUserData(state),
        userActivity: selectUserActivity(state),
        loading: selectUserActivityLoading(state),
        total: selectTotalNumber(state),
        page: selectUserActivityCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getUserData: payload => dispatch(getUserData(payload)),
        getUserActivity: params => dispatch(getUserActivity(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

export const UserActivityPage = connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen);

// tslint:disable-next-line:no-any
export const UserActivityInfo = withRouter(UserActivityPage as any);
