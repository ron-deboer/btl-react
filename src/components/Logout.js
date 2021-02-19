import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';
import AuthService from '../_services/Authservice';
import AppConstants from '../appconstants';
import MessageBus from '../_services/Messagebus';

class Logout extends Component {
    handleLoginClick() {
        <Redirect
            to={{
                pathname: '/login',
                state: { from: 'logout' },
            }}
        />;
    }

    render() {
        AuthService.instance.logout();
        setTimeout(() => {
            MessageBus.emit(AppConstants.MSG_LOGGED_IN, {
                isLoggedIn: false,
                user: { name: 'Not Logged In' },
            });
        }, 100);
        return (
            <div>
                <p>You are logged out</p>
                <p>
                    Click{' '}
                    <NavLink exact to="/home">
                        HERE
                    </NavLink>{' '}
                    to login.
                </p>
            </div>
        );
    }
}

export default Logout;
