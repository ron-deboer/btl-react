import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';

import Header from './Header';

import Router from './Router';
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
            <div className="app">
                <Header />
                <Router />
            </div>
        );
    }
}

export default Main;
