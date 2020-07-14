import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { resetTokenAndReattemptRequest } from '../helpers/authorization';

import { history } from '../helpers/history';

import reducers from './reducers';

import { APIUrls } from '../configs/APIUrls';

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { status } = error.response;
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === APIUrls.refreshTokens) {
        history.push(APIUrls.logout);
    }

    if (error.response && status === 401) {
        originalRequest._retry = true;

        return resetTokenAndReattemptRequest(error);
    }

    if (status === 500) {
        toast.error('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
    }

    if (status === 429) {
        toast.error('Слишком много аккаунтов создано с этого IP, повторите попытку через 15 минут');
    }

    return Promise.reject(error);
});

// Create store
export default createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
    ),
);
