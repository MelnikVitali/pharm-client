import axios from 'axios';

import STORAGE from '../../helpers/storage';
import { deleteTokensAndAuthBearerTokenAndPushLogIn, setAuthBearerToken } from '../../helpers/authorization';

import * as actions from './types';

import { APIUrls } from '../../configs/APIUrls';

import { toggleIsFetching } from './toggleIsFetchingActions';

const axiosConfig = {
    withCredentials: true,
    cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
    }
};

export const socialLogin = (loginData) => async dispatch => {
    try {

        const accessToken = loginData.accessToken;

        await STORAGE.setItem('accessToken', accessToken);

        await setAuthBearerToken(accessToken);

        const decoded = STORAGE.jwtDecode(accessToken);
        return dispatch(setCurrentUser(decoded));

    } catch (err) {
        return dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const loginUser = (loginData) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.login, loginData, axiosConfig);

        await dispatch(toggleIsFetching(false));

        const accessToken = res.data.accessToken;

        STORAGE.setItem('accessToken', accessToken);

        setAuthBearerToken(accessToken);

        const decoded = STORAGE.jwtDecode(accessToken);



        dispatch(setCurrentUser({
            userId: decoded.userId,
            deviceId: decoded.deviceId,
            name: decoded.name

        }));

        document.cookie = 'name=Flavio2';

        return console.log('cookie', res.headers.getSetCookie());

    } catch (err) {
        await dispatch(toggleIsFetching(false));

        return dispatch({
            type: actions.ERROR,
            payload: err?.response?.data
        });
    }
};

export const forgotPassword = (forgotData) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.put(APIUrls.forgotPassword, forgotData, axiosConfig);

        if (res) {
            dispatch(toggleIsFetching(false));
        }

        return dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });

    } catch (err) {
        await dispatch(toggleIsFetching(false));

        return dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const resetPassword = (resetData) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.put(APIUrls.resetPassword, resetData, axiosConfig);

        await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });

    } catch (err) {
        await dispatch(toggleIsFetching(false));

        return dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const registerUser = registerData => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.register, registerData, axiosConfig);

        await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });
    } catch (err) {
        await dispatch(toggleIsFetching(false));

        return dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const confirmEmail = (tokenData) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.emailActivation, tokenData, axiosConfig);

        if (res) {
            dispatch(toggleIsFetching(false));
        }

        return dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch(toggleIsFetching(false));

        return dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const repeatEmailActivation = (token, email) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.repeatEmailActivation, token, email, axiosConfig);

        if (res) {
            dispatch(toggleIsFetching(false));
        }

        return dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch(toggleIsFetching(false));

        return dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const logoutUser = (userIdData) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.logout, userIdData, axiosConfig);

        if (res) {
            dispatch(toggleIsFetching(false));

            deleteTokensAndAuthBearerTokenAndPushLogIn();
        }

        return dispatch(setCurrentUser(null));

    } catch (err) {
        await dispatch(toggleIsFetching(false));

        return deleteTokensAndAuthBearerTokenAndPushLogIn();
    }

};

export const setCurrentUser = decoded => {
    return {
        type: actions.SET_CURRENT_USER,
        payload: decoded
    };
};
