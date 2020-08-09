import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Alert } from '@material-ui/lab';

import { forgotPassword } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import { clearSuccess } from '../../store/actions/successActions';

import { APIUrls } from '../../configs/APIUrls';

import Navbar from '../Navbar';
import Preloader from '../Preloader';
import Copyright from '../Copyright';

import useStyles from './style';

const ForgotPassword = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const errorsServer = useSelector(store => store.errorReducer);
    const successServer = useSelector(store => store.successReducer);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearSuccess());

    }, [ dispatch ]);

    const {
        handleSubmit, handleChange,
        values, errors, isValid,
        touched, handleBlur,
    } = useFormik({
        initialValues: {
            email: '',

        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Укажите правильный email')
                .required('Укажите email'),
        }),
        onSubmit: fields => dispatch(forgotPassword(fields))
    });

    const onFocus = () => {
        dispatch(clearErrors());
        dispatch(clearSuccess());
    };

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />

            <Container component="main" maxWidth="xs" className={classes.root}>

                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <HelpOutlineIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>

                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                        <TextField
                            error={touched.email && (Boolean(errors.email))}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            helperText={(touched.email && errors.email)
                                ? (errors.email || errorsServer.email)
                                : ''}
                            name="email"
                            autoComplete="email"
                            value={values.email || ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={onFocus}
                        />
                        <div>
                            {errorsServer.error
                                ? <Alert severity="error">
                                    {errorsServer.error}
                                </Alert>
                                : null}
                            {successServer.message
                                ? <Alert severity="success">
                                    {successServer.message}
                                </Alert>
                                : null}
                        </div>

                        <Button
                            disabled={!isValid}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.btnMargin}
                        >
                            submit
                        </Button>

                        <Button
                            variant="outlined"
                            component={Link}
                            to={APIUrls.homePage}
                        >
                            LogIn
                        </Button>

                        <Typography
                            variant="body2"
                            display='block'
                            align='center'
                            component={Link}
                            to={APIUrls.homePage}
                        >
                            I remember my password!
                        </Typography>

                    </form>
                </div>

            </Container>
            <Copyright />
        </>
    );
};

export default ForgotPassword;
