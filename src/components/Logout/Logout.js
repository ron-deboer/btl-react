import React from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';
import AuthService from '../../_services/Authservice';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

const Logout = (props) => {
    const handleLoginClick = () => {
        <Redirect
            to={{
                pathname: '/login',
                state: { from: 'logout' },
            }}
        />;
    };

    AuthService.instance.logout();
    setTimeout(() => {
        MessageBus.emit(AppConstants.MSG_LOGGED_IN, {
            isLoggedIn: false,
            user: { name: '' },
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
};

export default Logout;
