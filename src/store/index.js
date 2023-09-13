import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteTokensAndAuthBearerTokenAndPushLogIn, resetTokenAndReattemptRequest } from '../helpers/authorization';
import { history } from '../helpers/history';

import { APIUrls } from '../configs/APIUrls';
import { RoutesUrls } from '../configs/RoutesUrls';

import reducers from './reducers';

axios.interceptors.response.use((response) => {

    return response;
}, (error) => {
    const { status } = error.response;
    const originalRequest = error.config;

    if ((error.response && status === 401 && originalRequest.url === APIUrls.refreshTokens)) {

        return history.push(RoutesUrls.logout);
    }

    if ((error.response && status === 401 && originalRequest.url === APIUrls.logout)) {

        return deleteTokensAndAuthBearerTokenAndPushLogIn();
    }

    if (error.response && status === 401) {

        return resetTokenAndReattemptRequest(error);
    }

    switch (status) {
        case 500:
            toast.error('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
            break;
        case 504: toast.error
           ('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
            break;

        case 429:
            toast.error('Слишком много аккаунтов создано с этого IP, повторите попытку через 15 минут');
            break;

        case 413:
            toast.error('413. Cлишком большой запрос на сервер');
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
