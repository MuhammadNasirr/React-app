import React from 'react';
import { Route } from 'react-router-dom';


const TradeRoute = ({ isAuthenticated, isLoading, ...props }) => {
    if (isLoading) {
        return null
    }
    return <Route {...props} />;
};

export default TradeRoute;
