import {
    Button,
    createStyles,
    Grid,
    Modal,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    paper: {
        display: 'block',
        margin: '100px auto',
        width: '360px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 312,
    },
    menu: {
        width: 400,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface PermissionModalProps {
    modalClose: () => void;
    open: boolean;
    editPermission: (id: number, role: string, verb: string, path: string, topic: string, action: string) => void;
    createPermission: (role: string, verb: string, path: string, topic: string, action: string) => void;
    mode: number;
    id: number;
    role: string;
    path: string;
    topic: string;
    verb: string;
    action: string;
    handleChange: (name: string, value: string) => void;
}

type Props = StyleProps & PermissionModalProps;

const verbs = [
    {
        value: 'ALL',
        key: 'ALL',
    },
    {
        value: 'GET',
        key: 'GET',
    },
    {
        value: 'POST',
        key: 'POST',
    },
    {
        value: 'PUT',
        key: 'PUT',
    },
    {
        value: 'DELETE',
        key: 'DELETE',
    },
];

const actions = [
    {
        value: 'ACCEPT',
        key: 'ACCEPT',
    },
    {
        value: 'AUDIT',
        key: 'AUDIT',
    },
    {
        value: 'DROP',
        key: 'DROP',
    }
];

class PermissionModalForm extends React.Component<Props> {
    public render() {
        const {
            classes,
            mode,
            id,
            role,
            verb,
            path,
            topic,
            action
        } = this.props;

        return (
            <Modal
                open={this.props.open}
                onClose={this.handleClose}
                onKeyPress={this.handleEnterPress(id, role, verb, path, topic, action)}
            >
                <Grid container={true} direction={'column'} className={classes.paper}>
                    <Grid item={true}>
                        <Typography variant="h5" component="h5" className={classes.textField}>
                            {mode ? 'Edit Permission' : 'Create Permission'}
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Role"
                            name="role"
                            value={role}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Path"
                            name="path"
                            value={path}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Topic"
                            name="topic"
                            value={topic}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            select={true}
                            value={verb}
                            label="Verb"
                            name="verb"
                            className={classes.textField}
                            onChange={this.handleChange}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {verbs.map(option => (<option key={option.key} value={option.key}>{option.value}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            select={true}
                            value={action}
                            label="Action"
                            name="action"
                            className={classes.textField}
                            onChange={this.handleChange}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {actions.map(option => (<option key={option.key} value={option.key}>{option.value}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <Grid container={true} justify={'flex-end'} spacing={8} style={{ marginTop: 20 }}>

                            <Grid item={true}>
                                <Button variant="contained" size="small" color="primary" onClick={e => this.cancelEditingLabel()}>
                                    CANCEL
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                {
                                    mode ?
                                        <Button variant="contained" size="small" color="primary" onClick={e => this.editPermission(id, role, verb, path, topic, action)}>
                                            EDIT
                                        </Button>
                                        :
                                        <Button variant="contained" size="small" color="primary" onClick={e => this.createPermission(role, verb, path, topic, action)}>
                                            CREATE
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChange = (e: any) => {
        this.props.handleChange(e.target.name, e.target.value);
    };

    private handleClose = () => {
        this.props.modalClose();
    };

    private handleEnterPress = (id: number, role: string, verb: string, path: string, topic: string, action: string) => (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && role.length && verb.length && path.length && action.length) {
            event.preventDefault();
            this.editPermission(id, role, verb, path, topic, action);
        }
    };

    private editPermission = (id: number, role: string, verb: string, path: string, topic: string, action: string) => {
        this.props.editPermission(id, role, verb, path, topic, action);
        this.handleClose();
    };

    private createPermission = (role: string, verb: string, path: string, topic: string, action: string) => {
        this.props.createPermission(role, verb, path, topic, action);
        this.handleClose();
    };

    private cancelEditingLabel = () => {
        this.handleClose();
    };
}

export const PermissionModal = withStyles(styles)(PermissionModalForm);
