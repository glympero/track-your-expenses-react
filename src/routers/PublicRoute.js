import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest //passing a variable called rest which contains everything that is not destructured
}) => (
    <Route {...rest} component={(props) => ( //we will decide if we'll pass the component (if authenticated)
        isAuthenticated ? (
            <Redirect to="/dashboard" /> 
        ) : (
            <Component {...props} />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);