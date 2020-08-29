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
    addWallet,
    alertPush,
    AppState,
    BlockchainsDataInterface,
    CurrenciesDataInterface,
    editWallet,
    getBlockchains,
    getCurrencies,
    getGateway,
    getKind,
    getWalletDetails,
    selectBlockchains,
    selectCurrencies,
    selectGateway,
    selectKind,
    selectWalletDetails,
    WalletDetailsDataInterface,
} from '../../modules';

interface ReduxProps {
    blockchains: BlockchainsDataInterface[];
    currencies: CurrenciesDataInterface[];
    walletDetails: WalletDetailsDataInterface;
    // tslint:disable-next-line:no-any
    kinds: any;
    // tslint:disable-next-line:no-any
    gateways: any;
}

interface DispatchProps {
    getBlockchains: typeof getBlockchains;
    addWallet: typeof addWallet;
    editWallet: typeof editWallet;
    getCurrencies: typeof getCurrencies;
    getGateway: typeof getGateway;
    getKind: typeof getKind;
    getWalletDetails: typeof getWalletDetails;
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

interface AddWalletsState {
    id: number;
    name: string;
    kind: string;
    currency: string;
    address: string;
    gateway: string;
    max_balance: string;
    blockchain_key: string;
    status: string;
    mode: number;
    // tslint:disable-next-line:no-any
    settings: any;
    // tslint:disable-next-line:no-any
    anchorEl: any;
    property_name: string;
    isToggle: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class AddWalletsScreen extends React.Component<Props, AddWalletsState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            kind: '',
            currency: '',
            address: '',
            gateway: '',
            max_balance: '',
            blockchain_key: '',
            status: '',
            property_name: '',
            settings: [
                {
                    key: 'Url',
                    value: ''
                },
                {
                    key: 'secret',
                    value: ''
                },
            ],
            anchorEl: null,
            isToggle: false,
            mode: 0                // 0 for create and 1 for edit
        };
    }

    public componentWillReceiveProps(next: Props) {
        const { walletDetails } = next;
        if (!this.props.match.params.id) {
            if (next.blockchains.length) {
                this.setState({
                    blockchain_key: next.blockchains[0].key,
                });
            }
            if (next.gateways.length) {
                this.setState({
                    gateway: next.gateways[0],
                });
            }
            if (next.currencies.length) {
                this.setState({
                    currency: next.currencies[0].code,
                });
            }
            if (next.kinds.length) {
                this.setState({
                    kind: next.kinds[0],
                });
            }

        }
        const { settings } = next.walletDetails;

        if (this.props.match.params.id) {
            // tslint:disable-next-line:no-any
            const optionsData: any = [];
            for (const property in settings) {
                if (settings.hasOwnProperty(property)) {
                    optionsData.push({ key: property, value: settings[property] });
                }
            }
            this.setState({
                id: walletDetails.id,
                name: walletDetails.name,
                kind: walletDetails.kind,
                currency: walletDetails.currency,
                address: walletDetails.address,
                gateway: walletDetails.gateway,
                status: walletDetails.status,
                max_balance: walletDetails.max_balance,
                blockchain_key: walletDetails.blockchain_key,
                settings: optionsData,
                mode: 1
            });
        }
    }

    public componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.getWalletDetails({ id });
        }
        this.props.getCurrencies({ page: 1, limit: 50 });
        this.props.getBlockchains({ page: 1, limit: 50 });
        this.props.getGateway();
        this.props.getKind();
    }

    public render() {
        const {
            classes,
            blockchains,
            currencies,
            gateways,
            kinds
        } = this.props;
        const {
            name,
            kind,
            currency,
            address,
            gateway,
            max_balance,
            blockchain_key,
            status,
            anchorEl,
            property_name,
            settings,
            isToggle,
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
                                            name="status"
                                            control={<Switch checked={status === 'active' ? true : false} onChange={this.handleToggle} color="primary" />}
                                            label="Status"
                                            labelPlacement="start"
                                        />
                                        <Typography variant="body2" align="right" gutterBottom={true} className={status === 'active' ? classes.enabled : classes.disabled}>
                                            {status === 'active' ? 'Active' : 'Disabled'}
                                        </Typography>
                                    </Grid>
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
                                <Grid item={true}>
                                    <TextField
                                        label="Gateway Client"
                                        name="gateway"
                                        value={gateway}
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
                                        {gateways.map(option => (<option key={option} value={option}>{option}</option>))}
                                    </TextField>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Address"
                                        name="address"
                                        value={address}
                                        onChange={this.handleChange}
                                        placeholder="Enter address"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Currency Id"
                                        name="currency"
                                        value={currency}
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
                            </Grid>
                        </Grid>
                        <Grid container={true} item={true} xs={6} sm={6} md={6} lg={6}>
                            <Grid container={true} direction="column" item={true} >
                                <Grid item={true}>
                                    <TextField
                                        label="Kind"
                                        name="kind"
                                        value={kind}
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
                                        {kinds.map(option => (<option key={option} value={option}>{option}</option>))}
                                    </TextField>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Maximum Balance"
                                        name="max_balance"
                                        value={max_balance}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper} style={{ marginBottom: 15 }}>
                    <Grid container={true} spacing={24}>
                        <Grid container={true} direction="column" item={true} xs={12} sm={6} md={6} lg={6}>
                            <Grid container={true} item={true} direction="row" alignItems="center" justify="space-between" >
                                <Typography variant="h6" gutterBottom={true}>
                                    Settings
                                </Typography>
                                <Grid container={true} lg={4} md={4} xs={10} sm={4} item={true} direction="row" >
                                    <IconButton aria-label="add" onClick={this.handleOpen}>
                                        <AddIcon />
                                    </IconButton>
                                    <Typography variant="body1" style={{ marginLeft: 5, marginTop: 13 }} gutterBottom={true}>
                                        Add settings
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
                                                New settings
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
                            <Grid container={true} item={true} direction="row" alignItems="center" justify="space-between" >
                                {
                                    settings.map((option, i) => (
                                        <React.Fragment>
                                            <Grid item={true} lg={10} md={10} xs={8} sm={10}>
                                                <TextField
                                                    label={option.key}
                                                    type={option.key === 'secret' ? 'password' : 'text'}
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
                                    settings.map(option => (
                                        <p>{option.key}: {option.key === 'secret' ? `*`.repeat(option.value.length) : option.value}</p>
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
    private handleToggleClose = (event: any): void => {
        this.setState(prevState => ({
            ...prevState,
            isToggle: false,
        }));
    };

    // tslint:disable-next-line:no-any
    private handleChange = (event: any): void => {
        const { name, value } = event.currentTarget;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // tslint:disable-next-line:no-any
    private handleToggle = (event: any): void => {
        const { name } = event.currentTarget;
        const { checked } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: checked ? 'active' : 'disabled',
            isToggle: true,
        }));
    };

    private handleClick = (): void => {
        const { id, name, kind, currency, address, gateway, max_balance, blockchain_key, status, mode, settings } = this.state;
        const data = { id: 0, name, kind, currency, address, gateway, max_balance, blockchain_key, status, settings: {} };
        const settingsData = {};
        settings.map(x => {
            settingsData[x.key] = x.value;
        });
        data.settings = settingsData;
        if (mode) {
            data.id = id;
            this.props.editWallet(data);
        } else {
            delete data.id;
            this.props.addWallet(data);
        }
    };

    // tslint:disable-next-line:no-any
    private handleChangeOptions = (event: any, index: number): void => {
        const { value } = event.currentTarget;
        const { settings } = this.state;
        settings[index].value = value;
        this.setState(prevState => ({
            ...prevState,
            settings
        }));
    };

    private handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private handleClose = () => {
        this.setState({ anchorEl: null });
    };

    private handleAdd = (): void => {
        const { settings, property_name } = this.state;
        if (property_name) {
            settings.push({ key: property_name, value: '' });
            this.setState({ settings, property_name: '' });
            this.handleClose();
        }
    };

    private handleDelete = (index: number): void => {
        const { settings } = this.state;
        settings.splice(index, 1);
        this.setState({ settings });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        blockchains: selectBlockchains(state),
        currencies: selectCurrencies(state),
        kinds: selectKind(state),
        gateways: selectGateway(state),
        walletDetails: selectWalletDetails(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBlockchains: params => dispatch(getBlockchains(params)),
        getKind: () => dispatch(getKind()),
        getGateway: () => dispatch(getGateway()),
        getWalletDetails: params => dispatch(getWalletDetails(params)),
        addWallet: params => dispatch(addWallet(params)),
        editWallet: params => dispatch(editWallet(params)),
        getCurrencies: params => dispatch(getCurrencies(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const AddWallets = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddWalletsScreen as any)));

