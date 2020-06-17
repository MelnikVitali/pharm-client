import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import store from './store';
import { history } from './helpers/history';
import STORAGE from "./helpers/storage";
import { setCurrentUser } from './store/actions/authActions';
import { setAuthBearerToken } from './helpers/authorization';


if (localStorage.accessToken) {
    const storageToken = STORAGE.getItem('accessToken');
    setAuthBearerToken(storageToken);

    const decoded = STORAGE.jwtDecode(storageToken);
    store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
        <ToastContainer   />
    </Provider>,
    document.getElementById('root')
);
