import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Home/Home';
import Reports from '../Reports/Reports';
import Users from '../Users/Users';
import Codes from '../Codes/Codes';
import Items from '../Items/Items';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import AuthService from '../../_services/Authservice';

const Router = (props) => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/reports" component={Reports} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/codes" component={Codes} />
        <PrivateRoute path="/items" component={Items} />
        <PrivateRoute path="/" component={Home} />
    </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            AuthService.instance.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            )
        }
    />
);

export default Router;
