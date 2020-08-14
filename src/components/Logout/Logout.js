/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../helpers/history';

import { logoutUser } from '../../store/actions/authActions';

import { RoutesUrls } from '../../configs/RoutesUrls';

export const Logout = React.memo(() => {
    const dispatch = useDispatch();

    const user = useSelector(store => store.authReducer.user);

    useEffect(() => {
        dispatch(logoutUser(user));

        return history.push(RoutesUrls.login);
    }, []);

    return (
        <div>Выход</div>
    );
});

export default Logout;
