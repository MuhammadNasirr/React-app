import {
    createStyles,
    Paper,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchBarRequestInterface } from '../';
import { tablePageLimit } from '../../api/config';
import { InfoTable } from '../../components';
import { convertToObj } from '../../helpers';
import {
    AppState,
    getMemberDetails,
    MemberDetailsDataInterface,
    selectMemberDetails,
    selectMemberDetailsLoading,
} from '../../modules';

const styles = (theme: Theme) => (createStyles({
    emptyTable: {
        padding: theme.spacing.unit,
    },
    root: {
        width: '100%',
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableRow: {
        '&:hover': {
            backgroundColor: '#f9f9f9',
        },
    },
    selectIcon: {
        paddingLeft: '10px',
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface ReduxProps {
    loading: boolean;
    member: MemberDetailsDataInterface;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    location?: {
        pathname: string;
    };
}

interface DispatchProps {
    getMemberDetails: typeof getMemberDetails;
}

interface State {
    currentPage: number;
    currentLimit: number;
    activeSelectItem: {
        value: string;
        label: string;
    };
    searchValue: string;
    data: SearchBarRequestInterface[];
}

type Props = StyleProps & ReduxProps & DispatchProps & OwnProps;

class BalancesScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentPage: 0,
            currentLimit: tablePageLimit(),
            activeSelectItem: this.selectedValues[0],
            searchValue: '',
            data: [{
                property: '',
                value: '',
            }],
        };
    }

    private activityRows = [
        { key: 'currency', alignRight: false, label: 'Currency' },
        { key: 'balance', alignRight: false, label: 'Available balance' },
        { key: 'locked', alignRight: false, label: 'Locked balance' },
        { key: 'total', alignRight: true, label: 'Total balance' },
    ];

    private selectedValues = [
        {
            label: 'UID',
            value: 'uid',
            checked: false,
        },
        {
            label: 'Email',
            value: 'email',
            checked: false,
        },
        {
            label: 'Action',
            value: 'action',
            checked: false,
        },
        {
            label: 'Topic',
            value: 'topic',
            checked: false,
        },
    ];


    public componentDidMount() {
        this.props.getMemberDetails({ uid: this.props.match.params.uid });
    }

    public render() {
        const {
            member,
            loading,
            classes,
        } = this.props;
        return (
            <React.Fragment>
                <Paper style={{ marginTop: 25 }}>
                    {member && member.accounts && this.renderContent()}
                    {!member && !loading && <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                </Paper>
            </React.Fragment>
        );
    }

    public renderContent = () => {
        const {
            member,
        } = this.props;

        const {
            currentLimit,
            currentPage,
        } = this.state;
        console.log(member);
        return (
            <React.Fragment>
                <InfoTable
                    dataLength={member.accounts.length}
                    rows={this.activityRows}
                    data={member.accounts}
                    page={currentPage}
                    rowsPerPage={currentLimit}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    hidePagination={false}
                    label={'User Balances'}
                    location={this.props.location}
                />
            </React.Fragment>
        );
    }

    private handleChangePage = (page: number) => {
        this.setState({ currentPage: page });
        this.handleGetMemberDetails(this.state.currentLimit, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            currentLimit: rows,
            currentPage: 0,
        });
        this.handleGetMemberDetails(rows, 0);
    };

    private handleGetMemberDetails = (limit: number, page: number) => {
        const data = this.state.data ? convertToObj(this.state.data) : '';
        this.props.getMemberDetails({ page: page + 1, limit, ...data });
    }
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    member: selectMemberDetails(state),
    loading: selectMemberDetailsLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getMemberDetails: params => dispatch(getMemberDetails(params)),
    });

// tslint:disable-next-line:no-any
export const Balances = withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(BalancesScreen as any)));
