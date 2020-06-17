import React, { useEffect } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
    const WithAuth = (props) => {
        const toLogin = () => {
            if (!props.user) {
                props.history.push('/login');
            }
        };
        useEffect(() => {
            toLogin();
        });

        return <ChildComponent { ...props } />
    };

    const mapStateToProps = state => ({
        user: state.authReducer.user
    });

    return connect(mapStateToProps)(WithAuth);
}
