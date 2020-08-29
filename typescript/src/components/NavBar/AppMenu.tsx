import {
    List,
} from '@material-ui/core';
import * as React from 'react';
import { AppMenuItem } from './AppMenuItem';

export interface AppMenuProps {
    // tslint:disable-next-line:no-any
    classes?: any;
    // tslint:disable-next-line:no-any
    appMenuItems: any;
}

const AppMenuComponent: React.FC<AppMenuProps> = props => {
    const { classes, appMenuItems } = props;

    return (
        <List component="nav" className={classes.appMenu}>
            {appMenuItems.map((item, index) => (
                <AppMenuItem {...item} key={index} classes={classes} />
            ))}
        </List>
    );
};

export const AppMenu = AppMenuComponent;
