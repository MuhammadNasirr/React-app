import {
    Fab,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as React from 'react';

interface OwnProps {
    history: History;
}


class GoBackScreen extends React.Component<OwnProps> {

    public goBack = () => {
        history.back();
    }

    public render() {
        return (
            <Fab size="small" color="primary" style={{ marginBottom: 20 }} aria-label="add" onClick={this.goBack}>
                <ArrowBackIcon />
            </Fab>
        );
    }
}

export const GoBack = (GoBackScreen);
