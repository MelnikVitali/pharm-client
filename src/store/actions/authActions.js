import axios from 'axios';

import STORAGE from '../../helpers/storage';
import { setAuthBearerToken } from '../../helpers/authorization';
import * as actions from './types';

export const loginUser = (loginData) => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", loginData);
        const { accessToken, refreshToken } = res.data.tokens;

        await STORAGE.setItem('tokens', {
            accessToken,
            refreshToken
        });

        await setAuthBearerToken(accessToken);

        dispatch({ type: actions.ERROR, user: res.data.user });

        const decoded = STORAGE.jwtDecode(accessToken);
        dispatch(setCurrentUser(decoded));

    } catch (err) {
        dispatch({
            type: actions.ERROR,
            payload: err.response.data
        });
    }
};

export const logoutUser = (history) => dispatch => {
    STORAGE.removeItem('tokens');

    setAuthBearerToken(false);

    dispatch(setCurrentUser({}));

    history.push('/login');
}

export const setCurrentUser = decoded => {
    return {
        type: actions.SET_USER,
        payload: decoded
    }
};

