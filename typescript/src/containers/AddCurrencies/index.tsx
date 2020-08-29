import {
    Button,
    createStyles,
    FormControlLabel,
    Grid,
    IconButton,
    Paper,
    Switch,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { WarningPaper } from '../../components';
import {
    addCurrencies,
    alertPush,
    AppState,
    BlockchainsDataInterface,
    CurrenciesDetailsDataInterface,
    editCurrencies,
    getBlockchains,
    getCurrenciesDetails,
    selectBlockchains,
    selectCurrenciesDetails,
    selectCurrenciesDetailsLoading
} from '../../modules';

interface ReduxProps {
    blockchains: BlockchainsDataInterface[];
    currencyDetails: CurrenciesDetailsDataInterface;
    loading: boolean;
}

interface DispatchProps {
    getBlockchains: typeof getBlockchains;
    addCurrency: typeof addCurrencies;
    editCurrency: typeof editCurrencies;
    getCurrencyDetails: typeof getCurrenciesDetails;
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
    propertyPaper: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
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
    },
    topPaper: {
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255, 152, 0) !important',
    },
    iconClose: {
        cursor: 'pointer'
    },
    warningIcon: {
        marginRight: 10
    },
    propertyleft: {
        flexDirection: 'row'
    },
});

interface StyleProps extends WithStyles<typeof styles> {
}

