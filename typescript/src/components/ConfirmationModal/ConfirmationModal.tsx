import {
    Button,
    createStyles,
    Grid,
    Modal,
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
    title: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: 20
    },
    body: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    menu: {
        width: 400,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface ConfirmationModalProps {
    modalClose: () => void;
    open: boolean;
    id: number;
    handleDone: (id: number) => void;
    title: string;
    description: string;
}

type Props = StyleProps & ConfirmationModalProps;

class Confirmation extends React.Component<Props> {
    public render() {
        const {
            classes,
            id,
            title,
            description
        } = this.props;

        return (
            <Modal
                open={this.props.open}
                onClose={this.handleClose}
                onKeyPress={this.handleEnterPress(id)}
            >
                <Grid container={true} direction={'column'} className={classes.paper}>
                    <Grid item={true}>
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>

                    <Grid item={true}>
                        <Typography variant="body2" className={classes.body}>
                            {description}
                        </Typography>
                    </Grid>

                    <Grid item={true}>
                        <Grid container={true} justify={'flex-end'} spacing={8} style={{ marginTop: 20 }}>

                            <Grid item={true}>
                                <Button variant="contained" size="small" color="primary" onClick={e => this.cancelEditingLabel()}>
                                    NO
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <Button variant="contained" size="small" color="primary" onClick={e => this.handleDone(id)}>
                                    YES
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        );
    }

    private handleClose = () => {
        this.props.modalClose();
    };

    private handleEnterPress = (id: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && id) {
            event.preventDefault();
            this.handleDone(id);
        }
    };

    private handleDone = (id: number) => {
        this.props.handleDone(id);
        this.handleClose();
    };

    private cancelEditingLabel = () => {
        this.handleClose();
    };
}

export const ConfirmationModal = withStyles(styles)(Confirmation);
