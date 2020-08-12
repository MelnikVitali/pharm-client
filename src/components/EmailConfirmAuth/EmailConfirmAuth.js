/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as QueryString from 'query-string';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { confirmEmail, repeatEmailActivation } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import { clearSuccess } from '../../store/actions/successActions';

import { RoutesUrls } from '../../configs/RoutesUrls';

import Preloader from '../Preloader';

import useStyles from './styles';

const EmailConfirmAuth = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ disabledBtn, setDisabledBtn ] = useState(false);

    const params = QueryString.parse(props.location.search);
    const token = params.token;

    const errorsServer = useSelector(store => store.errorReducer);
    const successServer = useSelector(store => store.successReducer);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearSuccess());

        dispatch(confirmEmail({ token }));
    }, []);

    const handleClick = () => {
        dispatch(repeatEmailActivation({ token }));

        dispatch(clearErrors());
        dispatch(clearSuccess());

        setDisabledBtn(true);
    }

    return (
        <>
            {isFetching ? <Preloader /> : null}

                <Container component='section' maxWidth='md' className={classes.root}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant="h5" component="h1" className={classes.marginTop}>
                        Страница подтверждения аутендификации
                    </Typography>

                    <div>
                        {errorsServer.error
                            ? <Alert
                                severity="error"
                                variant="filled"
                                className={classes.textLeft}
                            >
                                <AlertTitle>Error</AlertTitle>
                                {errorsServer.error}
                            </Alert>
                            : null}
                        {successServer.message
                            ? <Alert
                                severity="success"
                                variant="filled"
                                className={classes.textLeft}
                            >
                                <AlertTitle>Success</AlertTitle>
                                {successServer.message}
                            </Alert>
                            : null}
                    </div>

                    <div className={classes.btnGroup}>
                        <Button
                            variant="contained"
                            component={Link}
                            color="primary"
                            fontSize="large"
                            className={classes.btn}
                            to={RoutesUrls.homePage}
                        >
                            Перейти на страницу входа
                        </Button>
                        <Button
                            disabled={disabledBtn}
                            variant="contained"
                            component={Link}
                            fontSize="large"
                            className={clsx(classes.btn)}
                            onClick={handleClick}
                        >
                            Отправить письмо повторно
                        </Button>
                    </div>
                </Container>
        </>
    );
};

export default EmailConfirmAuth;
