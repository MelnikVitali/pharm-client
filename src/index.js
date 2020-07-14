import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {  Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import js_cookie from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import { history } from './helpers/history';
import STORAGE from "./helpers/storage";

import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { setAuthBearerToken } from './helpers/authorization';

import store from './store';

import App from "./App";

const storageToken = STORAGE.getItem('accessToken');
const cookieToken = js_cookie.get('refreshToken');

if (localStorage.accessToken) {
    setAuthBearerToken(storageToken);

    const decoded = STORAGE.jwtDecode(storageToken);
    store.dispatch(setCurrentUser(decoded));
}

if (cookieToken) {
    const cookieDecoded = STORAGE.jwtDecode(cookieToken);
    const currentTime = Date.now() / 1000;

    if (cookieDecoded.exp < currentTime) {
        store.dispatch(logoutUser());

        window.location.href = '/login';
    }
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
