import {
    createStyles,
    Theme,
    withStyles
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({});

// tslint:disable:no-any
interface Props {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: Props) => {
    const { children, value, index } = props;

    return (
        <div>
            {value === index && children}
        </div>
    );
};

class TabPanelComponent extends React.Component<Props> {
    public render() {
        const { value, index, children } = this.props;
        return (
            <TabPanel value={value} index={index}>
                {children}
            </TabPanel>
        );
    }
}

export const TabContent = withStyles(styles, { withTheme: true })(TabPanelComponent);
