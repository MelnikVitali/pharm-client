import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/actions/authActions';

import { APIUrls } from '../../configs/APIUrls';

export const Logout = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());

        history.replace(APIUrls.login);
    }, [ dispatch, history ]);

    return (
        <div>Выход</div>
    );
};

export default Logout;
