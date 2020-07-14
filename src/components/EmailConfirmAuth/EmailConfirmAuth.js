import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, AlertTitle } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import { confirmEmail } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import { clearSuccess } from '../../store/actions/successActions';
import Preloader from '../Preloader';

const EmailConfirmAuth = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const token = props.match.params.id;

    const errorsServer = useSelector(store => store.errorReducer);
    const successServer = useSelector(store => store.successReducer);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearSuccess());

        dispatch(confirmEmail({ token }));
    }, [ dispatch, token ]);

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
            </Container>
        </>
    );
};

export default EmailConfirmAuth;
