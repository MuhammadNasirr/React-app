import React from 'react';


class Loader extends React.Component {

    render() {
        return (
            <div className={this.props.classes.loader}>
                <img src={require('../../assets/logo.png')} alt="loader" className="rotate" width="40" height="40" />
            </div>
        );
    }
}

export default Loader