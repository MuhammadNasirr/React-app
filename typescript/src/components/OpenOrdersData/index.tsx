import { createStyles, Grid, Paper, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { InfoTable } from '../InfoTable/InfoTable';
import { TableHeaderItemInterface } from '../UserData/UserData';
import { UserDataHeader } from '../UserData/UserDataHeader';

export interface OpenOrdersDataProps {
    // tslint:disable:no-any
    openOrders: any;
    // tslint:enable:no-any
    rows: TableHeaderItemInterface[];
    page: number;
    rowsPerPage: number;
    total: number;
    handleChangePage: (page: number) => void;
    handleChangeRowsPerPage: (rows: number) => void;
    handleCancelOpenOrders: (id: number) => void;
    // tslint:disable:no-any
    goBack: (event: any) => void;
    pathname: string;
    // tslint:disable-next-line:no-any
    user: any;
}

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '75%',
    },
    menu: {
        width: 200,
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#3598D5',
        letterSpacing: '0.44px',
    },
    arrow: {
        color: '#979797',
        paddingTop: '3px',
        margin: '0 10px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 24px 24px 0',
        fontWeight: 600,
    },
    label: {
        height: 32,
        paddingLeft: 16,
        borderRadius: 24,
        width: 'auto',
        cursor: 'pointer',
        letterSpacing: '0.15px',
        fontWeight: 600,
    },
    icon: {
        width: 20,
        height: 20,
        margin: '7px 4px',
        cursor: 'pointer',
        opacity: 0.6,
    },
    labelName: {
        paddingTop: 5,
        color: '#ffffff',
        fontSize: 14,
        marginRight: 7,
        letterSpacing: '0.25px',
    },
    paper: {
        padding: '20px 24px 24px 24px',
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        letterSpacing: '0.15px',
        fontWeight: 600,
        paddingLeft: 26,
        paddingTop: 26,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

type Props = StyleProps & OpenOrdersDataProps;

export class OpenOrdersComponent extends React.Component<Props> {
    public render() {
        const {
            openOrders,
            rowsPerPage,
            page,
            rows,
            handleChangePage,
            handleChangeRowsPerPage,
            handleCancelOpenOrders,
            total,
            pathname,
            goBack,
            user,
            classes
        } = this.props;
        const content = openOrders && openOrders.length ? (
            <div>
                <UserDataHeader classes={classes} user={user.email} goBack={goBack} pathname={pathname} />
                <Grid container={true} spacing={24} direction={'row'}>
                    <Grid item={true} xs={12} lg={12}>
                        <Paper style={{ marginBottom: 15 }}>
                            <InfoTable
                                dataLength={total}
                                rows={rows}
                                data={openOrders}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                handleCancel={handleCancelOpenOrders}
                                hidePagination={false}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        ) : (
                <Typography variant="h6" gutterBottom={true} style={{ color: '#757575', paddingLeft: 26, paddingBottom: 26 }}>
                    No user activities
                </Typography>
            );

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}

export const OpenOrdersData = withStyles(styles)(OpenOrdersComponent);

