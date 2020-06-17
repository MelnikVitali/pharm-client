import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/actions/authActions';

export const Logout = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());

        history.replace('/login');
    }, [ dispatch, history ]);

    return (
        <div>Выход</div>
    );
};

export default Logout;
