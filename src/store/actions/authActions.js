import axios from 'axios';
import js_cookie from 'js-cookie';

import STORAGE from '../../helpers/storage';
import { setAuthBearerToken } from '../../helpers/authorization';

import * as actions from './types';

import { history } from '../../helpers/history';

import { APIUrls } from '../../configs/APIUrls';

import { toggleIsFetching } from './toggleIsFetchingActions';

export const loginUser = (loginData) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.login, loginData);

        await dispatch(toggleIsFetching(false));

        const accessToken = res.data.accessToken;

        await STORAGE.setItem('accessToken', accessToken);

        await setAuthBearerToken(accessToken);

        const decoded = STORAGE.jwtDecode(accessToken);
        dispatch(setCurrentUser(decoded));

    } catch (err) {
       await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const forgotPassword = (forgotData) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.put(APIUrls.forgotPassword, forgotData);

        if (res) {
            dispatch(toggleIsFetching(false));
        }

        dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });

    } catch (err) {
        await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const resetPassword = (resetData) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.put(APIUrls.resetPassword, resetData);

            await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });

    } catch (err) {
       await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const registerUser = registerData => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.register, registerData);


          await  dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });
    } catch (err) {
        await dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const confirmEmail = (tokenData) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true));

        const res = await axios.post(APIUrls.emailActivation, tokenData);

        if (res) {
            dispatch(toggleIsFetching(false));
        }

        dispatch({
            type: actions.SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch(toggleIsFetching(false));

        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const logoutUser = () => async dispatch => {
    await STORAGE.removeItem('accessToken');

    await js_cookie.remove('refreshToken');

    await setAuthBearerToken(null);

    await history.push(APIUrls.login);

    dispatch(setCurrentUser(null));
};

export const setCurrentUser = decoded => {
    return {
        type: actions.SET_CURRENT_USER,
        payload: decoded
    }
};
