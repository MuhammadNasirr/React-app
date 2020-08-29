/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { countries } from '../../constants/countries'
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { styles, color } from '../../styles/main'
import clsx from 'clsx'


class Confirm extends React.Component {
    state = {
        activeStep: 0,
        open: false,
        docType: '',
        doc_type: 'default',
        files: []
    };

    componentDidMount() {
        const { history } = this.props;
        const { location } = history;
        const { state } = location;
        this.setState({ activeStep: state ? state : 0 })
    }

    getSteps() {
        return [
            this.props.intl.formatMessage({ id: 'page.body.kyc.head.phone' }),
            this.props.intl.formatMessage({ id: 'page.body.kyc.head.identity' }),
            this.props.intl.formatMessage({ id: 'page.body.kyc.head.document' })
        ];
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return this.step0();
            case 1:
                return this.step1();
            case 2:
                return this.step2();
            default:
                return 'Unknown stepIndex';
        }
    }

    step0() {
        const { phoneNumber, smsCode } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h2" style={{ marginBottom: 15 }} className={classes.primaryTextBold}>
                    {this.props.intl.formatMessage({ id: 'page.body.kyc.phone.head' })}
                </Typography>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 5, marginBottom: 12 }}>
                        <h4 className={classes.primaryText}>1.</h4>
                        <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.kyc.phone.enterPhone' })}</span>
                    </div>
                    <TextField
                        type="number"
                        placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.phone.phoneNumber' })}
                        margin="normal"
                        variant="standard"
                        className={clsx(classes.buyInput, classes.textinput)}
                        fullWidth
                        onChange={this.handleChange('phoneNumber')}
                        InputProps={{
                            disableUnderline: true, classes: { input: classes.primaryTextBold },
                            startAdornment: <InputAdornment position="start">
                                <span style={{ fontSize: 20 }}>+</span>
                            </InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        disabled={phoneNumber && !this.props.blocked ? false : true}
                                        variant="contained"
                                        style={{ height: 40, width: 170 }}
                                        className={this.props.classes.button}
                                        onClick={this.props.resend ? this.handleResendCode : this.handleSendCode}
                                        classes={{
                                            disabled: this.props.classes.disabledButton
                                        }}
                                    >
                                        {
                                            this.props.resend ?
                                                this.props.intl.formatMessage({ id: 'page.body.kyc.phone.resend' })
                                                :
                                                this.props.intl.formatMessage({ id: 'page.body.kyc.phone.send' })
                                        }
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className={classes.primaryText} style={{ float: 'right' }}>
                        {
                            this.props.time.s !== 0 && this.props.blocked &&
                            `${(this.props.intl.formatMessage({ id: 'page.body.kyc.phone.resend' })).toLowerCase()} ${this.props.time.m} : ${this.props.time.s}`
                        }
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                        <h4 className={classes.primaryText}>2.</h4>
                        <span className={classes.primaryText}>{this.props.intl.formatMessage({ id: 'page.body.kyc.phone.enterCode' })}</span>
                    </div>
                    <TextField
                        placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.phone.code' })}
                        type="number"
                        margin="normal"
                        variant="standard"
                        fullWidth
                        onChange={this.handleChange('smsCode')}
                        InputProps={{
                            disableUnderline: true, classes: { input: classes.textinput },
                        }}
                        onKeyPress={this.onKeyPress}
                    />
                </div>
                <Grid container direction="row" justify="center" layout="fluid">
                    <Grid sm={6} xs={12} item>
                        <div>
                            <Button
                                fullWidth
                                variant="contained"
                                className={this.props.classes.ordersellButton}
                                onClick={() => this.props.history.push('/profile')}
                            >
                                {this.props.intl.formatMessage({ id: 'page.body.confirm.btn' })}
                            </Button>
                        </div>
                    </Grid>
                    <Grid sm={6} xs={12} item>
                        <div>
                            <Button
                                disabled={!smsCode || !phoneNumber ? true : false}
                                fullWidth
                                variant="contained"
                                className={this.props.classes.confirmBtn}
                                onClick={() => this.handleNext(this.props.activeStep)}
                                classes={{
                                    disabled: this.props.classes.disabledChangeButton
                                }}
                            >
                                {this.props.intl.formatMessage({ id: 'page.body.kyc.next' })}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    step1() {
        const { first_name, last_name, dob, address, citizenship, country, city, postcode, classes } = this.props;
        const disabled = (!first_name || !last_name || !address || !citizenship || !country || !city || !postcode) ? true : false
        return (
            <div className={this.props.classes.container}>

                <Grid container direction="row" justify="center" layout="fluid">
                    <Grid className={classes.confirmInnerGrid} item>
                        <Grid className={classes.confirmInputGrid} item>
                            <TextField
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.firstName' })}
                                margin="normal"
                                variant="standard"
                                fullWidth
                                value={first_name}
                                onChange={this.handleChange('first_name')}
                                InputProps={{
                                    disableUnderline: true, classes: { input: classes.textinput },
                                }}
                            />
                        </Grid>

                        <Grid className={classes.confirmInputGrid} item>
                            <TextField
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.lastName' })}
                                margin="normal"
                                variant="standard"
                                fullWidth
                                value={last_name}
                                onChange={this.handleChange('last_name')}
                                InputProps={{
                                    disableUnderline: true, classes: { input: classes.textinput },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid className={classes.confirmInnerGrid} item>
                        <Grid className={classes.confirmInputGrid} item>
                            <TextField
                                type="date"
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.dateOfBirth' })}
                                margin="normal"
                                variant="standard"
                                value={dob}
                                onChange={this.handleChange('dob')}
                                InputProps={{
                                    disableUnderline: true, classes: { input: classes.textinput },
                                }}
                            />
                        </Grid>

                        <Grid className={classes.confirmInputGrid} item>
                            <TextField
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.residentialAddress' })}
                                margin="normal"
                                variant="standard"
                                value={address}
                                onChange={this.handleChange('address')}
                                InputProps={{
                                    disableUnderline: true, classes: { input: classes.textinput },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid className={classes.confirmInnerGrid} item>
                        <Grid className={classes.confirmInputGrid} item>
                            <Select
                                native
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.nationality' })}
                                disableUnderline
                                className={this.props.classes.selector}
                                value={citizenship}
                                onChange={this.handleChange('citizenship')}
                                inputProps={{
                                    classes: {
                                        icon: this.props.classes.icon,
                                    },
                                }}
                                classes={{
                                    icon: classes.caretIcon,
                                    root: classes.profileDropdown,
                                }}
                            >
                                <option value="" style={{ backgroundColor: color.backgroundColor }} >{this.props.intl.formatMessage({ id: 'page.body.kyc.identity.nationality' })}</option>
                                {
                                    countries.map((country, key) => {
                                        return (
                                            <option style={{ backgroundColor: color.backgroundColor }} key={key} value={country.nationality}>{country.nationality}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Grid>

                        <Grid className={classes.confirmInputGrid} item>
                            <Select
                                native

                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.CoR' })}
                                className={this.props.classes.selector}
                                classes={{
                                    icon: classes.caretIcon,
                                    root: classes.profileDropdown,
                                }}
                                value={country}
                                onChange={this.handleChange('country')}
                                inputProps={{
                                    classes: {
                                        icon: this.props.classes.icon,
                                    },
                                }}
                                disableUnderline
                            >
                                <option value="" style={{ backgroundColor: color.backgroundColor }}>{this.props.intl.formatMessage({ id: 'page.body.kyc.identity.CoR' })}</option>
                                {
                                    countries.map((country, key) => {
                                        return (
                                            <option style={{ backgroundColor: color.backgroundColor }} key={key} value={country.alpha_2_code}>{country.en_short_name}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid className={classes.confirmInnerGrid} item>
                        <Grid className={classes.confirmInputGrid} item>
                            <TextField
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.city' })}
                                margin="normal"
                                variant="standard"
                                value={city}
                                onChange={this.handleChange('city')}
                                InputProps={{
                                    disableUnderline: true, classes: { input: classes.textinput },
                                }}
                            />
                        </Grid>

                        <Grid className={classes.confirmInputGrid} item>
                            <TextField
                                style={{ width: '100%' }}
                                placeholder={this.props.intl.formatMessage({ id: 'page.body.kyc.identity.postcode' })}
                                margin="normal"
                                variant="standard"
                                value={postcode}
                                onChange={this.handleChange('postcode')}
                                InputProps={{
                                    disableUnderline: true, classes: { input: classes.textinput },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid className={classes.confirmInnerGrid} item>
                        <Grid className={classes.confirmInputGrid} item>
                            <Button
                                fullWidth
                                variant="contained"
                                className={this.props.classes.ordersellButton}
                                onClick={() => this.props.history.push('/profile')}
                            >
                                {this.props.intl.formatMessage({ id: 'page.body.confirm.btn' })}
                            </Button>
                        </Grid>

                        <Grid className={classes.confirmInputGrid} item>
                            <Button
                                disabled={disabled}
                                fullWidth
                                variant="contained"
                                style={{ width: '100%', marginLeft: 0 }}
                                className={this.props.classes.confirmBtn}
                                classes={{
                                    disabled: this.props.classes.disabledChangeButton
                                }}
                                onClick={() => this.handleNext(this.props.activeStep)}
                            >
                                {this.props.intl.formatMessage({ id: 'page.body.kyc.next' })}
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }

    step2() {
        const { classes, intl } = this.props;
        let fileLength = this.state.doc_type === 'Identity Card' ? this.state.files.length >= 2 ? true : false : this.state.files.length >= 1 ? true : false
        return (
            <React.Fragment>
                <Typography variant="h3" className={clsx(classes.docHeading, classes.primaryText)}>{intl.formatMessage({ id: 'page.body.kyc.head.document' })}</Typography>
                <Grid container item spacing={1} sm={12} >
                    <Grid item container xs={12} sm={6} md={6} spacing={3} style={{ display: 'flex', flexDirection: 'column', }}>
                        <FormControl className={classes.formControl}>
                            {/* <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-simple"
                            >
                                {this.props.intl.formatMessage({ id: 'page.body.kyc.documentsType' })}
                            </InputLabel> */}
                            <Select
                                disableUnderline
                                value={this.state.doc_type}
                                // defaultValue={this.state.doc_type}
                                label={intl.formatMessage({ id: 'page.body.kyc.documentsType' })}
                                onChange={this.handleChange('doc_type')}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                                classes={{
                                    icon: classes.caretIcon,
                                    root: classes.buySellDropdown,
                                }}
                            // input={
                            //     <OutlinedInput
                            //         name="country"
                            //         labelWidth={115}
                            //         id="outlined-age-simple"
                            //     />
                            // }
                            >

                                <MenuItem disabled className={classes.primaryText} value={'default'}>{intl.formatMessage({ id: 'page.body.kyc.documentsType' })}</MenuItem>
                                <MenuItem className={classes.primaryText} value={'Passport'}>{intl.formatMessage({ id: 'page.body.kyc.documents.select.passport' })}</MenuItem>
                                <MenuItem className={classes.primaryText} value={'Identity Card'}>{intl.formatMessage({ id: 'page.body.kyc.documents.select.identityCard' })}</MenuItem>
                                <MenuItem className={classes.primaryText} value={'Driver license'}>{intl.formatMessage({ id: 'page.body.kyc.documents.select.driverLicense' })}</MenuItem>
                                <MenuItem className={classes.primaryText} value={'Utility Bill'}>{intl.formatMessage({ id: 'page.body.kyc.documents.select.utilityBill' })}</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder={intl.formatMessage({ id: 'page.body.kyc.documents.number' })}
                            style={{ margin: 8 }}
                            placeholder={intl.formatMessage({ id: 'page.body.kyc.documents.number' })}
                            margin="normal"
                            variant="standard"
                            onChange={this.handleChange('doc_number')}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            InputProps={{
                                disableUnderline: true, classes: { input: classes.textinput },
                            }}
                        />

                        <TextField
                            id="date"
                            placeholder={intl.formatMessage({ id: 'page.body.kyc.documents.expiryDate' })}
                            style={{ margin: 8 }}
                            type="date"
                            margin="normal"
                            variant="standard"
                            value={this.props.doc_expire}
                            onChange={this.handleChange('doc_expire')}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            InputProps={{
                                disableUnderline: true, classes: { input: classes.textinput },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.dropzone} sm={6} md={6}>
                        <Dropzone
                            inputContent={intl.formatMessage({ id: 'page.body.kyc.documents.drag' })}
                            maxFiles={5}
                            maxSizeBytes={20971520}
                            submitButtonDisabled={true}
                            submitButtonContent={''}
                            SubmitButtonComponent={null}
                            onChangeStatus={this.handleChangeStatus}
                            onSubmit={this.handleSubmit}
                            accept="image/*,.pdf"
                            styles={{ dropzone: { minHeight: 200, maxHeight: 200, borderStyle: 'dashed' } }}
                        />
                        <p className={classes.warningText} style={{ fontSize: 12 }}> * {this.state.doc_type === 'Identity Card' ? intl.formatMessage({ id: 'page.body.kyc.minDocuments' }) : intl.formatMessage({ id: 'page.body.kyc.minDocuments1' })}</p>
                        <p className={classes.warningText} style={{ fontSize: 12 }}> * {intl.formatMessage({ id: 'page.body.kyc.allowedFormat' })} .jpg, .png, .pdf</p>
                        <p className={classes.warningText} style={{ fontSize: 12 }}> * {intl.formatMessage({ id: 'page.body.kyc.maxSize' })} 20 mb</p>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" layout="fluid" spacing={3}>
                    <Grid sm={6} xs={12} item>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ marginTop: 15 }}
                            className={classes.ordersellButton}
                            onClick={() => this.props.history.push('/profile')}
                        >
                            {intl.formatMessage({ id: 'page.body.confirm.btn' })}
                        </Button>
                    </Grid>
                    <Grid sm={6} xs={12} item>
                        <Button
                            disabled={
                                this.state.doc_type &&
                                    this.props.doc_expire &&
                                    this.state.doc_number &&
                                    fileLength ? false : true}
                            fullWidth
                            variant="contained"
                            className={classes.confirmBtn}
                            classes={{
                                disabled: classes.disabledChangeButton
                            }}
                            onClick={() => this.handleNext(this.props.activeStep)}
                        >
                            {intl.formatMessage({ id: 'page.body.kyc.submit' })}
                        </Button>
                    </Grid>
                </Grid>

            </React.Fragment>
        )
    }

    // specify upload params and url for your files
    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file }, status) => {
        const { files } = this.state
        if (status === 'done') {
            files.push(file)
            this.setState({ files })
        }
        if (status === "removed") {
            const filtered = files.filter(obj => {
                return obj !== file
            });
            this.setState({ files: filtered })
        }
    }

    // receives array of files that are done uploading when submit button is clicked
    handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter' && this.state.smsCode && this.state.phoneNumber) {
            this.handleNext(this.props.activeStep)
        }
    }

    handleNext = (activeStep) => {
        if (activeStep === 0) {
            this.props.onVerifyPhoneNumber()
        }

        else if (activeStep === 1) {
            this.props.onUpdateProfile()
        }

        else if (activeStep === 2) {
            this.props.onUploadDocs(this.state.files);
            return false
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        this.props.onChange(name, event.target.value)
    };

    handleSendCode = () => {
        this.setState({ open: true });
        this.props.onSendPhoneNumber()
    };

    handleResendCode = () => {
        this.props.onResendPhoneNumber()
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    handleFileChange(event) {
        this.setState({ loading: true });
        const { target } = event;
        const { files } = target;

        if (files && files[0]) {
            this.setState({ image: URL.createObjectURL(files[0]) })
        }
    }

    render() {
        const { classes, activeStep } = this.props;
        const steps = this.getSteps();
        if (activeStep === 3) {
            this.props.history.push('/profile')
        }

        return (
            <Paper className={classes.confirmPaper}>
                <div className={classes.confirmRoot}>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                        classes={{
                            root: classes.profileStepper
                        }}
                        alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel classes={{ completed: classes.basicText, active: classes.basicText, label: classes.stepLabel }}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {this.getStepContent(activeStep)}
                    </div>
                </div>
            </Paper>
        );
    }
}

Confirm.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Confirm);