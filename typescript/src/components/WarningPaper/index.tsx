import {
    createStyles,
    Grid,
    Paper,
    Theme,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import * as React from 'react';


const styles = (theme: Theme) => createStyles({
    paper: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2
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
});

interface OwnProps {
    // tslint:disable-next-line:no-any
    ToggleClose: any;
    title: string;
}

interface StyleProps extends WithStyles<typeof styles> {
}
type Props = OwnProps & StyleProps;


class WarningPaperScreen extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { classes, ToggleClose, title } = this.props;
        return (
            <Paper color="warning.main" className={classNames(classes.paper, classes.topPaper)}>
                <Grid container={true} direction="row" alignItems="center">
                    <WarningIcon className={classes.warningIcon} />
                    <Typography>{title}</Typography>
                </Grid>
                <CloseRoundedIcon className={classes.iconClose} onClick={ToggleClose} />
            </Paper>
        );
    }
}

export const WarningPaper = withStyles(styles)(WarningPaperScreen);

