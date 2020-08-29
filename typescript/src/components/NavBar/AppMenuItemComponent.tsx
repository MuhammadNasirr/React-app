import ListItem from '@material-ui/core/ListItem';
import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface AppMenuItemComponentProps {
    className?: string;
    link?: string | null; // because the InferProps props allows alows null value
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const AppMenuItemComponentWrapper: React.FC<AppMenuItemComponentProps> = customProps => {
    const { className, onClick, link, children } = customProps;

    // if link is not set return the orinary ListItem
    if (!link) {
        return (
            <ListItem
                button={true}
                className={className}
                children={children}
                onClick={onClick}
            />
        );
    }

    // return a LitItem with a link component
    return (
        <ListItem
            button={true}
            className={className}
            children={children}
            // tslint:disable-next-line:no-any
            component={React.forwardRef((props: NavLinkProps, ref: any) => <NavLink exact={true} {...props} innerRef={ref} />)}
            {...{ to: link }}
        />
    );
};

export const AppMenuItemComponent = AppMenuItemComponentWrapper;
