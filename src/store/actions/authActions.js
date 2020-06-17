import axios from 'axios';
import js_cookie from 'js-cookie';

import STORAGE from '../../helpers/storage';
import { setAuthBearerToken } from '../../helpers/authorization';

import * as actions from './types';

export const loginUser = (loginData) => async dispatch => {
    try {
        const res = await axios.post("/login", loginData);
        const accessToken = res.data.accessToken;

        await STORAGE.setItem('accessToken', accessToken);

        await setAuthBearerToken(accessToken);

        const decoded = STORAGE.jwtDecode(accessToken);
        dispatch(setCurrentUser(decoded));

    } catch (err) {
        console.log('ERR', err);
        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const registerUser = registerData => async dispatch => {
    try {
        const res = await axios.post('/register', registerData);

        const accessToken = res.data.accessToken;

        await STORAGE.setItem('accessToken', accessToken);

        await setAuthBearerToken(accessToken);

        dispatch({ type: actions.SET_CURRENT_USER, payload: res.data.user });
    } catch (err) {
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

        dispatch(setCurrentUser(null));
};

export const setCurrentUser = decoded => {
    return {
        type: actions.SET_CURRENT_USER,
        payload: decoded
    }
};
