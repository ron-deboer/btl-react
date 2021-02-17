import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fakeAuth } from '../_services/Fakeauth';
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
        fakeAuth.signout(null);
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
