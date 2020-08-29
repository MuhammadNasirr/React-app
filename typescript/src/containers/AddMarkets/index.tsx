import {
    Button,
    createStyles,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
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
    addMarkets,
    alertPush,
    AppState,
    CurrenciesDataInterface,
    editMarkets,
    getCurrencies,
    getMarketsDetails,
    MarketsDetailsDataInterface,
    selectCurrencies,
    selectMarketsDetails,
} from '../../modules';

interface ReduxProps {
    currencies: CurrenciesDataInterface[];
    marketsDetails: MarketsDetailsDataInterface;
}

interface DispatchProps {
    getCurrencies: typeof getCurrencies;
    addMarkets: typeof addMarkets;
    editMarkets: typeof editMarkets;
    alertPush: typeof alertPush;
    getMarketsDetails: typeof getMarketsDetails;
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
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    menu: {
        width: 400,
    },
    borderbox: {
        border: '1px solid lightgrey',
        borderRadius: 5,
        padding: 20
    },
    enabled: {
        color: 'green',
    },
    disabled: {
        color: 'red'
    }
});

interface StyleProps extends WithStyles<typeof styles> {
}

interface AdMarketState {
    id: string;
    name: string;
    base_currency: string;
    quote_currency: string;
    // tslint:disable-next-line:no-any
    min_price: any;
    // tslint:disable-next-line:no-any
    max_price: any;
    // tslint:disable-next-line:no-any
    min_amount: any;
    amount_precision: number;
    price_precision: number;
    state: string;
    position: number;
    status: boolean;
    mode: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class AddMarketsScreen extends React.Component<Props, AdMarketState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            max_price: 0,
            position: 0,
            state: 'disabled',
            base_currency: '',
            quote_currency: '',
            amount_precision: 0,
            price_precision: 0,
            min_price: 0,
            min_amount: 0,
            status: false,
            mode: 0
        };
    }

    public componentWillReceiveProps(next: Props) {
        const id = this.props.match.params.id;
        if (next.currencies.length) {
            this.setState({
                base_currency: next.currencies[0].code,
                quote_currency: next.currencies[0].code,
            });
        }
        if (next.marketsDetails.id && id) {
            this.setState({
                id: next.marketsDetails.id,
                name: next.marketsDetails.name,
                base_currency: next.marketsDetails.base_unit,
                quote_currency: next.marketsDetails.quote_unit,
                min_price: next.marketsDetails.min_price,
                max_price: next.marketsDetails.max_price,
                min_amount: next.marketsDetails.min_amount,
                amount_precision: next.marketsDetails.amount_precision,
                price_precision: next.marketsDetails.price_precision,
                state: next.marketsDetails.state,
                position: next.marketsDetails.position,
                mode: 1,
            });
        }
    }

    public componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.getMarketsDetails({ id });
        }
        this.props.getCurrencies({ page: 1, limit: 50 });
    }

    public render() {
        const {
            classes,
            currencies
        } = this.props;
        const {
            base_currency,
            quote_currency,
            max_price,
            min_price,
            price_precision,
            amount_precision,
            min_amount,
            position,
            mode,
            state
        } = this.state;

        return (
            <React.Fragment>
                <Grid container={true} direction="row" spacing={24}>
                    <Paper className={classes.paper} style={{ marginBottom: 15, width: '48%', marginRight: '1%' }}>
                        <Typography variant="h6" gutterBottom={true}>
                            Base currency
                        </Typography>
                        <Grid item={true}>
                            <TextField
                                disabled={mode ? true : false}
                                label="Currency"
                                name="base_currency"
                                value={base_currency}
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
                                {currencies.map(option => (<option key={option.code} value={option.code}>{option.code}</option>))}
                            </TextField>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper} style={{ marginBottom: 15, width: '50%' }}>
                        <Typography variant="h6" gutterBottom={true}>
                            Quote currency
                        </Typography>
                        <Grid item={true}>
                            <TextField
                                disabled={mode ? true : false}
                                label="Currency"
                                name="quote_currency"
                                value={quote_currency}
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
                                {currencies.map(option => (<option key={option.code} value={option.code}>{option.code}</option>))}
                            </TextField>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container={true} direction="row" style={{ marginTop: 10 }} spacing={24}>
                    <Paper className={classes.paper} style={{ marginBottom: 15, width: '100%' }}>
                        <Grid container={true} item={true} direction="row" alignItems="flex-start" justify="space-between" >
                            <Typography variant="h6" gutterBottom={true}>
                                Settings
                                </Typography>
                            <Grid item={true} justify="flex-end">
                                <FormControlLabel
                                    value="start"
                                    name="status"
                                    control={<Switch checked={state === 'enabled' ? true : false} onChange={this.handleToggle} color="primary" />}
                                    label="Status"
                                    style={{ fontSize: 12 }}
                                    labelPlacement="start"
                                />
                                <Typography variant="body2" align="right" gutterBottom={true} className={state === 'enabled' ? classes.enabled : classes.disabled}>
                                    {state === 'enabled' ? 'Enabled' : 'Disabled'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container={true} spacing={24} direction="row">
                            <Grid item={true} lg={3}>
                                <Typography variant="body1" gutterBottom={true}>
                                    Min Price
                                </Typography>
                                <Grid item={true}>
                                    <TextField
                                        name="min_price"
                                        value={min_price}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item={true} lg={3}>
                                <Typography variant="body1" gutterBottom={true}>
                                    Max Price
                                </Typography>
                                <Grid item={true}>
                                    <TextField
                                        name="max_price"
                                        value={max_price}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        type="number"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item={true} justify="space-between" lg={3}>
                                <Typography variant="body1" style={{ marginBottom: 25 }} gutterBottom={true}>
                                    Price precision
                                </Typography>
                                <Grid item={true}>
                                    <TextField
                                        disabled={mode ? true : false}
                                        name="price_precision"
                                        value={price_precision}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item={true} lg={3}>
                                <Typography variant="body1" style={{ marginBottom: 25 }} gutterBottom={true}>
                                    Amount precision
                                </Typography>
                                <Grid item={true} >
                                    <TextField
                                        disabled={mode ? true : false}
                                        name="amount_precision"
                                        value={amount_precision}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container={true} spacing={24} direction="row" justify="space-between">
                            <Grid item={true} lg={3}>
                                <Typography variant="body1" gutterBottom={true}>
                                    Min Amount
                                </Typography>
                                <Grid item={true}>
                                    <TextField
                                        name="min_amount"
                                        value={min_amount}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item={true} lg={3}>
                                <Typography variant="body1" style={{ marginBottom: 25 }} gutterBottom={true}>
                                    Position
                                </Typography>
                                <Grid item={true} >
                                    <TextField
                                        name="position"
                                        value={position}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item={true} justify="flex-end" alignItems="flex-end">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                style={{ float: 'right', marginTop: 15 }}
                                onClick={this.handleClick}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private handleToggle = (event: any): void => {
        const { name } = event.currentTarget;
        const { checked } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: checked,
            state: checked ? 'enabled' : 'disabled'
        }));
    };

    // tslint:disable-next-line:no-any
    private handleChange = (event: any): void => {
        const { name, value, type } = event.currentTarget;
        this.setState(prevState => ({
            ...prevState,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    private handleClick = (): void => {
        const { base_currency, quote_currency, state, max_price, min_price, price_precision, amount_precision, min_amount, position, mode } = this.state;
        if (mode) {
            const data = { id: `${base_currency}${quote_currency}`, state, max_price, min_price, min_amount, position };
            data.min_amount = this.convertExponentialToDecimal(min_amount);
            data.min_price = this.convertExponentialToDecimal(min_price);
            data.max_price = this.convertExponentialToDecimal(max_price);
            this.props.editMarkets(data);
        } else {
            const data = { base_currency, quote_currency, state, max_price, min_price, price_precision, amount_precision, min_amount, position };
            data.min_amount = this.convertExponentialToDecimal(min_amount);
            data.min_price = this.convertExponentialToDecimal(min_price);
            data.max_price = this.convertExponentialToDecimal(max_price);
            this.props.addMarkets(data);
        }
    };

    // tslint:disable-next-line:no-any
    private convertExponentialToDecimal(exponentialNumber: number): any {
        const str = exponentialNumber.toString();
        if (str.indexOf('e') !== -1) {
            const exponent = parseInt(str.split('-')[1], 10);
            const result = exponentialNumber.toFixed(exponent);
            return result;
        } else {
            return exponentialNumber;
        }
    }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        currencies: selectCurrencies(state),
        marketsDetails: selectMarketsDetails(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getCurrencies: params => dispatch(getCurrencies(params)),
        addMarkets: params => dispatch(addMarkets(params)),
        editMarkets: params => dispatch(editMarkets(params)),
        getMarketsDetails: params => dispatch(getMarketsDetails(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const AddMarkets = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddMarketsScreen as any)));

