import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../_services/Authservice';
import { appstore } from '../../_store/appstore';

import './login.scss';

const Login = (props) => {
    const [formData, setFormData] = useState({ username: 'admin', password: 'admin' });
    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const authService = AuthService.instance;

    const handleChange = (name, e) => {
        let dat = formData;
        dat[name] = e.target.value;
        setFormData(dat);
    };

    const handleLogin = () => {
        authService.login(formData.username, formData.password).then((resp) => {
            if (resp.isLoggedIn) {
                appstore.updateUser({
                    userName: formData.username,
                    isLoggedIn: true,
                });
                setRedirectToReferrer(true);
            }
        });
    };

    const { from } = props.location.state || { from: { pathname: '/' } };
    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }

    return (
        <div className="login-container">
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
                                value={formData.username}
                                onChange={(e) => handleChange('username', e)}
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
                                value={formData.password}
                                onChange={(e) => handleChange('password', e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="button"
                                className="btnSubmit btn btn-primary"
                                value="Login"
                                onClick={handleLogin}
                            />
                        </div>
                        <div className="form-group">
                            <a href="#" className="btnForgetPwd">
                                Forgot Password?
                            </a>
                        </div>
                        <div className="error">{error}</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
