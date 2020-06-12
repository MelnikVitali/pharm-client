import STORAGE from './storage';

import axios from 'axios';

const getTokenStorage = STORAGE.getItem('token');
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
    const accessTokenExpires = getTokenStorage && STORAGE.jwtDecode(getTokenStorage.access_token);
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
        const resetToken = getTokenStorage.refresh_token;
        if (!resetToken) {
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
                url: `/refresh-tokens`,
                data: {
                    refresh_token: resetToken,
                },
            });

            if (!response.data) {
                return Promise.reject(error);
            }

            const newToken = response.data.access_token;
            setAuthBearerToken(newToken);
            onAccessTokenFetched(newToken);
            STORAGE.setItem('token', {
                accessToken: newToken,
                refreshToken: response.data.refreshToken,
            });
            isAlreadyFetchingAccessToken = false;
        }

        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
}
