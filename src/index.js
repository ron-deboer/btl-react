import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { FakeDataLoader } from './_helpers/fake-data';
import { InitFakeBackend } from './_helpers/fake-backend';

import App from './components/App';
import './index.scss';

FakeDataLoader();
InitFakeBackend();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
