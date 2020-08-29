import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
export const main_solid_colors = {
    color1: "#0A0A3C",
    color2: "#C2C3D6",
    color3: "#FFB733",
    color4: "#00BFA4",
    color5: "#0fb099",
}

export const secondary_solid_colors = {
    color1: "#EEEEF6",
    color2: "#F2F2F2",
    color3: "#39B275",
    color4: "#FF4553",
    color5: '#757681'
}
export const color = {
    backgroundColor: main_solid_colors.color4,
    backgroundColorDark: secondary_solid_colors.color2,
    boxColor: "#FFFFFF",                    // for background box color on trading, buy, balance, profile sections
    chartInnerColor: "#0A0A3C",             // for chart inner lines and text color
    hover: '#01aa78',
    color1: "#FFFFFF",
    color2: '#4f4863',
    activeColor: "#bcbcbc"
}

export const buttonColors = {
    default: "#EEEEF6",
    active: "#00BFA4",
    sell: "#FF4553",                       // for all sell buttons
    sellHover: "#0A0A3C",                  // for hovering over all sell buttons
    hover: '#0A0A3C',
    border: '1px solid rgba(27,31,35,.2)'
}

export const inputColors = {
    default: "#EEEEF6",
}

export const mainMenuColors = {
    default: "#0fb099",
    active: "#01AA78"
}

export const font = {
    primaryFontFamily: "Helvetica Neue",
    secondaryFontFamily: '"Lucida Console", Monaco, monospace'
}

export const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#04479C'
        },
        secondary: {
            main: '#01aa78'
        },
        action: {
            selected: '#ffffff'
        },
        text: {
            primary: '#eaeff5',
            secondary: '#eaeff5'
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '*::-webkit-scrollbar-track': {
                    '-webkit-box-shadow': 'inset 0 0 6px #ffffff'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: "#4dbfa3",
                    outline: '1px solid slategrey'
                }
            }
        },
        MuiStepIcon: {
            root: {
                '&$completed': {
                    color: main_solid_colors.color4,    //43a047
                },
                '&$active': {
                    color: main_solid_colors.color4,
                },
            },
            active: {},
            completed: {},
        },
        MuiTypography: {
            h1: {
                fontSize: '2em'
            },
            h2: {
                fontSize: '1.5em'
            },
            h3: {
                fontSize: '1.17em'
            },
            h4: {
                fontSize: '1em'
            },
            h5: {
                fontSize: '0.83em'
            },
            h6: {
                fontSize: '0.67em'
            },
        }
    }
});

