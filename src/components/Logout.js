import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../_services/Authservice';
import AppConstants from '../appconstants';
import MessageBus from '../_services/Messagebus';

class Logout extends Component {
    authService = AuthService.instance;
    handleLoginClick() {
        <Redirect
            to={{
                pathname: '/login',
                state: { from: 'logout' },
            }}
        />;
    }

    render() {
        this.authService.Logout();
        setTimeout(() => {
            MessageBus.emit(AppConstants.MSG_LOGGED_IN, { payload: false });
        }, 100);
        return (
            <div>
                <p>You are logged out</p>
                <p>
                    Click <a href="#">here</a> to login.
                </p>
            </div>
        );
    }
}

export default Logout;
