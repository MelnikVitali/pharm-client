import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import { history } from './helpers/history';
import STORAGE from "./helpers/storage";

import { setCurrentUser } from './store/actions/authActions';
import { setAuthBearerToken } from './helpers/authorization';

import store from './store';

import App from "./App";

const storageToken = STORAGE.getItem('accessToken');

if (localStorage.accessToken) {

    setAuthBearerToken(storageToken);

    const decoded = STORAGE.jwtDecode(storageToken);

    store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <Router history={history}>
            <App />
        </Router>
        <ToastContainer />
    </Provider>,
    document.getElementById('root')
);
