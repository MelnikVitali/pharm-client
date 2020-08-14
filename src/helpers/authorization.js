import axios from 'axios';
import js_cookie from 'js-cookie';

import STORAGE from './storage';
import { history } from './history';

import { APIUrls } from '../configs/APIUrls';
import { RoutesUrls } from '../configs/RoutesUrls';

// const getTokenStorage = STORAGE.getItem('accessToken');
// const getRefreshTokenCookie = js_cookie.get('refreshToken');

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

    setAuthBearerToken(null);

    return history.push(RoutesUrls.login);
};

// export const isAccessTokenExpiredError = () => {
//     const accessTokenExpires = getTokenStorage && STORAGE.jwtDecode(getTokenStorage);
//     const currentTime = Date.now() / 1000;
//
//     return accessTokenExpires.exp <= currentTime;
// };

// export const isCookieTokenExpiredError = () => {
//     const cookieDecoded = getRefreshTokenCookie && STORAGE.jwtDecode(getRefreshTokenCookie);
//     const currentTime = Date.now() / 1000;
//
//     return cookieDecoded.exp <= currentTime;
// };

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

        const cookieDecoded = getRefreshTokenCookie && STORAGE.jwtDecode(getRefreshTokenCookie);

        if (!getRefreshTokenCookie) {
            console.log('test');
            deleteTokensAndAuthBearerTokenAndPushLogIn();

            return Promise.reject(error);

        } else if (cookieDecoded.exp* 1000 <= Date.now()) {
            console.error('refreshToken expired');

            history.push(RoutesUrls.logout);

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

            await axios({
                method: 'post',
                url: APIUrls.refreshTokens
            })
                .then(async res => {
                    const newToken = res.data.accessToken;

                    await setAuthBearerToken(newToken);

                    await onAccessTokenFetched(newToken);
                    STORAGE.setItem('accessToken', newToken);

                    isAlreadyFetchingAccessToken = false;
                })
                .catch(error => {
                    history.push(RoutesUrls.logout);

                    return Promise.reject(error);
                });
        }

        return retryOriginalRequest;
    } catch (err) {
        history.push(RoutesUrls.login);

        return Promise.reject(err);
    }
}
