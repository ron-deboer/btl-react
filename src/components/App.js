import React, { useState } from 'react';

import Header from './Header/Header';
import Router from './Router/Router';
import { FakeDataLoader } from '../_helpers/fake-data';
import { InitFakeBackend } from '../_helpers/fake-backend';
import ItemEditor from './Items/Itemeditor';
import CodeEditor from './Codes/Codeeditor';
import UserEditor from './Users/Usereditor';

const App = (props) => {
    useState(() => {
        FakeDataLoader();
        InitFakeBackend();
    });
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
            <ItemEditor />
            <CodeEditor />
            <UserEditor />
        </div>
    );
};

export default App;
