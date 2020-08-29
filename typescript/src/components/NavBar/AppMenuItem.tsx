import {
    Collapse,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import * as React from 'react';
import { AppMenuItemComponent } from './AppMenuItemComponent';
import { icons } from './icons';

export interface AppMenuItemProps {
    // tslint:disable-next-line:no-any
    classes?: any;
    // tslint:disable-next-line:no-any
    link?: any;
    // tslint:disable-next-line:no-any
    Icon: any;
    // tslint:disable-next-line:no-any
    items?: any;
    name: string;
}

interface State {
    open: boolean;
}

class AppMenuItemWrapper extends React.Component<AppMenuItemProps, State> {

    constructor(props: AppMenuItemProps) {
        super(props);
        this.state = {
            open: false
        };
    }

    public render() {
        return (
            <React.Fragment>
                {this.MenuItemRoot()}
                {this.MenuItemChildren()}
            </React.Fragment>
        );
    }

    public MenuItemChildren = () => {
        const { items, classes } = this.props;
        const { open } = this.state;
        const isExpandable = items && items.length > 0;

        return isExpandable ? (
            <Collapse in={open} timeout="auto" unmountOnExit={true}>
                <Divider />
                <List component="div" disablePadding={true}>
                    {items.map((item, index) => (
                        <AppMenuItemWrapper {...item} key={index} classes={classes} />
                    ))}
                </List>
            </Collapse>
        ) : null;
    };

    public MenuItemRoot = () => {
        const { items, classes, Icon, link, name } = this.props;
        const { open } = this.state;
        const isExpandable = items && items.length > 0;

        return (
            <AppMenuItemComponent className={classes.menuItem} link={link} onClick={this.handleClick}>
                {/* Display an icon if any */}
                {!!Icon && (
                    <ListItemIcon className={classes.menuItemIcon}>
                        {icons(Icon)}
                    </ListItemIcon>
                )}
                <ListItemText
                    disableTypography={true}
                    primary={<Typography variant="body2">{name}</Typography>}
                    inset={!Icon}
                />
                {/* Display the expand menu if the item has children */}
                {isExpandable && !open && <ExpandMore />}
                {isExpandable && open && <ExpandLess />}
            </AppMenuItemComponent>
        );
    }

    private handleClick = () => {
        this.setState({ open: !this.state.open });
    }
}

export const AppMenuItem = AppMenuItemWrapper;
