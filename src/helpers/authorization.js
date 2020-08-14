import axios from 'axios';
import js_cookie from 'js-cookie';

import STORAGE from './storage';
import { history } from './history';

import { APIUrls } from '../configs/APIUrls';
import { RoutesUrls } from '../configs/RoutesUrls';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

export const setAuthBearerToken = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export const deleteTokensAndAuthBearerTokenAndPushLogIn = () => {
    STORAGE.removeItem('accessToken');

    js_cookie.remove('refreshToken');

    setAuthBearerToken(null);

    return history.push(RoutesUrls.login);
};

const onAccessTokenFetched = (accessToken) => {
    subscribers.forEach(callback => callback(accessToken));
    subscribers = [];
};

const addSubscriber = (callback) => {
    subscribers.push(callback);
};

export const resetTokenAndReattemptRequest = async (error) => {
    try {
        const { response: errorResponse } = error;

        const getRefreshTokenCookie = js_cookie.get('refreshToken');

        if (!getRefreshTokenCookie) {
            deleteTokensAndAuthBearerTokenAndPushLogIn();

            return Promise.reject(error);
        }

        const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber((accessToken) => {
                errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;

                resolve(axios(errorResponse.config));
            });
        });

        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;

            const response = await axios({
                method: 'post',
                url: APIUrls.refreshTokens
            })

            if (!response.data) {
                return Promise.reject(error);
            }

            const newToken = response.data.accessToken;
            setAuthBearerToken(newToken);
            onAccessTokenFetched(newToken);
            STORAGE.setItem('accessToken', newToken);

            isAlreadyFetchingAccessToken = false;
        }

        return retryOriginalRequest;
    } catch (err) {
        history.push(RoutesUrls.login);

        return Promise.reject(err);
    }
}
