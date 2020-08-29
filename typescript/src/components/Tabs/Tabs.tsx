import {
    createStyles,
    Tab,
    Tabs,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    snackbar: {
        position: 'relative',
        zIndex: 10000,
        display: 'flex',
        margin: 10,
        backgroundColor: 'transparent',
    },
    error: {
        background: '#d32f2f !important',
    },
    success: {
        backgroundColor: '#43a047',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

// tslint:disable:no-any
interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    value: any;
    tabRows: any;
    pathname: string;
    search: string;
}

// tslint:disable:no-any
interface StyledTabProps {
    label: string;
    component: any;
    to: any;
}

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
        marginBottom: 15
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing.unit * 4,
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
            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$selected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#40a9ff',
            },
        },
        selected: {},
    }),
)((props: StyledTabProps) => <Tab disableRipple={true} {...props} />);

class TabsComponent extends React.Component<Props> {
    public render() {
        const { value, tabRows, children, pathname, search } = this.props;
        return (
            <React.Fragment>
                <AntTabs
                    value={Math.max(value.indexOf(pathname), 0)}
                    aria-label="ant example"
                >
                    {
                        tabRows.map(tab => (
                            <AntTab
                                key={tab.key}
                                label={tab.label}
                                component={Link}
                                to={{ pathname: tab.pathname, search: search }}
                            />
                        ))
                    }
                </AntTabs>

                <div>
                    {children}
                </div>

            </React.Fragment>
        );
    }
}

export const TabBar = withStyles(styles, { withTheme: true })(TabsComponent);
