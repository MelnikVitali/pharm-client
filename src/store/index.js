import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    resetTokenAndReattemptRequest,
    isTokenExpiredError,
    deleteTokensAndAuthBearerTokenAndPushLogIn
} from '../helpers/authorization';
import { history } from '../helpers/history';
import STORAGE from '../helpers/storage';

import { APIUrls } from '../configs/APIUrls';
import { RoutesUrls } from '../configs/RoutesUrls';

import reducers from './reducers';

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { status } = error.response;
    const originalRequest = error.config;

    if (error.response && status === 401 && originalRequest.url === APIUrls.refreshTokens) {
        deleteTokensAndAuthBearerTokenAndPushLogIn();
    }

    if (error.response && status === 401) {
        const getTokenStorage = STORAGE.getItem('accessToken');

        if (getTokenStorage) {
            if (isTokenExpiredError) {
                return resetTokenAndReattemptRequest(error);
            }

        } else {
            deleteTokensAndAuthBearerTokenAndPushLogIn();
        }
    }

    switch (status) {
        case 500:
            toast.error('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
            break;

        case 429:
            toast.error('Слишком много аккаунтов создано с этого IP, повторите попытку через 15 минут');
            break;

        case 404:
            history.push(RoutesUrls.notfound);
            break;

        default:
            break;
    }

    return Promise.reject(error);
});

// Create store
export default createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
    ),
);
