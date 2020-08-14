import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    resetTokenAndReattemptRequest,
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
    let tokenData = null;
    let getTokenStorage = null;

    console.log('test 1');

    if ((error.response && status === 401 && originalRequest.url === APIUrls.refreshTokens) ||
        (error.response && status === 401 && originalRequest.url === APIUrls.logout)) {
        console.log('test 2');
        return deleteTokensAndAuthBearerTokenAndPushLogIn();
    }

    if (error.response && status === 401) {
        getTokenStorage = STORAGE.getItem('accessToken');

        console.log('getTokenStorage', getTokenStorage);

        console.log('test 3');
        if (getTokenStorage) {
            tokenData = STORAGE.jwtDecode(getTokenStorage);

            console.log('test 4');

            console.log('accessTokenExpires.exp', tokenData.exp);
            console.log('currentTime',Date.now()/1000);


            if (tokenData.exp * 1000 <= Date.now()) {
                console.log('isAccessTokenExpiredError');

                return resetTokenAndReattemptRequest(error);
            }
            console.log('test 5');
        } else {
            console.log('test 6');
            return deleteTokensAndAuthBearerTokenAndPushLogIn();
        }
    }

    switch (status) {
        case 500:
            toast.error('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
            break;
        case 504:
            toast.error('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
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
    console.log('test 7');

    history.push(RoutesUrls.login);

    return Promise.reject(error);
});

// Create store
export default createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
    ),
);
