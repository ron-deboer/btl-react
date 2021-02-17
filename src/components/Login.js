import React, { Component } from 'react';
import { fakeAuth } from '../_services/Fakeauth';
import { Redirect } from 'react-router-dom';
import AppConstants from '../appconstants';
import MessageBus from '../_services/Messagebus';

class Login extends Component {
    state = { redirectToReferrer: false, error: '' };

    handleLogin = () => {
        fakeAuth.authenticate(() => {
            MessageBus.emit(AppConstants.MSG_LOGGED_IN, { payload: true });
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div className="page-container">
                <div className="left-panel">
                    <div className="login-main-text">
                        <h2>
                            Bug Tracker Lite
                            <br />
                            Login Page
                        </h2>
                        <p>Login from here to access.</p>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="User Name"
                                    required
                                    minLength="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder=""
                                    required
                                    minLength="2"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="button"
                                    className="btnSubmit btn btn-primary"
                                    value="Login"
                                    onClick={this.handleLogin}
                                />
                            </div>
                            <div className="form-group">
                                <a href="#" className="btnForgetPwd">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="error">{this.state.error}</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
