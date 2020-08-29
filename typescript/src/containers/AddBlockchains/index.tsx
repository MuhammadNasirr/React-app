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
import { WarningPaper } from '../../components';
import {
    addBlockchain,
    alertPush,
    AppState,
    BlockchainDetailsDataInterface,
    BlockchainsDataInterface,
    editBlockchain,
    getBlockchainDetails,
    getBlockchains,
    getClient,
    selectBlockchainDetails,
    selectBlockchainDetailsLoading,
    selectBlockchains,
    selectClient,
} from '../../modules';

interface ReduxProps {
    blockchains: BlockchainsDataInterface[];
    // tslint:disable-next-line:no-any
    clients: any;
    blockchainDetails: BlockchainDetailsDataInterface;
    loading: boolean;
}

interface DispatchProps {
    getBlockchains: typeof getBlockchains;
    getClient: typeof getClient;
    addBlockchain: typeof addBlockchain;
    editBlockchain: typeof editBlockchain;
    getBlockchainDetails: typeof getBlockchainDetails;
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

interface AddBlockchainsState {
    id: number;
    name: string;
    status: string;
    client: string;
    server: string;
    min_confirmations: number;
    height: number;
    key: string;
    explorer_address: string;
    explorer_transaction: string;
    // tslint:disable-next-line:no-any
    anchorEl: any;
    mode: number;
    isToggle: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps & StyleProps;

class AddBlockchainsScreen extends React.Component<Props, AddBlockchainsState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            status: '',
            client: '',
            server: '',
            min_confirmations: 0,
            height: 0,
            key: '',
            explorer_address: '',
            explorer_transaction: '',
            anchorEl: null,
            isToggle: false,
            mode: 0                         // 0 for create and 1 for edit
        };
    }

    public componentWillReceiveProps(next: Props) {
        const { blockchainDetails } = next;
        if (next.clients.length) {
            this.setState({
                client: next.clients[0],
            });
        }
        if (this.props.match.params.id) {
            this.setState({
                id: blockchainDetails.id,
                name: blockchainDetails.name,
                client: blockchainDetails.client,
                server: blockchainDetails.server,
                min_confirmations: blockchainDetails.min_confirmations,
                key: blockchainDetails.key,
                status: blockchainDetails.status,
                height: blockchainDetails.height,
                explorer_address: blockchainDetails.explorer_address,
                explorer_transaction: blockchainDetails.explorer_transaction,
                mode: 1
            });
        }
    }

    public componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.getBlockchainDetails({ id });
        }
        this.props.getBlockchains({ page: 1, limit: 50 });
        this.props.getClient();
    }

    public render() {
        const {
            classes,
            clients,
        } = this.props;
        const {
            name,
            status,
            client,
            server,
            min_confirmations,
            height,
            key,
            explorer_address,
            explorer_transaction,
            isToggle
        } = this.state;

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
                                        label="Client"
                                        name="client"
                                        value={client}
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
                                        {clients.map(option => (<option key={option} value={option}>{option}</option>))}
                                    </TextField>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Server"
                                        name="server"
                                        value={server}
                                        onChange={this.handleChange}
                                        placeholder="http://geth:8584"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Min Confirmations"
                                        name="min_confirmations"
                                        value={min_confirmations}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container={true} item={true} xs={6} sm={6} md={6} lg={6}>
                            <Grid container={true} direction="column" item={true} >
                                <Grid item={true}>
                                    <TextField
                                        label="Height"
                                        name="height"
                                        value={height}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Key"
                                        name="key"
                                        placeholder="eth-rinkeyby"
                                        value={key}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Explorer Address"
                                        name="explorer_address"
                                        placeholder="https://rinkeby.etherscan.io/address/#(address)"
                                        value={explorer_address}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        label="Explorer Transaction"
                                        name="explorer_transaction"
                                        placeholder="https://rinkeby.etherscan.io/tx/#(txid)"
                                        value={explorer_transaction}
                                        onChange={this.handleChange}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid container={true} item={true} justify="flex-end" alignItems="flex-end">
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
    private handleToggleClose = (event: any): void => {
        this.setState(prevState => ({
            ...prevState,
            isToggle: false,
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
        const { id, name, client, server, min_confirmations, height, key, explorer_address, explorer_transaction, status, mode } = this.state;
        const data = { id: 0, name, client, server, min_confirmations, height, key, explorer_address, explorer_transaction, status };
        if (mode) {
            data.id = id;
            this.props.editBlockchain(data);
        } else {
            delete data.id;
            this.props.addBlockchain(data);
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        blockchains: selectBlockchains(state),
        clients: selectClient(state),
        blockchainDetails: selectBlockchainDetails(state),
        loading: selectBlockchainDetailsLoading(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getBlockchains: params => dispatch(getBlockchains(params)),
        getClient: () => dispatch(getClient()),
        addBlockchain: params => dispatch(addBlockchain(params)),
        editBlockchain: params => dispatch(editBlockchain(params)),
        getBlockchainDetails: params => dispatch(getBlockchainDetails(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

// tslint:disable-next-line:no-any
export const AddBlockchains = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddBlockchainsScreen as any)));

