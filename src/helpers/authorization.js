import axios from 'axios';
import js_cookie from 'js-cookie';

import STORAGE from './storage';
import { history } from './history';

import { APIUrls } from '../configs/APIUrls';
import { RoutesUrls } from '../configs/RoutesUrls';

const getTokenStorage = STORAGE.getItem('accessToken');
const getRefreshTokenCookie = js_cookie.get('refreshToken');

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

export function setAuthBearerToken(token) {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
}

export function deleteTokensAndAuthBearerTokenAndPushLogIn() {
    STORAGE.removeItem('accessToken');

    js_cookie.remove('refreshToken');

    setAuthBearerToken(null);

    history.push(RoutesUrls.login);
}

export function isTokenExpiredError() {
    const accessTokenExpires = getTokenStorage && STORAGE.jwtDecode(getTokenStorage);

    const getTime = new Date().getTime() / 1000;

    return accessTokenExpires.exp <= getTime;
}

function onAccessTokenFetched(accessToken) {
    subscribers.forEach(callback => callback(accessToken));
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

export async function resetTokenAndReattemptRequest(error) {
    try {
        const { response: errorResponse } = error;

        if (!getRefreshTokenCookie) {
            deleteTokensAndAuthBearerTokenAndPushLogIn();

            return Promise.reject(error);
        } else if (getRefreshTokenCookie) {
            const cookieDecoded = STORAGE.jwtDecode(getRefreshTokenCookie);
            const currentTime = Date.now() / 1000;

            if (cookieDecoded.exp < currentTime) {
                deleteTokensAndAuthBearerTokenAndPushLogIn();

                return Promise.reject(error);
            }
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
                    deleteTokensAndAuthBearerTokenAndPushLogIn();

                    return Promise.reject(error);
                });
        }

        return retryOriginalRequest;
    } catch (err) {
        deleteTokensAndAuthBearerTokenAndPushLogIn();

        return Promise.reject(err);
    }
}
