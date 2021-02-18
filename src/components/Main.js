import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Kanban from './Kanban';
import Reports from './Reports';
import Users from './Users';
import Codes from './Codes';
import Items from './Items';

import { fakeAuth } from '../_services/Fakeauth';
import { FakeDataLoader } from '../_helpers/fake-data';
import { InitFakeBackend } from '../_helpers/fake-backend';

class Main extends Component {
    constructor(props) {
        super(props);
        FakeDataLoader();
        InitFakeBackend();
    }
    render() {
        return (
            <HashRouter>
                <div className="app">
                    <Header />
                    <div className="content">
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/kanban" component={Kanban} />
                        <PrivateRoute exact path="/reports" component={Reports} />
                        <PrivateRoute exact path="/users" component={Users} />
                        <PrivateRoute exact path="/codes" component={Codes} />
                        <PrivateRoute exact path="/items" component={Items} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log('1111', fakeAuth.isAuthenticated);
                if (fakeAuth.isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
}

export default Main;
