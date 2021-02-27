import React from 'react';
import { NavLink } from 'react-router-dom';
import WithAppStore from '../../_store/withappstore';

import './header.scss';

const Header = (props) => {
    if (!props.appStore.user.isLoggedIn) {
        return null;
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
            <a href="#" className="navbar-brand appname">
                Bug Tracker Lite
            </a>
            <div className="title">
                <div className="title-left"></div>
                <div className="title-center">{props.appStore.user.userName}</div>
                <div className="title-right"></div>
            </div>

            <div className="collapse navbar-collapse" id="navbarCollapse8">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link">
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
        </nav>
    );
};
export default WithAppStore(Header);
