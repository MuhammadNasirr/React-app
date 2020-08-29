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

interface ModalProps {
    open: boolean;
    mode: number;
    label: string;
    // tslint:disable-next-line no-any
    children?: any;
    handleClose: () => void;
    handleCreate?: () => void;
    handleEdit?: () => void;
}

type Props = StyleProps & ModalProps;

class ModalForm extends React.Component<Props> {
    public render() {
        const {
            classes,
            open,
            mode,
            label,
            children
        } = this.props;

        return (
            <Modal
                open={open}
                onClose={this.handleCloseModal}
            >
                <Grid container={true} direction={'column'} className={classes.paper}>
                    <Grid item={true}>
                        <Typography variant="h5" component="h5" className={classes.textField}>
                            {label}
                        </Typography>
                    </Grid>
                    {children}
                    <Grid item={true}>
                        <Grid container={true} justify={'flex-end'} spacing={8} style={{ marginTop: 20 }}>
                            <Grid item={true}>
                                {
                                    mode ?
                                        <Button variant="contained" size="small" color="primary" onClick={this.handleEditRow}>
                                            EDIT
                                        </Button>
                                        :
                                        <Button variant="contained" size="small" color="primary" onClick={this.handleCreateRow}>
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

    private handleCloseModal = () => {
        this.props.handleClose();
    };

    private handleEditRow = () => {
        this.props.handleEdit && this.props.handleEdit();
        this.handleCloseModal();
    };

    private handleCreateRow = () => {
        this.props.handleCreate && this.props.handleCreate();
        this.handleCloseModal();
    };
}

export const ModalBox = withStyles(styles)(ModalForm);
