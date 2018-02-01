import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

//destructuring props and we get isAuthenticated from mapStateToProps and the componennt passed from AppRouter
export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest //passing a variable called rest which contains everything that is not destructured
}) => (
    <Route {...rest} component={(props) => ( //we will decide if we'll pass the component (if authenticated)
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
            
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);