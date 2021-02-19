import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Kanban from './Kanban';
import Reports from './Reports';
import Users from './Users';
import Codes from './Codes';
import Items from './Items';
import AuthService from '../_services/Authservice';

const Router = (props) => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />

        <PrivateRoute path="/kanban" component={Home} />
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
