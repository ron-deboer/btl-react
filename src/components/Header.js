import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';
import JsxIf from '../_directives/jsxif';
import AppConstants from '../appconstants';
import MessageBus from '../_services/Messagebus';

class Header extends Component {
    state = { isLoggedIn: false, user: { name: 'Not Logged In' } };

    componentDidMount() {
        MessageBus.listenFor(AppConstants.MSG_LOGGED_IN, (data) => {
            this.setState(data);
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                <a href="#" className="navbar-brand">
                    Bug Tracker Lite
                </a>
                <div className="title">
                    <div className="title-left"></div>
                    <div className="title-center">{this.state.user.name}</div>
                    <div className="title-right"></div>
                </div>
                <JsxIf cond={this.state.isLoggedIn}>
                    <div className="collapse navbar-collapse" id="navbarCollapse8">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink exact to="/kanban" className="nav-link">
                                    Kanban
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="adminDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Admin
                                </a>
                                <div className="dropdown-menu" aria-labelledby="adminDropdown">
                                    <NavLink exact to="/users" className="dropdown-item">
                                        Users
                                    </NavLink>
                                    <NavLink exact to="/codes" className="dropdown-item">
                                        Codes
                                    </NavLink>
                                    <NavLink exact to="/items" className="dropdown-item">
                                        Items
                                    </NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/reports" className="nav-link">
                                    Reports
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/logout" className="nav-link">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </JsxIf>
            </nav>
        );
    }
}

export default Header;
