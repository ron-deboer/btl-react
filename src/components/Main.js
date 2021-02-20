import React, { Component } from 'react';

import Header from './Header/Header';
import Router from './Router/Router';
import { FakeDataLoader } from '../_helpers/fake-data';
import { InitFakeBackend } from '../_helpers/fake-backend';

class Main extends Component {
    constructor(props) {
        super(props);
        FakeDataLoader();
        InitFakeBackend();
    }

    render() {
        let appStyle = {
            width: '80%',
            margin: 'auto',
            maxHeight: '100vh',
            minHeight: '100vh',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
        };
        return (
            <div style={appStyle}>
                <Header />
                <Router />
            </div>
        );
    }
}

export default Main;
