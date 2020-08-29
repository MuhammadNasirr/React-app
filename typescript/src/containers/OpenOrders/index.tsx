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
    OpenOrdersData,
} from '../../components/OpenOrdersData';
import {
    alertPush,
    AppState,
    cancelOrders,
    getOrders,
    getUserData,
    OrdersDataInterface,
    selectOrders,
    selectOrdersCurrentPage,
    selectOrdersLoading,
    selectOrdersTotalNumber,
    selectUserData,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    userData: any;
    loading: boolean;
    total: number;
    page: number;
    userOpenOrders: OrdersDataInterface[];
}

interface DispatchProps {
    getUserData: typeof getUserData;
    getUserOpenOrders: typeof getOrders;
    cancelUserOpenOrders: typeof cancelOrders;
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

class OpenOrdersScreen extends React.Component<Props, UserInfoState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    private openOrdersRows = [
        { key: 'id', alignRight: false, label: 'Order ID' },
        { key: 'market', alignRight: false, label: 'Market' },
        { key: 'ord_type', alignRight: false, label: 'Type' },
        { key: 'remaining_volume', alignRight: true, label: 'Amount' },
        { key: 'executed_volume', alignRight: true, label: 'Executed' },
        { key: 'price', alignRight: true, label: 'Price' },
        { key: 'side', alignRight: true, label: 'Side' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'updated_at', alignRight: true, label: 'Updated' },
        { key: 'cancel', alignRight: true, label: '' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getUserData({ uid: this.props.match.params.uid });
        this.props.getUserOpenOrders({ page: page + 1, limit: rowsPerPage, uid: this.props.match.params.uid, state: 'wait' });
    }

    public render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const {
            userOpenOrders,
            total
        } = this.props;

        return (
            <React.Fragment>
                {this.props.userData && !this.props.loading
                    ? (
                        <OpenOrdersData
                            openOrders={userOpenOrders}
                            handleCancelOpenOrders={this.handleCancelOpenOrder}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rows={this.openOrdersRows}
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

    private handleCancelOpenOrder = (id: number) => {
        const { userData } = this.props;
        const uid = userData.uid;
        this.props.cancelUserOpenOrders({ id, uid });
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetUserOpenOrders(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetUserOpenOrders(rows, 0);
    };

    private handleGetUserOpenOrders = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;

        this.props.getUserOpenOrders({ limit, page: page + 1, uid, state: 'wait' });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        userData: selectUserData(state),
        userOpenOrders: selectOrders(state),
        loading: selectOrdersLoading(state),
        total: selectOrdersTotalNumber(state),
        page: selectOrdersCurrentPage(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getUserData: payload => dispatch(getUserData(payload)),
        getUserOpenOrders: params => dispatch(getOrders(params)),
        cancelUserOpenOrders: payload => dispatch(cancelOrders(payload)),
        alertPush: params => dispatch(alertPush(params)),
    });

export const OpenOrdersPage = connect(mapStateToProps, mapDispatchToProps)(OpenOrdersScreen);

// tslint:disable-next-line:no-any
export const OpenOrders = withRouter(OpenOrdersPage as any);
