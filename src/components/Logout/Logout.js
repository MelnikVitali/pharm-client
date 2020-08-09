import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../store/actions/authActions';

import { RoutesUrls } from '../../configs/RoutesUrls';

export const Logout = ({ history }) => {
    const dispatch = useDispatch();

    const userId = useSelector(store => store.authReducer.user.userId);

    useEffect(() => {
        dispatch(logoutUser({ userId }));

        history.push(RoutesUrls.login);
    }, [ dispatch, history, userId ]);

    return (
        <div>Выход</div>
    );
};

export default Logout;
