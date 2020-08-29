import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

class GoBack extends React.Component {

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <IconButton onClick={this.goBack} aria-label="delete">
                <CancelIcon fontSize="small" />
            </IconButton>
        );
    }
}

export default GoBack