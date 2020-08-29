import {
    Button,
    createStyles,
    Grid,
    Paper,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
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
    addAdjustment,
    alertPush,
    AppState,
    CurrenciesDataInterface,
    getCurrencies,
    selectCurrencies
} from '../../modules';

interface ReduxProps {
    currencies: CurrenciesDataInterface[];
}

interface DispatchProps {
    getCurrencies: typeof getCurrencies;
    addAdjustment: typeof addAdjustment;
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

const styles = (theme: Theme) => createStyles({
    paper: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2
    },
    button: {
        backgroundColor: '#E23328',
        color: '#ffffff'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    menu: {
        width: 400,
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}

interface AdjustmentState {
    reason: string;
    currency_id: string;
    category: string;
    amount: number;
    receiving_member_uid: string;
    receiving_account_code: number;
    asset_account_code: number;
    description: string;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class AddAdjustmentScreen extends React.Component<Props, AdjustmentState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            reason: '',
            currency_id: '',
            category: 'asset_registration',
            amount: 0,
            receiving_member_uid: '',
            receiving_account_code: 202,
            asset_account_code: 102,
            description: ''
        };
    }

    private accountCodes = [
        {
            key: 201,
            value: 201
        },
        {
            key: 301,
            value: 301
        },
        {
            key: 401,
            value: 401
        }
    ];

    private categories = [
        {
            key: 'asset_registration',
            value: 'asset_registration'
        },
        {
            key: 'investment',
            value: 'investment'
        },
        {
            key: 'minting_token',
            value: 'minting_token'
        },
        {
            key: 'balance_anomaly',
            value: 'balance_anomaly'
        },
        {
            key: 'misc',
            value: 'misc'
        },
        {
            key: 'refund',
            value: 'refund'
        },
        {
            key: 'compensation',
            value: 'compensation'
        },
        {
            key: 'incentive',
            value: 'incentive'
        },
        {
            key: 'bank_fees',
            value: 'bank_fees'
        },
        {
            key: 'bank_interest',
            value: 'bank_interest'
        },
        {
            key: 'minor',
            value: 'minor'
        }
    ];

    public componentWillReceiveProps(next: Props) {
        if (next.currencies.length) {
            this.setState({
                currency_id: next.currencies[0].code,
            });
        }
    }

    public componentDidMount() {
        this.props.getCurrencies({ page: 1, limit: 50 });
    }

    public render() {
        const {
            classes,
            currencies
        } = this.props;
        const {
            reason,
            currency_id,
            category,
            amount,
            asset_account_code,
            receiving_account_code,
            receiving_member_uid,
            description
        } = this.state;

        return (
            <React.Fragment>
                <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                    <Typography variant="h6" gutterBottom={true}>
                        Add
                    </Typography>
                    <Grid container={true} spacing={24}>
                        <Grid container={true} item={true} xs={6} sm={6} md={6} lg={6}>
                            <Grid container={true} direction="column" item={true}>
                                <Grid item={true}>
                                    <TextField
                                        label="Reason"
                                        name="reason"
                                        value={reason}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Currency"
                                        name="currency_id"
                                        value={currency_id}
                                        select={true}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                    >
                                        {currencies.map(option => (<option key={option.code} value={option.code}>{option.code.toUpperCase()}</option>))}
                                    </TextField>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Category"
                                        name="category"
                                        value={category}
                                        select={true}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                    >
                                        {this.categories.map(option => (<option key={option.key} value={option.value}>{option.value}</option>))}
                                    </TextField>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Amount"
                                        name="amount"
                                        value={amount}
                                        type="number"
                                        onChange={this.handleChange}
                                        placeholder="Enter an amount"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Asset Code"
                                        name="asset_account_code"
                                        value={asset_account_code}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        type="number"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <Typography variant="body2" gutterBottom={true}>
                                        Receiving Account Number
                                    </Typography>
                                </Grid>
                                <Grid container={true} direction="row" item={true}>
                                    <Grid item={true} xs={4} sm={4} md={4} lg={4}>
                                        <TextField
                                            label="Currency"
                                            name="currency"
                                            margin="dense"
                                            value={currency_id}
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <div
                                        style={{
                                            top: 10,
                                            width: 15,
                                            display: 'flex',
                                            alignSelf: 'center',
                                            borderTop: '1px solid #bbbbbb',
                                            marginLeft: 8,
                                            marginRight: 8
                                        }}
                                    />
                                    <Grid item={true} xs={2} sm={2} md={2} lg={2}>
                                        <TextField
                                            select={true}
                                            name="receiving_account_code"
                                            margin="dense"
                                            value={receiving_account_code}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            style={{ width: '100%' }}
                                            SelectProps={{
                                                native: true,
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                        >
                                            {this.accountCodes.map(option => (<option key={option.key} value={option.value}>{option.value}</option>))}
                                        </TextField>
                                    </Grid>
                                    <div
                                        style={{
                                            top: 10,
                                            width: 15,
                                            display: 'flex',
                                            alignSelf: 'center',
                                            borderTop: '1px solid #bbbbbb',
                                            marginLeft: 8,
                                            marginRight: 8
                                        }}
                                    />
                                    <Grid item={true} xs={4} sm={4} md={4} lg={4}>
                                        <TextField
                                            label="UID"
                                            name="receiving_member_uid"
                                            value={receiving_member_uid}
                                            onChange={this.handleChange}
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container={true} item={true} xs={6} sm={6} md={6} lg={6}>
                            <Grid container={true} direction="column" item={true}>
                                <Grid item={true}>
                                    <TextField
                                        label="Adjustment Description"
                                        value={description}
                                        name="description"
                                        onChange={this.handleChange}
                                        multiline={true}
                                        rows="16"
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        style={{ float: 'right', marginTop: 15 }}
                                        onClick={this.handleClick}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChange = (event: any): void => {
        const { name, value } = event.currentTarget;
        if (name === 'currency_id') {
            this.props.currencies.map(option => {
                if (option.code === value) {
                    if (option.type === 'coin') {
                        this.setState({ asset_account_code: 102 });
                    } else {
                        this.setState({ asset_account_code: 101 });
                    }
                }
            });
        }
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    private handleClick = (): void => {
        const { reason, currency_id, category, amount, asset_account_code, receiving_account_code, receiving_member_uid, description } = this.state;
        const data = { reason, currency_id, category, amount, asset_account_code, receiving_account_code, receiving_member_uid, description };
        data.amount = Number(data.amount);
        data.asset_account_code = Number(data.asset_account_code);
        data.receiving_account_code = Number(data.receiving_account_code);
        this.props.addAdjustment(data);
    };

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        currencies: selectCurrencies(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getCurrencies: params => dispatch(getCurrencies(params)),
        addAdjustment: params => dispatch(addAdjustment(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const AddAdjustment = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddAdjustmentScreen as any)));