interface AddCurrencyState {
    name: string;
    code: string;
    symbol: string;
    type: string;
    subunits: number;
    precision: number;
    blockchain_key: string;
    deposit_fee: number;
    min_deposit_amount: number;
    min_collection_amount: number;
    min_withdraw_amount: number;
    withdraw_fee: number;
    withdraw_limit_24h: number;
    withdraw_limit_72h: number;
    position: number;
    icon_url: string;
    visible: boolean;
    withdrawal_enabled: boolean;
    deposit_enabled: boolean;
    // tslint:disable-next-line:no-any
    options: any;
    property_name: string;
    // tslint:disable-next-line:no-any
    anchorEl: any;
    mode: number;
    isToggle: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class AddCurrenciesScreen extends React.Component<Props, AddCurrencyState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            code: '',
            symbol: '',
            type: 'coin',
            subunits: 0,
            precision: 0,
            blockchain_key: '',
            deposit_fee: 0,
            min_deposit_amount: 0,
            min_collection_amount: 0,
            min_withdraw_amount: 0,
            withdraw_fee: 0,
            withdraw_limit_24h: 0,
            withdraw_limit_72h: 0,
            position: 0,
            icon_url: '',
            visible: true,
            withdrawal_enabled: false,
            deposit_enabled: false,
            property_name: '',
            options: [
                {
                    key: 'erc20_contract_address',
                    value: ''
                },
                {
                    key: 'gas_limit',
                    value: ''
                },
                {
                    key: 'gas_price',
                    value: ''
                }
            ],
            anchorEl: null,
            isToggle: false,
            mode: 0                         // 0 for create and 1 for edit
        };
    }

    private types = [
        {
            key: 'coin',
            value: 'coin'
        },
        {
            key: 'fiat',
            value: 'fiat'
        }
    ];

    public componentWillReceiveProps(next: Props) {
        const { currencyDetails } = next;
        const add = this.props.history.location.state.add;
        console.log('this.props.history.location.add', this.props.history.location.state.add);
        if (next.blockchains.length && add) {
            this.setState({
                blockchain_key: next.blockchains[0].key,
            });
        }
        if (next.currencyDetails.code !== this.props.currencyDetails.code) {
            const { options } = currencyDetails;
            // tslint:disable-next-line:no-any
            const optionsData: any = [];
            for (const property in options) {
                if (options.hasOwnProperty(property)) {
                    optionsData.push({ key: property, value: options[property] });
                }
            }
            this.setState({
                name: currencyDetails.name,
                visible: currencyDetails.visible,
                code: currencyDetails.code,
                symbol: currencyDetails.symbol,
                type: currencyDetails.type,
                subunits: Number(currencyDetails.subunits),
                precision: Number(currencyDetails.precision),
                blockchain_key: currencyDetails.blockchain_key,
                deposit_enabled: currencyDetails.deposit_enabled,
                withdrawal_enabled: currencyDetails.withdrawal_enabled,
                deposit_fee: Number(currencyDetails.deposit_fee),
                min_deposit_amount: Number(currencyDetails.min_deposit_amount),
                min_collection_amount: Number(currencyDetails.min_collection_amount),
                withdraw_fee: Number(currencyDetails.withdraw_fee),
                min_withdraw_amount: Number(currencyDetails.min_withdraw_amount),
                withdraw_limit_24h: Number(currencyDetails.withdraw_limit_24h),
                withdraw_limit_72h: Number(currencyDetails.withdraw_limit_72h),
                position: Number(currencyDetails.position),
                icon_url: currencyDetails.icon_url,
                options: optionsData,
                mode: 1
            });
        }
    }

    public componentDidMount() {
        const currency = this.props.match.params.currency;
        if (currency) {
            this.props.getCurrencyDetails({ currency });
        }
        this.props.getBlockchains({ page: 1, limit: 50 });
    }

    public render() {
        const {
            classes,
            blockchains,
        } = this.props;
        const {
            name,
            code,
            symbol,
            type,
            subunits,
            precision,
            blockchain_key,
            deposit_fee,
            min_deposit_amount,
            min_collection_amount,
            min_withdraw_amount,
            withdraw_fee,
            withdraw_limit_24h,
            withdraw_limit_72h,
            position,
            icon_url,
            visible,
            withdrawal_enabled,
            deposit_enabled,
            anchorEl,
            options,
            property_name,
            isToggle
        } = this.state;

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <React.Fragment>
                {
                    isToggle ?
                        <WarningPaper ToggleClose={this.handleToggleClose} title={'For applying any change you need to submit'} /> : null
                }
                <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                    <Typography variant="h6" gutterBottom={true}>
                        Add
                    </Typography>
                    <Grid container={true} spacing={24}>
                        <Grid container={true} item={true} xs={6} sm={6} md={6} lg={6}>
                            <Grid container={true} direction="column" item={true}>
                                <Grid container={true} direction="row" alignItems="flex-start" justify="space-between" item={true}>
                                    <Grid lg={8} item={true}>
                                        <TextField
                                            label="Name"
                                            name="name"
                                            value={name}
                                            onChange={this.handleChange}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item={true} justify="flex-end">
                                        <FormControlLabel
                                            value="start"
                                            name="visible"
                                            control={<Switch checked={visible} onChange={this.handleToggle} color="primary" />}
                                            label="Visible"
                                            labelPlacement="start"
                                        />
                                        <Typography variant="body2" align="right" gutterBottom={true} className={visible ? classes.enabled : classes.disabled}>
                                            {visible ? 'Enabled' : 'Disabled'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Code"
                                        name="code"
                                        value={code}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Symbol"
                                        name="symbol"
                                        value={symbol}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Type"
                                        name="type"
                                        value={type}
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
                                        {this.types.map(option => (<option key={option.key} value={option.value}>{option.value}</option>))}
                                    </TextField>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Subunits"
                                        name="subunits"
                                        value={subunits}
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
                                        label="Precision"
                                        name="precision"
                                        value={precision}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        type="number"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Blockchain Key"
                                        name="blockchain_key"
                                        value={blockchain_key}
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
                                        {blockchains.map(option => (<option key={option.key} value={option.key}>{option.key}</option>))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container={true} item={true} xs={6} sm={6} md={6} lg={6}>
                            <Grid container={true} direction="column" item={true} >
                                <Grid container={true} direction="row" alignItems="flex-start" justify="space-between" item={true}>
                                    <Grid item={true} justify="flex-end">
                                        <FormControlLabel
                                            value="start"
                                            name="deposit_enabled"
                                            control={<Switch checked={deposit_enabled} onChange={this.handleToggle} color="primary" />}
                                            label="Deposit"
                                            labelPlacement="start"
                                        />
                                        <Typography variant="body2" align="right" gutterBottom={true} className={deposit_enabled ? classes.enabled : classes.disabled}>
                                            {deposit_enabled ? 'Enabled' : 'Disabled'}
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} justify="flex-end">
                                        <FormControlLabel
                                            value="start"
                                            name="withdrawal_enabled"
                                            control={<Switch checked={withdrawal_enabled} onChange={this.handleToggle} color="primary" />}
                                            label="Withdrawal"
                                            labelPlacement="start"
                                        />
                                        <Typography variant="body2" align="right" gutterBottom={true} className={withdrawal_enabled ? classes.enabled : classes.disabled}>
                                            {withdrawal_enabled ? 'Enabled' : 'Disabled'}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item={true}>
                                    <TextField
                                        label="Deposit Fee"
                                        name="deposit_fee"
                                        value={deposit_fee}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                                <Grid container={true} justify="space-between" direction="row" item={true} >
                                    <Grid item={true}>
                                        <TextField
                                            label="Minimum Deposit Amount"
                                            name="min_deposit_amount"
                                            value={min_deposit_amount}
                                            onChange={this.handleChange}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item={true}>
                                        <TextField
                                            label="Minimum Collection Amount"
                                            name="min_collection_amount"
                                            value={min_collection_amount}
                                            onChange={this.handleChange}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Withdraw Fee"
                                        name="withdraw_fee"
                                        value={withdraw_fee}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Minimum Withhdraw Amount"
                                        name="min_withdraw_amount"
                                        value={min_withdraw_amount}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                                <Grid container={true} justify="space-between" direction="row" item={true} >
                                    <Grid item={true}>
                                        <TextField
                                            label="24h Withdraw Limit"
                                            name="withdraw_limit_24h"
                                            value={withdraw_limit_24h}
                                            onChange={this.handleChange}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item={true}>
                                        <TextField
                                            label="72h Withdraw Limit"
                                            name="withdraw_limit_72h"
                                            value={withdraw_limit_72h}
                                            onChange={this.handleChange}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Position"
                                        name="position"
                                        value={position}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Icon URL"
                                        name="icon_url"
                                        value={icon_url}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                    <Grid container={true} className={classes.propertyPaper} spacing={24}>
                        <Grid container={true} direction="column" item={true} xs={12} sm={6} md={6} lg={6}>
                            <Grid container={true} item={true} direction="row" alignItems="center" justify="space-between" >
                                <Typography variant="h6" gutterBottom={true}>
                                    Properties
                                </Typography>
                                <Grid container={true} lg={4} md={4} xs={10} sm={4} item={true} direction="row" >
                                    <IconButton aria-label="add" onClick={this.handleOpen}>
                                        <AddIcon />
                                    </IconButton>
                                    <Typography variant="body1" style={{ marginLeft: 5, marginTop: 13 }} gutterBottom={true}>
                                        Add property
                                    </Typography>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={this.handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <div style={{ padding: 10 }}>
                                            <Typography variant="body1">
                                                New property
                                            </Typography>
                                            <div style={{ display: 'flex' }}>
                                                <TextField
                                                    label="Property Name"
                                                    name="property_name"
                                                    value={property_name}
                                                    onChange={this.handleChange}
                                                    margin="normal"
                                                    variant="standard"
                                                />
                                                <IconButton aria-label="add" onClick={this.handleAdd}>
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </Popover>
                                </Grid>
                            </Grid>
                            <Grid container={true} item={true} className={classes.propertyleft} direction="row" alignItems="center" justify="space-between" >
                                {
                                    options.map((option, i) => (
                                        <React.Fragment>
                                            <Grid item={true} lg={10} md={10} xs={8} sm={10}>
                                                <TextField
                                                    label={option.key}
                                                    name="receiving_member_uid"
                                                    value={option.value}
                                                    onChange={e => this.handleChangeOptions(e, i)}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <IconButton aria-label="add" onClick={e => this.handleDelete(i)}>
                                                <RemoveIcon />
                                            </IconButton>
                                        </React.Fragment>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid container={true} direction="column" item={true} xs={12} sm={6} md={6} lg={6}>
                            <div className={classes.borderbox}>
                                <Typography variant="subtitle1" gutterBottom={true} style={{ marginTop: -33, backgroundColor: '#fff', width: 50, textAlign: 'center' }}>JSON</Typography>
                                <p>{'{'}</p>
                                {
                                    options.map(option => (
                                        <p>{option.key}: {option.value}</p>
                                    ))
                                }
                                <p>{'}'}</p>
                            </div>
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
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChange = (event: any): void => {
        const { name, value } = event.currentTarget;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // tslint:disable-next-line:no-any
    private handleChangeOptions = (event: any, index: number): void => {
        const { value } = event.currentTarget;
        const { options } = this.state;
        options[index].value = value;
        this.setState(prevState => ({
            ...prevState,
            options
        }));
    };

    // tslint:disable-next-line:no-any
    private handleToggle = (event: any): void => {
        const { name } = event.currentTarget;
        const { checked } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: checked,
            isToggle: true,
        }));
    };

    // tslint:disable-next-line:no-any
    private handleToggleClose = (event: any): void => {
        this.setState(prevState => ({
            ...prevState,
            isToggle: false,
        }));
    };

    private handleClick = (): void => {
        const { name, visible, code, symbol, type, subunits, precision, blockchain_key, deposit_enabled, withdrawal_enabled, deposit_fee, min_deposit_amount, min_collection_amount, withdraw_fee, min_withdraw_amount, withdraw_limit_24h, withdraw_limit_72h, position, icon_url, options, mode } = this.state;
        const data = { name, visible, code, symbol, type, subunits, precision, blockchain_key, deposit_enabled, withdrawal_enabled, deposit_fee, min_deposit_amount, min_collection_amount, withdraw_fee, min_withdraw_amount, withdraw_limit_24h, withdraw_limit_72h, position, icon_url, options: {} };
        const optionsData = {};
        options.map(x => {
            optionsData[x.key] = x.value;
        });
        data.options = optionsData;
        if (mode) {
            this.props.editCurrency(data);
        } else {
            this.props.addCurrency(data);
        }
    };

    private handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private handleClose = () => {
        this.setState({ anchorEl: null });
    };

    private handleAdd = (): void => {
        const { options, property_name } = this.state;
        if (property_name) {
            options.push({ key: property_name, value: '' });
            this.setState({ options, property_name: '' });
            this.handleClose();
        }
    };

    private handleDelete = (index: number): void => {
        const { options } = this.state;
        options.splice(index, 1);
        this.setState({ options });
    };

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        blockchains: selectBlockchains(state),
        currencyDetails: selectCurrenciesDetails(state),
        loading: selectCurrenciesDetailsLoading(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBlockchains: params => dispatch(getBlockchains(params)),
        addCurrency: params => dispatch(addCurrencies(params)),
        editCurrency: params => dispatch(editCurrencies(params)),
        getCurrencyDetails: params => dispatch(getCurrenciesDetails(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const AddCurrencies = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCurrenciesScreen as any)));