export const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: color.backgroundColorDark,
        paddingBottom: 20,
        [theme.breakpoints.down('md')]: {
            minHeight: 'auto',
        },
    },
    toolbar: theme.mixins.toolbar,
    main: {
        width: '100%',
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    warningText: {
        color: main_solid_colors.color3,
        fontWeight: 'bold',
    },
    warningIcon: {
        color: main_solid_colors.color3,
        marginTop: 20
    },
    hoverTransparent: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    langBtn: {
        width: 100,
        background: 'transparent',
        borderBottom: `2px solid ${buttonColors.active}`,
        borderRadius: 0,
        "&:hover": {
            color: buttonColors.hover,
            borderBottom: `2px solid ${buttonColors.hover}`,
        }
    },
    secondaryText: {
        color: color.color1,
        textDecoration: 'none',
        fontFamily: `${font.primaryFontFamily} !important`
    },
    secondaryTextBold: {
        color: color.color1,
        textDecoration: 'none',
        fontFamily: `${font.primaryFontFamily} !important`,
        fontWeight: 'bold'
    },
    primaryText: {
        color: `${main_solid_colors.color1} !important`, fontFamily: font.primaryFontFamily, textDecoration: 'none'
    },
    primaryTextBold: {
        color: `${main_solid_colors.color1} !important`, fontFamily: font.primaryFontFamily, fontWeight: 'bold'
    },
    basicText: {
        color: `${main_solid_colors.color4} !important`, fontFamily: font.primaryFontFamily
    },
    basicTextBold: {
        color: `${main_solid_colors.color4} !important`, fontFamily: font.primaryFontFamily, fontWeight: 'bold'
    },
    basicTextMedium: {
        color: `${main_solid_colors.color4} !important`, fontFamily: font.primaryFontFamily, fontWeight: 500
    },
    tabbarTabNumber: {
        fontFamily: `${font.secondaryFontFamily} !important`,
        color: main_solid_colors.color2
    },
    basicNumber: {
        fontFamily: `${font.secondaryFontFamily} !important`,
        color: main_solid_colors.color4
    },
    secondaryNumber: {
        fontFamily: `${font.secondaryFontFamily} !important`,
        color: color.color1
    },
    primaryNumber: {
        fontFamily: `${font.secondaryFontFamily} !important`,
        color: `${main_solid_colors.color1} !important`
    },
    antTabsRoot: {
        color: color.color1,
    },
    sectionsBackground: {
        backgroundColor: main_solid_colors.color4,
        height: '100%',
        alignItems: 'center'
    },
    errorText: {
        color: `${secondary_solid_colors.color4} !important`
    },
    successText: {
        color: `${secondary_solid_colors.color3} !important`
    },
    moreOption: {
        color: main_solid_colors.color4,
    },
    buyText: {
        color: `${secondary_solid_colors.color3} !important`,
        textDecoration: 'none',
    },
    sellText: {
        color: `${secondary_solid_colors.color4} !important`,
        textDecoration: 'none',
    },
    tradeBackground: {
        backgroundColor: color.boxColor,
    },
    docHeading: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 40,
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px'
        },
    },
    dropzone: {
        [theme.breakpoints.down('xs')]: {
            marginTop: '40px'
        },
    },
    paperInner: {
        padding: `0px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
    },
    paper: {
        margin: '0 auto',
        marginTop: theme.spacing(1) * 4,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: color.boxColor,
        width: 'auto',
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            // marginTop: 2,
            width: '90%'
        },
    },
    xsfull: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    signUpBox: {
        margin: '0 auto',
        marginTop: theme.spacing(1) * 4,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: color.boxColor,
        width: 'auto',
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            // width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        },
    },
    externalBackground: {
        backgroundColor: color.backgroundColor,
        paddingBottom: 20,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            // paddingBottom: 0,
        },
    },
    orderButton: {
        color: main_solid_colors.color1,
        cursor: 'pointer',
        background: 'none',
        border: buttonColors.border, textDecoration: 'underline'
    },
    dialogPaper: {
        backgroundColor: color.boxColor,
    },
    center: {
        alignItems: 'center',
    },
    disabledButton: {
        cursor: 'not-allowed !important',
        pointerEvents: 'auto !important',
        backgroundColor: `${buttonColors.default} !important`,
        color: `${buttonColors.hover} !important`,
        opacity: 0.7,
        border: buttonColors.border,
    },
    cancelButton: {
        backgroundColor: `${buttonColors.sell} !important`,
        height: 50,
        borderRadius: 10,
        color: `${color.color1} !important`,
        border: buttonColors.border,
    },
    disabledChangeButton: {
        cursor: 'not-allowed !important',
        pointerEvents: 'auto !important',
        height: 50,
        borderRadius: 10,
        backgroundColor: `${buttonColors.default} !important`,
        color: `${buttonColors.hover} !important`,
        opacity: 0.7,
        border: buttonColors.border,
        '&:hover': {
            backgroundColor: `${buttonColors.default} !important`,
        },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        marginTop: theme.spacing(1) * 1,
        borderRadius: 10,
        backgroundColor: buttonColors.active,
        border: buttonColors.border,
        color: color.color1,
        height: 50,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
    },
    profileDropdown: {
        borderRadius: 15,
        backgroundColor: secondary_solid_colors.color1,
        color: main_solid_colors.color1,
        height: 40,
        paddingLeft: 10,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: secondary_solid_colors.color2,
            transition: '.3s ease'
        },
        '&:focus': {
            backgroundColor: secondary_solid_colors.color1,
            transition: '.3s ease',
            borderRadius: 15,
        },
    },
    buySellDropdown: {
        borderRadius: 15,
        backgroundColor: secondary_solid_colors.color1,
        color: main_solid_colors.color1,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: secondary_solid_colors.color2,
            transition: '.3s ease'
        },
        '&:focus': {
            backgroundColor: secondary_solid_colors.color1,
            transition: '.3s ease',
            borderRadius: 15,
        },
    },
    loginFooter: {
        textDecoration: 'none',
        fontSize: 14,
        color: main_solid_colors.color1
    },
    signUpTermLabel: {
        fontSize: 14
    },
    fontItalic: {
        fontStyle: 'italic'
    },
    helpTitle: {
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            marginBottom: 20
        }
    },
    searchInput: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    displayFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    fontBold: {
        fontWeight: 'bold'
    },
    helpHeading: {
        fontSize: 28,
        marginBottom: 20
    },
    confirmMain: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px',
            marginRight: '0px',
        },
    },
    searchBox: {
        fontSize: 30,
        color: color.color1,
    },
    historyPaper: {
        marginTop: theme.spacing(1) * 8,
        backgroundColor: color.boxColor,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        }
    },
    HeadingSignUp: {
        fontWeight: 'bold',
        fontSize: 60,
        color: color.color1,
        fontFamily: font.primaryFontFamily,
        letterSpacing: 3,
        [theme.breakpoints.down('xs')]: {
            fontSize: 40,
            margin: '0px 10px 0px 10px',
            textAlign: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 40,
        }
    },
    displayNone: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    subHeadingSignUp: {
        fontFamily: font.primaryFontFamily,
        fontSize: 16,

    },
    signUpDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginTop: 50
        }
    },
    signUpLoginDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginTop: 0
        }
    },
    forgotPassHead: {
        width: '75%',
        textAlign: 'center'
    },
    verifyEmailHead: {
        width: '75%',
        textAlign: 'center'
    },
    searchPaper: {
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(2),
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        height: 200,
        backgroundColor: color.backgroundColor,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0
        }
    },
    searchPaperinner: {
        width: '60%',
        marginTop: 30,
        [theme.breakpoints.down('xs')]: {
            marginTop: 50,
            width: '90%',
        }
    },
    howCanHelp: {
        fontSize: 48,
        marginBottom: 20,
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            fontSize: 28,
        }
    },
    aboutusPaper: {
        marginTop: theme.spacing(1) * 8,
        padding: theme.spacing(2),
        backgroundColor: color.boxColor,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0
        }
    },
    tradeRoot: {
        flexGrow: 1,
        padding: '2.5em',
    },
    tradeMain: {
        marginTop: 20,
        width: '100%',
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        }
    },
    tradeBoxHeading: {
        marginLeft: 5,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
    tradingSection: {
        width: 'calc(100% - 600px)',
    },
    earnGrid: {
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
        }
    },
    imageDiv1: {
        width: '50%',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            width: '100%'
        }
    },
    earnGridInner: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
            display: 'flex'
        }
    },
    arrowDownBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        backgroundColor: color.color1,
        '&:hover': {
            opacity: 0.92,
            transition: '.3s ease',
            backgroundColor: color.color1
        },
        [theme.breakpoints.up('xl')]: {
            width: 60,
            height: 60,
            paddingTop: 10
        }
    },
    arrowDown: {
        color: color.backgroundColor, width: 35, height: 35
    },
    earnGridOuter: {
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
            display: 'flex',
            marginBottom: 30
        }
    },
    helpDivider: {
        marginTop: 50
    },
    orderBox: {
        position: 'relative'
    },
    notLoggedIn: {
        display: 'flex',
        width: '100%',
        position: 'absolute',
        backgroundColor: main_solid_colors.color1,
        top: 0,
        right: 0,
        height: '100%',
        opacity: 0,
        zIndex: 10,
        textAlign: 'center',
        '&:hover': {
            opacity: 0.92,
            transition: '.3s ease'
        },
    },
    innerWeb: {
        flexDirection: 'column',
        width: '100%',
        paddingTop: '80%',
    },
    loginBtn: {
        borderRadius: 20,
        backgroundColor: buttonColors.active,
        width: '70%',
        '&:hover': {
            background: buttonColors.hover
        }
    },
    signUpBtn: {
        borderRadius: 20,
        color: color.color1,
        width: '70%',
        background: buttonColors.active,
        border: buttonColors.border,
        zIndex: 1000,
        '&:hover': {
            background: buttonColors.hover
        }
    },
    heading1: {
        fontSize: '2em'
    },
    heading2: {
        fontSize: '1.5em'
    },
    heading3: {
        fontSize: '1.17em'
    },
    heading4: {
        fontSize: '1em'
    },
    heading5: {
        fontSize: '0.83em',
        fontWeight: 'normal'
    },
    heading6: {
        fontSize: '0.67em'
    },

    // LANDING PAGE CSS

    landingContainer: {
        justifyContent: 'space-around',
        alignItems: "center",
        display: 'flex',

        width: '100%',
        height: "100%",
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            fontSize: 36,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: "center",
        }
    },
    tagLine: {
        justifyContent: "center",
        color: color.color1,
        width: '90%',
        fontWeight: 'bold',
        fontFamily: font.primaryFontFamily,
        fontSize: '9vw',
        letterSpacing: 0.9,
        lineHeight: 0.9,
        [theme.breakpoints.down('sm')]: {
            fontSize: 48,
            letterSpacing: 0.9,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 42,
            letterSpacing: 0.9,
        }
    },
    textDiv: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '80%',
        // marginLeft: 100,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 50,
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 20,
            marginTop: 50
        }
    },
    investGrid: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            // width:'65%',
            alignItems: 'center',
            justifyContent: "center",
            flexDirection: 'column-reverse !important',
            marginTop: 20,
        }
    },
    sendGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            // width:'65%',
            alignItems: 'center',
            justifyContent: "center",
            flexDirection: 'column !important',
            // paddingTop: 20
        }
    },
    investInnerGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '65%'
    },
    investImage: {
        [theme.breakpoints.down('sm')]: {
            marginRight: 20,
        }
    },
    taglineMobile: {
        fontSize: '3.75rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: 40
        }
    },
    investText: {
        fontSize: '1.5rem',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            fontSize: 20,
            width: '80%'
        }
    },
    investOuterGrid: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            justifyContent: "center",
            flexDirection: 'column !important',
            paddingBottom: 20
        }
    },
    dividerVertical: {
        width: 1,
        height: 50,
        backgroundColor: 'grey',
    },
    cursor: {
        cursor: 'pointer'
    },
    section: {
        height: 689,
        minHeight: '110vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            minHeight: 'auto',
            maxHeight: 'none !important'
        },
        [theme.breakpoints.up('xs')]: {
            maxHeight: '110vh'
        }
    },
    exploreSection: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    leftDiv: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    rightDiv: {
        width: '50%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    leftDivMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center !important',
            alignItems: 'center'
        }
    },
    rightDivMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex'
        }
    },
    firstBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    secondBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    firstBoxRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    secondBoxMobile: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    greenBox: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    greenBoxMobile: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    lightPurpleBox: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    lightPurpleBoxMobile: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    transparentBox: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    transparentBoxMobile: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    orangeBox: {
        width: '50%',
        height: '24vw',
        zIndex: 1,
        backgroundColor: 'rgb(243, 106, 61)'
    },
    orangeBoxMobile: {
        width: '50%',
        height: '52vw',
        zIndex: 1,
        backgroundColor: 'rgb(243, 106, 61)'
    },
    whiteBox: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    whiteBoxMobile: {
        width: '25%',
        backgroundColor: '#fff'
    },
    textBox: {
        width: '80%',
        marginLeft: '8%',
        marginTop: 100,
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    textBoxMobile: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    textBoxInner: {
        marginTop: 40
    },
    navyBlueBox: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    navyBlueBoxMobile: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    blueBox: {
        width: '25%',
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    blueBoxMobile: {
        width: '25%',
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    lightBlueBox: {
        width: '25%',
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    lightBlueBoxMobile: {
        width: '25%',
        backgroundColor: 'transparent'
    },
    greyBoxMobile: {
        width: '25%',
        backgroundColor: '#212121'
    },
    greyBoxMobile3: {
        width: '25%',
        height: '26vw',
        backgroundColor: '#212121'
    },
    greyBox: {
        width: '25%',
        height: '13vw',
        marginLeft: 15,
        zIndex: 0,
        marginTop: -10,
        backgroundColor: '#212121'
    },
    greyBox2: {
        width: '25%',
        height: '13vw',
        marginRight: 15,
        zIndex: 0,
        marginTop: -10,
        backgroundColor: '#212121'
    },
    greyBoxMobile1: {
        width: '25%',
        height: '26vw',
        marginRight: 15,
        zIndex: 0,
        marginTop: -20,
        backgroundColor: '#212121'
    },
    greyBox1: {
        width: '25%',
        height: '13vw',
        backgroundColor: '#212121'
    },
    fullWidth: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            width: 'auto'
        }
    },
    imageDiv: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    mobileHCenter: {
        justifyContent: 'flex-start',
        width: '85%',
        marginTop: 50,
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    earnSection: {
        marginTop: -70,
        [theme.breakpoints.down('xs')]: {
            marginTop: 20
        }
    },
    textcenter: {
        textAlign: 'center !important'
    },
    earn: {
        width: 'inherit',
        height: '110vh',
        position: 'absolute',
        transform: 'none',
        backgroundAttachment: 'fixed',
        [theme.breakpoints.down('xs')]: {
            position: 'relative',
            marginBottom: -5
        },
    },
    expansionHead: {
        backgroundColor: main_solid_colors.color5
    },
    expansionBody: {
        backgroundColor: color.backgroundColorDark,
        flexDirection: 'column'
    },
    accordionheading: {
        color: color.color1
    },
    ExpandMoreIcon: {
        color: color.color1
    },
    earnFirst: {
        width: 'inherit',
        height: '110%',
        position: 'absolute',
        transform: 'none',
        backgroundAttachment: 'fixed',
        [theme.breakpoints.down('xs')]: {
            position: 'relative'
        },
    },

    // PROFILE FORM CSS

    profileContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    profileTitleRoot: {
        background: color.backgroundColorDark,
        alignItems: 'center',
        display: 'flex',
        height: 65,
        padding: '0px 35px',
        marginBottom: 20,
        borderBottom: '2px solid rgba(234,239,245,.1)',
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '1px !important',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        },
    },
    item: {
        flexGrow: 1,
        flexBasis: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    googlestep: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    googlestepnumber: {
        padding: '20px'
    },
    item1: {
        flexGrow: 1,
        flexBasis: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    qrcode: {
        height: 'auto',
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: color.color1
    },
    SideBarListSearch: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: color.boxColor,
            width: '100% !important',
            margin: "15px 0px -10px 0px !important",
            padding: "15px 15px"
        },
        [theme.breakpoints.down('xs')]: {
            backgroundColor: color.boxColor,
            width: '100% !important',
            margin: "0px 0px -10px 0px !important",
            padding: "15px 15px"
        },
        marginBottom: -15
    },
    margin: {
        margin: 5,
        width: '95%',
        marginLeft: 15,
        [theme.breakpoints.down('xs')]: {
            width: '93%',
        }
    },
    mt10: {
        marginTop: 10
    },
    mt20: {
        marginTop: 20
    },
    underline: {
        borderBottom: `1px solid ${color.color1}`,
    },
    textBtn: {
        width: 90,
        height: 40,
        fontSize: 11,
        borderRadius: 10,
        backgroundColor: `${buttonColors.active} !important`,
        border: `${buttonColors.border} !important`,
        color: `${color.color1} !important`,
        '&:hover': {
            backgroundColor: `${buttonColors.hover} !important`,
            transition: '.3s ease'
        },
    },
    changeButton: {
        fontSize: 11,
        width: 140,
        height: 40,
        borderRadius: 10,
        backgroundColor: buttonColors.active,
        border: buttonColors.border,
        color: color.color1,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
    },
    startButton: {
        fontSize: 14,
        width: 160,
        height: 40,
        borderRadius: 10,
        backgroundColor: buttonColors.active,
        border: buttonColors.border,
        color: color.color1,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
        [theme.breakpoints.down('xs')]: {
            width: 90
        }
    },
    paperTitleRoot: {
        background: color.backgroundColorDark,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        display: 'flex',
        height: 65,
        padding: '0px 15px',
        borderBottom: '2px solid rgba(234,239,245,.1)',
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '1px !important',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        },
    },
    signupLoginButton: {
        fontSize: 14,
        width: 160,
        height: 40,
        borderRadius: 10,
        backgroundColor: buttonColors.active,
        border: buttonColors.border,
        color: color.color1,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
        [theme.breakpoints.down('xs')]: {
            width: 150
        }
    },
    profileRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: color.color1,
    },
    profileForm: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
    },
    profilePaper: {
        marginTop: theme.spacing(1) * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: color.boxColor,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        }
    },
    gridCenter: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    link: {
        textDecoration: 'underline'
    },
    profileImage: {
        marginRight: 10,
        [theme.breakpoints.up('sm')]: {
            width: 128,
            height: 128,
        }
    },
    profileImg: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    stepnumber: {
        fontSize: 28,
        marginRight: 10,
        fontWeight: 'bold'
    },
    step3: {
        marginTop: '8%',
        fontSize: 13
    },
    stepText: {
        fontSize: 13,
        color: color.color1
    },
    profileVerifyHead: {
        marginLeft: 17
    },

    // APIKEYS CSS

    keyPaper: {
        marginTop: theme.spacing(1) * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: color.backgroundColor,
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        }
    },
    tableCell: {
        paddingRight: '24px',
        minWidth: 200,
        color: color.color1
    },
    table: {
        minWidth: 650,
        [theme.breakpoints.down('xs')]: {
            zoom: 0.8
        },
    },
    text: {
        fontSize: 12
    },
    tableRoot: {
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '1px !important',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        }
    },
    button: {
        color: `${color.color1} !important`,
        backgroundColor: `${buttonColors.active} !important`,
        border: buttonColors.border,
        borderRadius: 10,
        height: 50,
        '&:hover': {
            backgroundColor: `${buttonColors.hover} !important`,
            transition: '.3s ease'
        },
    },
    buttonLebel: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '13px'
        }
    },
    resize: {
        fontSize: 12.5
    },

    // ACCOUNT ACTIVITY CSS

    activityPaper: {
        width: '100%',
        overflowX: 'auto',
        marginTop: theme.spacing(1) * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: color.backgroundColor,
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
    },
    tablePaginationActions: {
        color: main_solid_colors.color1,
    },

    // CONFIRM CSS

    confirmPaper: {
        marginTop: theme.spacing(1) * 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.boxColor,
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
    },
    confirmRoot: {
        width: '90%',
    },
    confirmBtn: {
        backgroundColor: buttonColors.active,
        width: '95%',
        borderRadius: 10,
        height: 50,
        color: color.color1,
        marginTop: 15, marginLeft: '5%',
        border: buttonColors.border,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0
        }
    },
    confirmInnerGrid: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    confirmInputGrid: {
        width: '48%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    stepper: {
        backgroundColor: color.color1,
    },
    profileStepper: {
        paddingLeft: 0,
        paddingRight: 0
    },
    stepLabel: {
        color: `${main_solid_colors.color2}`
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selector: {
        width: '100%',
        marginTop: 25, marginBottom: 8
    },
    icon: {
        color: color.color1
    },
    comfirmationMain: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },

    // WALLET LAYOUT CSS

    currencyName: {
        paddingTop: 10,
        position: 'relative',
        color: color.hover,
        fontFamily: font.primaryFontFamily
    },
    totalBalance: {
        fontSize: '10pt',
        paddingLeft: 20
    },
    locked: {
        fontSize: '10pt',
        paddingLeft: 20,
    },
    inner: {
        padding: 20,
    },
    tabWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        alignItems: 'center'
    },
    verticalMiddle: {
        verticalAlign: 'middle',
        marginLeft: -15,
        [theme.breakpoints.down('xs')]: {
            marginLeft: -10,
        }
    },
    labelIcon: {
        paddingTop: 0,
        minHeight: 60
        // height:40
    },
    content: {
        flexGrow: 1,
        marginTop: 40,
        marginRight: 30,
        marginLeft: 10,
        background: 'white',
        overflow: 'auto',
        backgroundColor: color.boxColor,
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.52)',
        height: '109vh',
        [theme.breakpoints.down('md')]: {
            width: '340px !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '200px !important',
            marginTop: 20,
            marginLeft: 30,
            height: 'auto',
        },
        [theme.breakpoints.up('lg')]: {
            width: '540px !important',
        },
    },
    tabDetails: {
        backgroundColor: color.boxColor,
        // marginLeft: 10,
        // marginRight: 10,
        // borderRadius: 4,
        [theme.breakpoints.up('sm')]: {
            // width: '94% !important',
        },
    },
    walletTabsRoot: {
        color: main_solid_colors.color1,
        height: 50,
        backgroundColor: color.backgroundColorDark,

    },


    // KAPYTAL WALLET CSS

    homeBoard: {
        height: '100%',
        paddingTop: '3.5em',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    chartCard: {
        position: 'absolute',
        width: '250px',
        height: '250px',
        borderRadius: '100%',
    },
    ActionButton: {
        margin: 5
    },
    depositCard: {
        flexWrap: 'nowrap',
        border: '1px solid black',
        alignItems: 'center',
        borderRadius: '1em',
        margin: '1em 0',
        display: 'flex',
        height: 100,
    },
    depositIcon: {
        flex: '33.33%',
        display: 'flex',
        color: '#000'
    },
    depositText: {
        flex: '66.66%',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#000',
        margin: '1em',
        fontSize: 14,
        padding: '0 1em',
        borderLeft: '1px solid black'
    },
    fundingCard: {
        backgroundColor: '#ffffff',
        width: '18em',
        height: '40em',
        borderRadius: '2em',
        margin: '0.5em',
        padding: '2em',
        flexGrow: 0,
        flexShrink: 0,
        textAlign: 'initial'
    },
    depositFundingIcon: {
        margin: '0.5em 0'
    },
    depositSection: {
        padding: '0.5em 0',
        textAlign: 'initial'
    },
    depositTitle: {
        textAlign: 'initial',
        paddingBottom: '1em',
    },
    depositPrimaryText: {
        padding: 0, margin: 0,
        fontWeight: 'bold',
        color: '#12124f'
    },
    depositSecondaryText: {
        padding: 0, margin: 0,
        color: '#b6bad7'
    },
    complement: {
        padding: 0, margin: 0,
        fontSize: '0.75em',
        color: '#b6bad7'
    },
    cardView: {
        boxShadow: "0 3px 5px rgba(0,0,0,0.16), 0 3px 5px rgba(0,0,0,0.23)"
    },
    currencyContainer: {
        boxSizing: 'content-box',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        margin: '1em',
        "&::-webkit-scrollbar": {
            display: 'none'
        }
    },
    accountFunding: {
        height: '100%',
        display: 'flex',
        paddingTop: '3.5em',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#f1f4f9',
    },
    walletMainDiv: {
        position: 'absolute', left: 0, right: 0, margin: 'auto', width: '375px', height: '812px'
    },
    transactionList: {
        height: '100%',
        display: 'flex',
        paddingTop: '3.5em',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    containerTitle: {
        fontSize: '1.5em',
        padding: '1em 0',
        textAlign: 'center',
        color: '#000'
    },
    yourDAI: {
        fontSize: '1.5em',
        padding: '0.5em 0', margin: 0
    },
    requestDA: {
        padding: 0, margin: 0,
        fontWeight: 'bold',
        color: '#12124f'
    },
    cryptoWork: {
        padding: 0, margin: 0,
        color: '#b6bad7'
    },
    informationText: {
        color: '#12124f'
    },
    addressText: {
        backgroundColor: '#ededef',
        borderRadius: '0.5em',
        fontSize: '0.8em',
        textAlign: 'center',
        padding: '0.5em 0',
        color: '#000'
    },
    qrcodeSection: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1em 0'
    },
    qrcodeImage: {
        width: '10em',
        height: '10em'
    },
    requestButton: {
        padding: '1em 0.5em',
        borderRadius: '0.5em'
    },
    scrollList: {
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#f1f4f9',
        borderRadius: '1em 1em 0 0',
    },
    listContainer: {
        boxSizing: 'content-box',
        overflowY: 'auto',
        padding: '1em 0',
    },
    currencyCard: {
        width: '8em',
        height: '12em',
        borderRadius: '1em',
        color: 'white',
        margin: '0.5em',
        padding: '1em'
    },
    transactionCard: {
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
        padding: '0.5em',
        margin: '1em 1em 0 1em',
        display: 'flex',
        alignItems: 'center'
    },
    marginText: {
        margin: 0,
        padding: 0
    },

    // DEPOSIT CSS

    historyTableRoot: {
        background: 'transparent',
        padding: 10,
        borderBottom: '2px solid rgba(234,239,245,.1)',
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '5px !important',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        }
    },
    fieldset: {
        paddingTop: 9,
        width: '100%'
    },
    depositContainer: {
        position: 'relative',
    },
    legend: {
        fontSize: '9pt',
        color: 'gray'
    },
    dialogAction: {
        padding: '8px 24px'
    },
    description: {
        paddingTop: 10,
    },
    depositBtn: {
        width: '100%',
        fontFamily: font.primaryFontFamily,
        color: `${buttonColors.default} !important`,
        border: `${buttonColors.border} !important`,
        height: 50,
        borderRadius: 10,
        backgroundColor: `${buttonColors.active} !important`,
        '&:hover': {
            backgroundColor: `${buttonColors.hover} !important`,
            transition: '.3s ease'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        margin: '10px 0 10px 0',

    },
    disabledDepositBtn: {
        width: '100%',
        cursor: 'not-allowed !important',
        pointerEvents: 'auto !important',
        fontFamily: font.primaryFontFamily,
        border: `${buttonColors.border} !important`,
        height: 50,
        borderRadius: 10,
        color: `${buttonColors.default} !important`,
        opacity: 0.7,
        backgroundColor: `${buttonColors.active} !important`,
        '&:hover': {
            backgroundColor: `${buttonColors.active} !important`,
            transition: '.3s ease'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        margin: '10px 0 10px 0',
    },
    qrCode: {
        [theme.breakpoints.down('xs')]: {
            marginTop: '10px',
            width: '100% !important',
            height: '100% !important'
        },
        [theme.breakpoints.up('sm')]: {
            margin: '10px'
        },
    },
    balanceTotal: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 10
        }
    },
    depositCompoundModal: {
        marginTop: 5
    },
    setMaxBtn: {
        cursor: 'pointer'
    },
    depositCompound: {
        marginTop: 30
    },
    depositDialogContent: {
        [theme.breakpoints.down('xs')]: {
            width: '64vw',
            height: 'auto',
        },
        [theme.breakpoints.up('xl')]: {
            width: '30vw'
        },
        width: '50vw',
        height: 480,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    compoundCurrency: {
        height: 30,
        marginTop: 10
    },
    compoundCurrencyText: {
        marginLeft: 5
    },
    depositModalMargin: {
        marginTop: 30,
        marginBottom: 30
    },
    depositInvestment: {
        color: secondary_solid_colors.color5,
        [theme.breakpoints.down("xs")]: {
            marginTop: 15
        }
    },
    availableBalance: {
        [theme.breakpoints.down("xs")]: {
            marginTop: 0,
            marginBottom: 15
        }
    },
    investmentCurrency: {
        fontFamily: font.primaryFontFamily
    },
    compoundCurrencyIcon: {
        width: 50,
        height: 50
    },
    compoundCurrencyWithdraw: {
        width: 40,
        height: 40
    },
    compoundCurrencyDeposit: {
        width: 30,
        height: 30,
        marginTop: -4
    },
    compoundModalInput: {
        marginTop: '0px !important'
    },
    compoundInput: {
        width: '89%',
        [theme.breakpoints.down('sm')]: {
            width: '84%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '74%'
        },
    },
    compoundText: {
        width: '85%',
        [theme.breakpoints.down('md')]: {
            width: '85%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '92%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%'
        },
    },
    withdrawLoader: {
        height: '90vh',
        [theme.breakpoints.down('md')]: {
            height: '50vh'
        },
    },
    detailsWithdrawal: {
        textAlign: 'center',
        marginTop: 30,
        color: secondary_solid_colors.color5
    },
    depositMargin: {
        textAlign: 'center', marginTop: 20, marginBottom: 20
    },
    depositTopMargin: {
        marginTop: 10
    },
    // WITHDRAW CSS
    withdrawalAmount: {
        width: '100%',
        marginTop: 0
    },
    caption: {
        width: 'calc(100% - 20px)',
        fontFamily: font.primaryFontFamily,
        position: 'relative',
        color: color.color1
    },
    enableText: {
        textAlign: 'center',
        fontFamily: font.primaryFontFamily,
    },
    depositCompoundAvatar: {
        backgroundColor: '#000',
        borderRadius: 50,
        width: 70,
        height: 70,
        padding: 15
    },
    depositKapytalAvatar: {
        backgroundColor: color.backgroundColorDark,
        borderRadius: 50,
        width: 70,
        height: 70,
        padding: 15,
        marginLeft: -10
    },
    depositAvatars: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: `${buttonColors.default} !important`,
        color: `${buttonColors.hover} !important`,
        opacity: 0.7,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 20,
        marginBottom: 20
    },
    depositLearnMore: {
        fontSize: 12
    },
    depositCompoundDetail: {
        lineHeight: 1.5
    },
    mxnGrid: {
        backgroundColor: secondary_solid_colors.color2,
        borderRadius: 5,
        padding: 10
    },
    mxnText: {
        lineHeight: 1.8,
        textAlign: 'center'
    },
    mxnTextMargin: {
        marginTop: 10
    },

    // SIDEBAR CSS

    customListItem: {
        margin: '8px 14px !important',
        padding: '18px 20px !important',
        borderRadius: '4px',
        width: 'calc(100% - 28px) !important',
        background: color.backgroundColorDark,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.12)',
        opacity: 0.6,
        '&:hover': {
            backgroundColor: secondary_solid_colors.color1
        },
        [theme.breakpoints.down('xs')]: {
            padding: '5px 7px !important'
        }
    },
    textContainer: {
        paddingLeft: 10
    },
    listItemRoot: {
        float: 'right'
    },
    balanceNumber: {
        textAlign: 'right',
    },
    selectedText: {
        fontFamily: font.primaryFontFamily,
        color: color.color1
    },
    lockedIcon: {
        verticalAlign: 'middle',
        height: 14,
        paddingRight: 5,
        opacity: 0.7,
        bottom: 1,
        position: 'relative'
    },
    lockedText: {
        textAlign: 'right'
    },
    titleText: {
        fontWeight: 600,
        fontFamily: font.primaryFontFamily,
        color: main_solid_colors.color1
    },
    selectedListItem: {
        backgroundColor: `${secondary_solid_colors.color3} !important`,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        opacity: 1
    },
    avatarImg: {
        width: 'auto'
    },
    avatarRoot: {
        minWidth: 'auto'
    },
    dialogContent: {
        '&::-webkit-scrollbar': {
            height: '5px !important',
        },
    },
    drawer: {
        flexShrink: 0,
        width: 650,
        marginTop: 40,
    },
    fontNormal: {
        fontWeight: "normal !important"
    },
    SideBarList: {
        background: color.boxColor,
    },
    drawerPaper: {
        minWidth: 600,
        background: color.boxColor,
        marginLeft: 30,
        paddingBottom: 30,
        position: 'relative',
        height: '109vh',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.52)',
    },

    // SELECT ADDRESS CSS 

    dialogTitleRoot: {
        background: color.backgroundColorDark,
        alignItems: 'center',
        display: 'flex',
        height: 65,
        borderBottom: '2px solid rgba(234,239,245,.1)',
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '1px !important',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto'
        }
    },
    dialogTitleTextWidth: {
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    },
    addressTable: {
        minWidth: 650,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '5px !important',
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        [theme.breakpoints.down('xs')]: {
            top: 'auto'
        }
    },
    walletHistoryHeading: {
        padding: 10,
        color: color.hover,
        fontFamily: font.primaryFontFamily
    },

    // CONFIRMATION MODAL

    confirmBuyButton: {
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        color: color.color1,
        backgroundColor: buttonColors.active,
        borderRadius: 10,
        border: buttonColors.border,
        width: 100,
        height: 50,
        fontFamily: font.primaryFontFamily,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
    },
    confirmSellButton: {
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        color: color.color1,
        fontFamily: font.primaryFontFamily,
        border: buttonColors.border,
        borderRadius: 10,
        height: 50,
        width: 100,
        backgroundColor: buttonColors.sell,
        '&:hover': {
            backgroundColor: buttonColors.sellHover,
            transition: '.3s ease'
        },
    },

    // TRADE WALLET AND MARKET CSS

    walletRoot: {
        padding: theme.spacing(2, 2),
        margin: 5,
        backgroundColor: color.boxColor,
    },
    marketLogo: {
        height: '40px',
        width: '40px',
    },
    componentText: {
        marginLeft: '0.5em',
        marginTop: 5,
        cursor: 'pointer'
    },
    avatar: {
        backgroundColor: 'transparent',
    },
    buyAvatarImg: {
        objectFit: 'fill'
    },
    switchButton: {
        textAlign: 'center',
        marginTop: 35,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            justifyContent: 'flex-end',
            display: 'flex'
        }
    },


    // ORDER CSS

    orderformControl: {
        margin: '8px 0px 8px 0px',
        minWidth: '100%',
    },
    orderModal: {
        padding: '2em',
        backgroundColor: color.boxColor
        // width: '45em',
    },
    totalModal: {
        backgroundColor: color.boxColor,
        // boxShadow:'0 0.125rem 0.25rem rgba(0,0,0,0.075) !important',
        padding: '2em',
        width: '100%',
        height: '387px',
        [theme.breakpoints.down('sm')]: {
            // marginTop: '32%',
            height: 'auto',
        }
    },
    buyWindow: {
        fontWeight: 'bold',
        color: theme.palette.secondary.main
    },
    sellWindow: {
        fontWeight: 'bold',
        color: theme.palette.secondary.main
    },
    buyButton: {
        width: '100%',
        marginTop: theme.spacing(1) * 1,
        height: 50,
        borderRadius: 10,
        color: color.color1,
        backgroundColor: buttonColors.active,
        fontFamily: font.primaryFontFamily,
        border: buttonColors.border,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease'
        },
    },
    sellButton: {
        marginTop: theme.spacing(1) * 1,
        width: '100%',
        color: color.color1,
        fontFamily: font.primaryFontFamily,
        borderRadius: 10,
        height: 50,
        backgroundColor: buttonColors.sell,
        border: buttonColors.border,
        '&:hover': {
            backgroundColor: buttonColors.sellHover,
            transition: '.3s ease'
        },
    },
    spendInput: {
        float: 'left'
    },
    recieveInput: {
        float: 'right'
    },
    textinput: {
        backgroundColor: `${inputColors.default} !important`,
        borderRadius: 15,
        paddingLeft: 10,
        border: 'none !important',
        marginTop: 10,
        outline: 'none',
        height: '40px !important',
        color: `${main_solid_colors.color1} !important`,
        fontWeight: 'bold',
        fontSize: 16
    },
    textinputHelp: {
        backgroundColor: `${inputColors.default} !important`,
        borderRadius: 10,
        paddingLeft: 10,
        border: 'none !important',
        outline: 'none',
        width: '100%',
        boxShadow: '1px 11px 20px -8px rgba(0,0,0,0.5)',
        height: '70px !important',
        color: `${main_solid_colors.color1} !important`,
        fontWeight: 'bold',
        fontSize: 16
    },
    inputColor: {
        fontSize: 16,
        color: `${secondary_solid_colors.blue} !important`,
    },
    paragraph: {
        fontSize: 16,
        color: main_solid_colors.color2,
    },
    tradeIcon: {
        color: theme.palette.primary.main,
        fontSize: '2.5em',
        marginTop: 25
    },
    iconComponent: {
        padding: '2.5em'
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    subtotalText: {
        fontWeight: 'bold',
        color: 'grey'
    },
    baseText: {
        fontSize: '1.25rem'
    },
    tabBtn: {
        marginLeft: '13%',
        cursor: 'pointer'
    },
    detailItems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between'
    },

    buyTextField: {
        color: main_solid_colors.color1,
    },
    buyInput: {
        padding: '9px 10px 12px',
        height: '50px !important'
    },
    divider: {
        border: `0.5px solid ${main_solid_colors.color1}`
    },
    footerdivider: {
        width: '80%',
        height: 1,
        backgroundColor: "rgba(0,0,0,0.1)",
        marginBottom: 10
    },
    footerdividervertical: {
        [theme.breakpoints.down('xs')]: {
            borderRightWidth: 1,
            borderRightColor: 'rgba(0,0,0,0.1)',
            borderRightStyle: 'solid',
            marginLeft: -15
        }
    },
    footerdividerhorizotal: {
        [theme.breakpoints.down('sm')]: {
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderBottomStyle: 'solid',
            marginBottom: 30
        }
    },
    footerTextCenter: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    buttonGrid: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            marginBottom: 30
            // justifyContent: 'space-around'
        }
    },
    card: {
        // width: 245,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    balanceIcon: {
        color: color.color1
    },
    caretIcon: {
        color: main_solid_colors.color1,
    },
    disabledSell: {
        cursor: 'not-allowed !important',
        pointerEvents: 'auto !important',
        borderRadius: 10,
        height: 50,
        backgroundColor: `${secondary_solid_colors.color4} !important`,
        color: `${color.color1} !important`,
        opacity: 0.7
    },
    disabledBuy: {
        cursor: 'not-allowed !important',
        pointerEvents: 'auto !important',
        borderRadius: 10,
        height: 50,
        backgroundColor: `${secondary_solid_colors.color3} !important`,

        color: `${color.color1} !important`,
        opacity: 0.7
    },
    swapIcon: {
        [theme.breakpoints.down('sm')]: {
            transform: "rotate(90deg)",
        }
    },

    // NAVBAR CSS

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 0px 10px rgba(0, 0, 0, 0.15)',
        backgroundColor: color.backgroundColorDark
    },
    tabsFlexContainer: {
        height: 64,
    },
    grow: {
        flexGrow: 1
    },
    marketInput: {
        marginLeft: '50px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        }
    },
    navTabsIndicatorFaq: {
        backgroundColor: 'transparent !important',
    },
    tabActive: {
        opacity: 1,
    },
    tabNotActive: {
        opacity: `${0.7} !important`,
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    active: {
        backgroundColor: main_solid_colors.color4,
    },
    inActive: {
        backgroundColor: main_solid_colors.color1,
    },
    mobileMenuPaper: {
        backgroundColor: main_solid_colors.color4
    },
    navTabRoot: {
        minWidth: '100px',
        color: mainMenuColors.active,
        '&:hover': {
            color: mainMenuColors.active,
            opacity: 1,
        },
    },
    navTabsIndicator: {
        backgroundColor: mainMenuColors.active,
    },
    toolbarGutters: {
        paddingLeft: 8,
        paddingRight: 8
    },
    logoHeight: {
        height: '2.4em',
        [theme.breakpoints.down('xs')]: {
            height: '1.4em'
        }
    },

    // FOOTER CSS

    fab: {
        margin: theme.spacing(1),
    },
    footerGrid: {
        // margin: '0 auto',
        // marginLeft: '10%',
        [theme.breakpoints.up('md')]: {
            width: '80%',
            marginLeft: '8%'
        },
        // [theme.breakpoints.down('xs')]: {
        //     marginLeft: '0%'
        // }
    },
    footerDiv: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"

    },
    socialIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        marginTop: 30,
        marginBottom: 30
    },
    socialIcon: {
        width: 32,
        height: 32,
        padding: 5,
        borderRadius: '50%',
        fontSize: 14,
        color: main_solid_colors.color4,
        border: `1px solid ${main_solid_colors.color4}`,
        marginRight: 10
    },
    githubIcon: {
        width: 15,
        height: 15,
        color: main_solid_colors.color4,
        marginBottom: 3,
        marginRight: 3
    },
    alignCenterDiv: {
        paddingTop: 10,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    aligncenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: color.backgroundColorDark,
        // height: '139px',
        textAlign: 'center',
        fontSize: 12,
        // fontWeight: 'bold',
        zIndex: 1200,
        position: 'relative',
        marginTop: -14,
        padding: 30,
        [theme.breakpoints.down('sm')]: {
            // paddingLeft: '13%',
            // paddingRight: '13%',
            // height: '290px',
        },
    },
    footerSignupGrid: {
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    footerSignupButton: {
        fontSize: 14,
        width: 160,
        height: 40,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: buttonColors.active,
        color: color.color1,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease',
        },
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            fontSize: 13,
        }
    },
    footerLoginButton: {
        fontSize: 14,
        width: 160,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'transparent',
        border: `1px solid ${buttonColors.active}`,
        color: buttonColors.active,
        '&:hover': {
            backgroundColor: buttonColors.hover,
            transition: '.3s ease',
            color: color.color1,
        },
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            fontSize: 13,
        }
    },
    Language: {
        fontSize: 12,
        textAlign: 'center',
        display: 'flex',
        marginRight: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    langRoot: {
        padding: 0,
        fontSize: 12,
        color: color.backgroundColor,
        width: 100,
        // height: 40
    },
    langList: {
        paddingLeft: 10,
        paddingRight: 10
    },
    langText: {
        fontSize: 12,
        color: color.color1,
        textAlign: 'center'
    },
    ArrowDownIcon: {
        color: color.backgroundColor,
        "&:hover": {
            color: buttonColors.hover,
        }
    },
    menuLangPaper: {
        border: `1px solid ${color.backgroundColor}`,
        width: 100,
        backgroundColor: color.backgroundColor
    },
    menuList: {
        padding: 0
    },

    // HISTORY CSS

    historyRoot: {
        background: 'transparent',
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '1px !important',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        }
    },
    historyTable: {
        minWidth: 650,
    },

    // CHART ROOT

    chartRoot: {
        width: '100%',
        // padding: '15px',
        borderBottom: `1px solid ${color.backgroundColor}`,
        backgroundColor: color.backgroundColor,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
            // height: '30vh',
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%',
            // height: '60vh',
        },
    },

    // TRADE LAYOUT CSS

    tab: {
        fontSize: '12px',
        paddingTop: 20,
        fontWeight: 600,
        // color: 'rgba(234,239,245,.6)'
    },
    tabsBackground: {
        backgroundColor: color.backgroundColorDark
    },
    notLoggedInMobile: {
        display: 'flex',
        width: '100%',
        position: 'absolute',
        backgroundColor: main_solid_colors.color1,
        top: 114,
        right: 0,
        height: '575px',
        opacity: 0,
        zIndex: 10,
        textAlign: 'center',
        // alignItems: 'center',
        '&:hover': {
            opacity: 0.92,
            transition: '.3s ease'
        },
    },
    inner1: {
        flexDirection: 'column',
        width: '100%',
        paddingTop: '30%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '50%'
        },
    },

    // TRADE BAR CSS

    tradeBar: {
        backgroundColor: color.backgroundColorDark,
    },
    tradeBarRoot: {
        flexGrow: 1,
    },
    tradeToolbar: {
        minHeight: 50,
        margin: '0 auto'
    },
    statusItem: {
        marginLeft: 20
    },
    positiveChange: {
        color: 'green !important'
    },
    negativeChange: {
        color: 'red !important'
    },
    marketValue: {
        fontSize: '13px',
        fontWeight: 600,
        color: secondary_solid_colors.color1,
        margin: 0,
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            fontWeight: 200
        },
    },
    heading: {
        color: main_solid_colors.color2,
        fontFamily: font.primaryFontFamily,
        fontSize: '11px',
        margin: 0,
        padding: 0,
    },
    walletBalance: {
        display: 'flex',
        cursor: 'pointer',
        padding: '14px 0 14px 0'
    },
    showBalance: {
        marginLeft: 20,
    },
    walletCurrency: {
        color: main_solid_colors.color2,
        fontSize: '12px',
        margin: 0,
        padding: 0
    },
    balanceValue: {
        fontSize: '13px',
        fontWeight: 600,
        color: secondary_solid_colors.color1,
        margin: 0,
        padding: 0
    },
    menuPaper: {
        backgroundColor: main_solid_colors.color1,
        width: '30%',
        left: '67.9% !important',
        borderTopRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            width: '40.7%',
            left: '57.1% !important',
        },
        // top: '128.5px !important',
        // left: '901px !important'
    },
    balanceListHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12,
        color: secondary_solid_colors.color1,
        borderBottom: `1px solid ${color.color2}`,
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    balanceListItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        color: secondary_solid_colors.color1,
        fontWeight: 400,
        lineHeight: '27px',
        borderBottom: `1px solid ${color.color2}`,
        '&:hover': {
            backgroundColor: main_solid_colors.color1,
        }
    },
    balanceListFooter: {
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    arrowIcon: {
        padding: 0,
        margin: '0px 10px 0px 10px',
        color: secondary_solid_colors.color1,
        fontSize: 30
    },
    viewWalletButton: {
        color: main_solid_colors.color1,
        textTransform: 'none'
    },
    assetsTab: {
        display: 'flex'
    },
    assetIcon: {
        marginRight: 10
    },
    coinImg: {
        width: 30,
        height: 30
    },

    // SELECT CURRENCY CSS

    selectedMarket: {
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: color.backgroundColor,
        borderRadius: 10,
        padding: 7,
        width: 110,
        marginLeft: -5
    },
    marketActive: {
        backgroundColor: color.backgroundColor,
        // padding: '14px 0 14px 0'
    },
    marketActiveButton: {
        backgroundColor: color.activeColor,
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        '&:hover': {
            backgroundColor: color.activeColor,
        },
    },
    showMarket: {
        marginLeft: 5,
        height: '30px',
        lineHeight: '30px'
    },
    marketName: {
        fontSize: '16px',
        fontWeight: 600,
        color: secondary_solid_colors.color1,
        margin: 0,
        padding: 0
    },
    menuPaperSelect: {
        backgroundColor: color.boxColor,
        width: '40%',
        left: '1.75% !important',
        borderTopLeftRadius: 0,
        [theme.breakpoints.down('md')]: {
            width: '60%',
            left: '2.25% !important',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            left: '2.25% !important',
        },
    },
    marketListHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        color: color.color1, fontFamily: font.primaryFontFamily,
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    marketListItem: {
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '27px',
        '&:hover': {
            backgroundColor: color.backgroundColorDark,
        }
    },
    activeMarketList: {
        backgroundColor: color.backgroundColorDark,
    },
    marketArrowIcon: {
        padding: 0,
        margin: '0px 10px 0px 10px',
        color: secondary_solid_colors.color1,
        fontSize: 30,
        height: '30px',
        lineHeight: '30px'
    },
    marketAssetIcon: {
        marginRight: 10,
        height: '30px',
        lineHeight: '30px'
    },
    marketitemColor: {
        backgroundColor: `${main_solid_colors.white} !important`,
        '&:hover': {
            backgroundColor: `${color.backgroundColorDark} !important`,
        }
    },

    // ORDER COMPONENT CSS

    orderRoot: {
        width: '267px',
        height: '100%',
        float: 'left',
        borderWidth: '0 1px',
        // backgroundColor: main_solid_colors.color4,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    tabRoots: {
        borderBottom: '2px solid rgba(255,255,255,0.5)',
    },
    tabRootInner: {
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        // '&:hover': {
        //     color: '#ffffff',
        //     opacity: 1,
        // },
        // '&:focus': {
        //     color: '#ffffff',
        // },
    },
    tabIndicator: {

    },
    tabRoot: {
        padding: `0px 10px 0px 10px`,
    },
    buyIndicator: {
        backgroundColor: main_solid_colors.color4,
    },
    sellIndicator: {
        backgroundColor: secondary_solid_colors.color4,
    },
    selectCurrency: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    accountBalance: {
        padding: '20px 10px 14px 10px'
    },

    // ORDER BOX CSS

    orderBoxRoot: {
        width: '100%',
        // height: '50vh',
    },
    buyBackground: {
        background: color.boxColor,
    },
    orderMain: {
        padding: 10
    },
    header: {
        borderBottom: '2px solid rgba(234,239,245,.1)',
        height: 50,
        backgroundColor: color.backgroundColorDark,
        padding: `16px 26px 13px`,
        display: 'flex'
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        margin: '4px 5px 0 0'
    },
    buyCircle: {
        background: secondary_solid_colors.color3,
    },
    sellCircle: {
        background: secondary_solid_colors.color4,
    },
    orderHeading: {
        fontSize: '13px',
        padding: 0,
        margin: 0,
        textTransform: 'uppercase'
    },
    orderText: {
        float: 'right',
        cursor: 'pointer !important',
        color: color.color1,
        fontSize: 12,
        padding: '10px 0px 0px',
        '&:hover': {
            color: color.color1,
        }
    },
    inputRoot: {
        fontSize: 13,
        height: 45,
    },
    notchedOutline: {
        borderWidth: '1px !important',
        borderColor: 'rgba(234,239,245,.1) !important'
    },
    labelRoot: {
        fontSize: 13,
        fontFamily: font.primaryFontFamily,
        width: '73%',
        color: main_solid_colors.color1
    },
    orderTextField: {
        width: '100%',
    },
    orderbuyButton: {
        color: color.color1,
        fontWeight: 700,
        fontSize: 14,
        padding: 10,
        borderRadius: 10,
        height: 50,
        backgroundColor: buttonColors.active,
        border: buttonColors.border,
        '&:hover': {
            backgroundColor: buttonColors.hover,
        },
    },
    ordersellButton: {
        color: color.color1,
        fontWeight: 700,
        fontSize: 14,
        padding: 10,
        borderRadius: 10,
        height: 50,
        marginTop: 15,
        backgroundColor: buttonColors.sell,
        border: buttonColors.border,
        '&:hover': {
            backgroundColor: buttonColors.sellHover,
        },
    },

    // ORDER TRADE HISTORY CSS

    ordTradeRoot: {
        width: '400px',                         // originally it is 333px
        float: 'left',
        borderWidth: '0 1px',
        borderStyle: 'solid',
        borderColor: color.boxColor,
        borderBottom: `1px solid ${color.boxColor}`,
        backgroundColor: color.boxColor,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            height: 'auto'
        },
        [theme.breakpoints.up('lg')]: {
            height: '100%'
        },
    },

    // ORDER BOOK CSS

    orderBookRoot: {
        width: '100%'
    },
    bookHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.backgroundColorDark,
        color: main_solid_colors.color2,
        fontSize: 12,
        fontWeight: 400,
        padding: 10,
        width: '100%'
    },
    headerPrice: {
        width: '100%',
        textAlign: 'left',
    },
    headerAmount: {
        width: '100%',
        textAlign: 'right',
    },
    headerTotal: {
        width: '100%',
        textAlign: 'right',
    },
    orderParts: {
        height: '100%'
    },
    orderPart1: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
            height: 'calc(38vh + 13px)',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('lg')]: {
            height: '300px',                    //calc(38vh + 18px)
            overflowY: 'scroll',
        },
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    tabItem: {
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: main_solid_colors.color2,
        fontSize: 12,
        fontWeight: 400,
        padding: '7px 10px 4px 10px',
        marginBottom: 2,
    },
    tabPrice: {
        width: '100%',
        textAlign: 'left',
        color: color.color1,
        zIndex: 10
    },
    tabAmount: {
        width: '100%',
        textAlign: 'right',
        color: color.color1,
        zIndex: 10
    },
    tabTotal: {
        width: '100%',
        textAlign: 'right',
        color: color.color1,
        zIndex: 10
    },
    progressBar: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 30,
        opacity: 0.2,
        zIndex: 10,
        // '&:hover': {
        //     opacity: 0.3,
        // },
    },
    asks: {
        backgroundColor: secondary_solid_colors.color4
    },
    bids: {
        backgroundColor: secondary_solid_colors.color3
    },
    askPrice: {
        color: `${secondary_solid_colors.color4}!important`
    },
    bidPrice: {
        color: `${secondary_solid_colors.color3}!important`,
    },
    orderPart2: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        background: color.boxColor
    },
    lastPrice: {
        textAlign: 'center',
        color: secondary_solid_colors.color1,
        fontSize: 16,
        fontWeight: 'normal',
        margin: 0,
        padding: 0
    },
    orderPart3: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
            height: '270px',                                      //calc(38vh + 13px)
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('lg')]: {
            height: '282px',                                 //calc(38vh + 18px)
            overflowY: 'scroll',
        },
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    ask_container: {
        marginTop: 'auto'
    },
    askReverse: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
        }
    },
    mainAskList: {
        [theme.breakpoints.up('md')]: {
            height: 'auto !important',
        },
        marginTop: 'auto',
        width: '100% !important',
        '&:focus': {
            outline: 'none'
        },
        '&::-webkit-scrollbar': {
            width: '3px',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        }
    },
    mainBidList: {
        width: '100% !important',
        '&:focus': {
            outline: 'none'
        },
        '&::-webkit-scrollbar': {
            width: '3px',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        }
    },

    // TRADE HISTORY CSS

    tradeHistoryRoot: {
        width: '100%'
    },
    tradePart1: {
        display: 'flex',
        backgroundColor: color.boxColor,
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
            height: '98vh',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('lg')]: {
            height: '94vh',
            overflowY: 'scroll',
        },
        '&::-webkit-scrollbar': {
            // display: 'none',
            width: '3px',
        },
        '&::-webkit-scrollbar-track': {
            display: 'none'
        }
    },
    tradeTabPrice: {
        width: '80%',
        textAlign: 'left',
        fontWeight: 400,
        zIndex: 1,
        letterSpacing: '-0.5px'
    },
    tradeTabAmount: {
        width: '100%',
        textAlign: 'right',
        color: color.color1,
        fontWeight: 400,
        zIndex: 1,
        letterSpacing: '-0.5px'
    },
    tradeTabTime: {
        width: '100%',
        textAlign: 'right',
        color: color.color1,
        fontWeight: 400,
        zIndex: 1,
        letterSpacing: '-1px'
    },
    tradeProgressBar: {
        position: 'absolute',
        width: '100%',
        top: 0,
        right: 0,
        height: 28,
        opacity: 0.2,
        zIndex: 10,
        '&:hover': {
            opacity: 0.3,
        },
    },
    up: {
        margin: '-2.5px 3px 0 2.5px'
    },

    // OPEN ORDER CSS

    openOrderRoot: {
        width: '100%',
        // padding: '15px',
        backgroundColor: color.boxColor,
        borderBottom: `1px solid ${color.boxColor}`,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '40vh',
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
            height: '310px',
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%',
            height: '310px',
        },
    },

    // OPEN ORDERS CSS

    openOrdRoot: {
        width: '100%'
    },
    openOrdheader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: main_solid_colors.color2,
        fontSize: 12,
        fontWeight: 400,
        padding: 10,
        width: '100%'
    },
    openOrdPart1: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
            height: '14vh',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('lg')]: {
            height: 'calc(25vh + 9px)',
            overflowY: 'scroll',
        },
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    openOrdtabPrice: {
        width: '100%',
        textAlign: 'left',
        zIndex: 1,
        letterSpacing: 0,
        color: color.color1,
    },
    openOrdTabAmount: {
        width: '100%',
        textAlign: 'right',
        zIndex: 1
    },
    openOrdTabTotal: {
        width: '100%',
        textAlign: 'right',
        color: color.color1,
        zIndex: 1
    },
    emptyIcon: {
        marginTop: 25,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
    },
    cancelIcon: {
        margin: 0,
        padding: 0,
        marginRight: 25
    },

    // ORDER HISTORY CSS

    orderHisRoot: {
        width: '100%'
    },
    orderHisHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: main_solid_colors.color2,
        fontSize: 12,
        fontWeight: 400,
        padding: 10,
        width: '100%'
    },
    orderHisParts: {
        height: '100%'
    },
    orderHisPart1: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
            height: '14vh',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('lg')]: {
            height: 'calc(25vh + 9px)',
            overflowY: 'scroll',
        },
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    // Terms and Condition CSS
    tandCHeadng: {
        marginTop: 60,
        marginBottom: -30,
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center'
        }
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },

    // NOTIFICATION POPUP CSS

    success: {
        backgroundColor: main_solid_colors.color4,
    },
    error: {
        backgroundColor: secondary_solid_colors.color4,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    notifyIcon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    notifyMessageRoot: {
        [theme.breakpoints.down('xs')]: {
            width: '86%',
        }
    },
    notifyMessage: {
        display: 'flex',
        alignItems: 'center',
    },
    close: {
        paddingLeft: 0
    },

    // Terms and Condition
    termsText: {
        marginTop: 20
    },

    // Help
    helpMain: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 60,
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    // Security
    securityCheckicon: {
        width: 45,
        height: 45,
        padding: 10,
        color: main_solid_colors.color4,
        border: `1px solid ${main_solid_colors.color4}`,
        borderRadius: 50,
        marginRight: 20
    },
    features: {
        [theme.breakpoints.down('xs')]: {
            marginTop: 30,
        },
    },
    featuresGrid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 0,
        }
    },
    checkIconGrid: {
        width: 60
    },
    secureFeature: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            justifyContent: "center",
            flexDirection: 'column !important',
            paddingBottom: 20,
            paddingTop: 20
        }
    },
});