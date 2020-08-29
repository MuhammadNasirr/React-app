import {
    Button,
    createStyles,
    Grid,
    Input,
    Select,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import Countries = require('country-data');
import * as React from 'react';
import { countries, findPhone, localeDate } from '../../../helpers';
import { Country } from '../../../helpers/countries';

const styles = (theme: Theme) => createStyles({
    gridRow: {
        justifyContent: 'space-between',
        marginTop: 20,
    },
    title: {
        color: '#757575',
    },
    paper: {
        padding: '8px',
    },
    label: {
        letterSpacing: '0.15px',
        paddingBottom: '0px',
        fontWeight: 600,
    },
    input: {
        fontSize: '0.875rem'
    },
    textField: {
        width: '75%'
    },
    select: {
        width: '75%'
    }
});

interface UserSummaryState {
    nationality: string;
    country: string;
    first_name: string;
    last_name: string;
    dob: string;
    city: string;
    address: string;
    postcode: string;
}

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

// tslint:disable:no-any
export interface UserSummaryProps {
    user: any;
    editMode: boolean;
    handleChangeProfile: (e: any) => void;
    handleChangeEditMode: (e: boolean) => void;
}
// tslint:enable:no-any

type Props = StyleProps & UserSummaryProps;

class UserSummaryComponent extends React.Component<Props, UserSummaryState> {
    constructor(props) {
        super(props);
        this.state = {
            nationality: '',
            country: '',
            first_name: '',
            last_name: '',
            dob: '',
            city: '',
            address: '',
            postcode: ''
        };
    }

    public render() {
        const { classes, user, editMode } = this.props;
        const { nationality, country, first_name, last_name, city, address, postcode, dob } = this.state;

        return (
            <div className={classes.paper}>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography gutterBottom={true} variant="h6" className={classes.label}>
                            {user.email}
                        </Typography>
                    </Grid>
                    {user.profiles && user.profiles.length > 0 &&
                        <Grid item={true}>
                            {!editMode ?
                                <Button variant="contained" size="small" color="primary" onClick={() => { this.handleEdit(user.profiles[0]); }}> Edit </Button> :
                                <Button variant="contained" size="small" color="primary" onClick={() => { this.handleSave(); }}> Save </Button>
                            }
                        </Grid>
                    }
                </Grid>
                <Grid item={true}>
                    <Typography style={{ color: '#757575', fontSize: '12px' }}>
                        Last activity: {localeDate(user.updated_at, 'fullDate')}
                    </Typography>
                </Grid>
                <br />
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>UID</Typography>
                        <Typography gutterBottom={true}>{user.uid}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Created at</Typography>
                        <Typography gutterBottom={true}>{localeDate(user.created_at, 'shortDate') || '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>First name</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true}>{user.profiles !== null && user.profiles.length ? user.profiles[0].first_name : '-'}</Typography> :
                            <Input onChange={this.handleChange} name="first_name" value={first_name} defaultValue={user.profiles[0].first_name} inputProps={{ 'aria-label': 'first_name' }} classes={{ root: classes.input }} />
                        }
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Last name</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true}>{user.profiles !== null && user.profiles.length ? user.profiles[0].last_name : '-'}</Typography> :
                            <Input onChange={this.handleChange} name="last_name" value={last_name} defaultValue={user.profiles[0].last_name} inputProps={{ 'aria-label': 'last_name' }} classes={{ root: classes.input }} />
                        }
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Phone number</Typography>
                        <Typography gutterBottom={true}>{user.phones.length > 0 ? findPhone(user.phones).number : '-'}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Date of Birth</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true}>{user.profiles !== null && user.profiles.length ? localeDate(user.profiles[0].dob, 'midDate') : '-'}</Typography> :
                            <TextField onChange={this.handleChange} name="dob" value={dob} id="date" type="date" defaultValue={localeDate(user.profiles[0].dob, 'default')} inputProps={{ className: classes.input }} classes={{ root: classes.textField }} />
                        }
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Citizenship</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true} >{user.profiles !== null && user.profiles.length && user.profiles[0].metadata ? this.displayCitizenship(user.profiles[0].metadata) : '-'}</Typography> :
                            <Select
                                native={true}
                                id="citizenship"
                                name="nationality"
                                className={classes.select}
                                value={nationality}
                                inputProps={{ className: classes.input }}
                                onChange={this.handleChange}
                            >
                                { // tslint:disable:no-any
                                    countries.map((value: Country, key: any) => {
                                        return (
                                            <option key={key} value={value.nationality}>{value.nationality}</option>
                                        );
                                    })
                                }
                            </Select>
                        }
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Country</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true} >{user.profiles !== null && user.profiles.length ? this.displayCountry(user.profiles[0].country) : '-'}</Typography> :
                            <Select
                                native={true}
                                id="country"
                                name="country"
                                value={country}
                                className={classes.select}
                                inputProps={{ className: classes.input }}
                                onChange={this.handleChange}
                            >
                                { // tslint:disable:no-any
                                    Countries.countries.all.map((value: any, key: any) => {
                                        return (
                                            <option key={key} value={value.alpha2}>{value.name}</option>
                                        );
                                    })
                                }
                            </Select>
                        }
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>City</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true}>{user.profiles !== null && user.profiles.length ? user.profiles[0].city : '-'}</Typography> :
                            <Input onChange={this.handleChange} name="city" value={city} defaultValue={user.profiles[0].city} inputProps={{ 'aria-label': 'city' }} classes={{ root: classes.input }} />
                        }
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Address</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true} >{user.profiles !== null && user.profiles.length ? user.profiles[0].address : '-'}</Typography> :
                            <Input onChange={this.handleChange} name="address" value={address} defaultValue={user.profiles[0].address} inputProps={{ 'aria-label': 'address' }} classes={{ root: classes.input }} />
                        }
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Postcode</Typography>
                        {!editMode ?
                            <Typography gutterBottom={true}>{user.profiles !== null && user.profiles.length ? user.profiles[0].postcode : '-'}</Typography> :
                            <Input onChange={this.handleChange} name="postcode" value={postcode} defaultValue={user.profiles[0].postcode} inputProps={{ 'aria-label': 'postcode' }} classes={{ root: classes.input }} />
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }

    private displayCountry = (code: string) => {
        if (code === 'null') {
            return '-';
        } else if (Countries.countries[code.toUpperCase()] !== undefined) {
            return Countries.countries[code.toUpperCase()].name;
        }
        return code;
    }
    private displayCitizenship = (name: string) => {
        if (!name) {
            return '-';
        } else {
            const metadata = JSON.parse(name);
            const citizenship = metadata.nationality;
            return citizenship;
        }
    }
    private handleChange = (event: any): void => {
        const { name, value } = event.currentTarget;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    private handleEdit = (user: any) => {
        this.setState({
            first_name: user.first_name ? user.first_name : '',
            last_name: user.last_name ? user.last_name : '',
            dob: user.dob ? localeDate(user.dob, 'default') : '',
            country: user.country ? user.country : '',
            nationality: user.metadata !== null ? this.displayCitizenship(user.metadata) : '',
            city: user.city ? user.city : '',
            address: user.address ? user.address : '',
            postcode: user.postcode ? user.postcode : ''
        });
        this.props.handleChangeEditMode(true);
    }
    private handleSave = () => {
        const { first_name, last_name, dob, country, nationality, city, address, postcode } = this.state;
        const data = {
            uid: this.props.user.uid,
            first_name,
            last_name,
            dob,
            country,
            city,
            address,
            postcode,
            metadata: JSON.stringify({ nationality })
        };
        this.props.handleChangeProfile(data);
    }
}

export const UserSummary = withStyles(styles)(UserSummaryComponent);
