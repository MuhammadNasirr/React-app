import MomentUtils from '@date-io/moment';
import {
    Button,
    createMuiTheme,
    createStyles,
    Divider,
    Drawer,
    FormControl,
    Input,
    MuiThemeProvider,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';

const drawerWidth = 400;

const datePickerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#309CEA',
        },
    },
    typography: {
        useNextVariants: true,
    },
},
);

const styles = (theme: Theme) => createStyles({
    list: {
        width: 250,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '15px 20px',
        [theme.breakpoints.down('sm')]: {
            width: 330,
        },
    },
    datePickerStart: {
        marginTop: '0px',
        width: '49%',
        [theme.breakpoints.down('sm')]: {
            marginRight: '0px',
            marginTop: '10px',
            width: '100%',
        },
    },
    divider: {
        marginTop: 20,
        width: '110%',
        marginLeft: -20,
        marginBottom: 20
    },
    buttonDiv: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around'
    },
    filter: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#0030AE',
        color: '#ffffff',
        width: 165,
        '&:hover': {
            backgroundColor: '#0030AE'
        }
    },
    reset: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#f50057',
        color: '#ffffff',
        width: 165,
        marginRight: 10,
        '&:hover': {
            backgroundColor: '#f50057'
        }
    },
    formControl: {
        marginTop: 0,
        marginBottom: 0
    },
    dateDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface FilterDrawerProps {
    open: boolean;
    noDateShow?: boolean;
    startDate?: string | null;
    endDate?: string | null;
    // tslint:disable:no-any
    closeFilterDrawer: (open: boolean) => any;
    // handleEnterPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleStartDateChange?: (date: Moment) => void;
    handleEndDateChange?: (date: Moment) => void;
    // tslint:disable:no-any
    handleChange?: (key: number, name: string, e: any) => void;
    handleFilter?: () => void;
    handleReset?: () => void;
    handleClose?: () => void;
    // tslint:disable:no-any
    list?: any;
}

type Props = StyleProps & FilterDrawerProps;

class Filter extends React.Component<Props> {
    public render() {
        const {
            open,
            classes,
            closeFilterDrawer,
            startDate,
            endDate,
            list,
            handleReset,
            noDateShow
        } = this.props;

        return (
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClose={closeFilterDrawer(false)}
                anchor={'right'}
                open={open}
            >
                {
                    noDateShow ?
                        null
                        :
                        <React.Fragment>
                            <Typography variant="h6">
                                Date Range
                            </Typography>
                            <MuiThemeProvider theme={datePickerTheme}>
                                <div className={classes.dateDiv}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DatePicker
                                            value={startDate}
                                            onChange={this.handleStartDateChange}
                                            placeholder="Start date"
                                            className={classes.datePickerStart}
                                            format="DD-MM-YYYY"
                                        // onKeyPress={this.handleStartDateChange}
                                        />
                                    </MuiPickersUtilsProvider>

                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DatePicker
                                            value={endDate}
                                            onChange={this.handleEndDateChange}
                                            className={classes.datePickerStart}
                                            placeholder="End date"
                                            minDate={startDate || undefined}
                                            format="DD-MM-YYYY"
                                        // onKeyPress={this.handleStartDateChange}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </MuiThemeProvider>
                            <Divider className={classes.divider} />
                        </React.Fragment>
                }
                {
                    list && list.map((item, key) => {
                        return (
                            <FormControl className={classes.formControl} key={key} margin="normal" required={true} fullWidth={true} >
                                <Typography variant="h6">{item.key}</Typography>
                                <Input
                                    id={item.key}
                                    placeholder={item.key}
                                    name={item.key}
                                    value={item.value}
                                    onChange={e => this.handleChangeText(key, e)}
                                />
                                <Divider className={classes.divider} />
                            </FormControl>
                        );
                    })
                }
                <div className={classes.buttonDiv}>
                    <Button
                        type="submit"
                        onClick={handleReset}
                        fullWidth={true}
                        variant="contained"
                        className={classes.reset}
                    >
                        Reset All
                    </Button>
                    <Button
                        type="submit"
                        onClick={this.applyFilter}
                        fullWidth={true}
                        variant="contained"
                        className={classes.filter}
                    >
                        Apply Filters
                    </Button>
                </div>
            </Drawer>
        );
    }

    // tslint:disable:no-any
    private handleChangeText = (key: number, e: any) => {
        this.props.handleChange && this.props.handleChange(key, e.target.name, e.target.value);
    };

    private applyFilter = () => {
        this.props.handleClose && this.props.handleClose();
        this.props.handleFilter && this.props.handleFilter();
    };

    private handleStartDateChange = (date: Moment) => {
        this.props.handleStartDateChange && this.props.handleStartDateChange(date);
    };

    private handleEndDateChange = (date: Moment) => {
        this.props.handleEndDateChange && this.props.handleEndDateChange(date);
    };
}

export const FilterDrawer = withStyles(styles)(Filter);
