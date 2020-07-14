import axios from 'axios';
import js_cookie from 'js-cookie';

import STORAGE from './storage';
import { history } from './history';

import {APIUrls} from '../configs/APIUrls';

const getTokenStorage = STORAGE.getItem('accessToken');
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

export function setAuthBearerToken(token) {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
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
        const resetToken = js_cookie.get('refreshToken');

        if (!resetToken) {
            history.push(APIUrls.logout);

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
                .then(res => {
                const newToken = res.data.accessToken;
                setAuthBearerToken(newToken);

                onAccessTokenFetched(newToken);
                STORAGE.setItem('accessToken', newToken);

                isAlreadyFetchingAccessToken = false;
            })
                .catch(error => {
                history.push(APIUrls.logout);

                return Promise.reject(error);
            });
        }

        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
}
