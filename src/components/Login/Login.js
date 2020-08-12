import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FacebookIcon from '@material-ui/icons/Facebook';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Alert } from '@material-ui/lab';
import { loginUser } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

import { socialLogin } from '../../store/actions/authActions';

import { APIUrls } from '../../configs/APIUrls';
import { RoutesUrls } from '../../configs/RoutesUrls';
import { socialAuth } from '../../configs/socialAuth';

import { history } from '../../helpers/history';
import STORAGE from '../../helpers/storage';

import Navbar from '../Navbar';
import Preloader from '../Preloader';
import Copyright from '../Copyright';

import useStyles from './style';
import { toggleIsFetching } from '../../store/actions/toggleIsFetchingActions';

const Login = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const errorsServer = useSelector(store => store.errorReducer);
    const user = useSelector(store => store.authReducer.user);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const storageToken = STORAGE.getItem('accessToken');

    useEffect(() => {
        dispatch(clearErrors());

        if (user && storageToken) {
            history.push(RoutesUrls.homePage);
        }
    }, [ storageToken, user, dispatch ]);

    const {
        handleSubmit, handleChange,
        values, errors, isValid,
        touched, handleBlur, setValues
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            showPassword: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Укажите правильный email')
                .required('Укажите email'),
            password: Yup.string()
                .min(6, 'Пароль должен состоять не менее чем из 6 символов')
                .required('Укажите пароль'),
        }),
        onSubmit: fields => dispatch(loginUser(fields))
    });

    const onFocus = () => {
        dispatch(clearErrors());
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const responseSuccessGoogle = async (response) => {
        try {
            await dispatch(toggleIsFetching(true));

            await axios({
                method: "POST",
                url: APIUrls.googleLogin, //Link to https://console.cloud.google.com/apis/credentials/
                data: { tokenId: response.tokenId },
            }).then(response => {
                dispatch(socialLogin(response.data));
            });

            await dispatch(toggleIsFetching(false));

        } catch (e) {
            await dispatch(toggleIsFetching(false));
        }

    };

    const responseErrorGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = async (response) => {
        try {
            await dispatch(toggleIsFetching(true));

            await axios({
                method: "POST",
                url: APIUrls.facebookLogin, //Link to https://developers.facebook.com/
                data: {
                    accessToken: response.accessToken,
                    userID: response.userID
                },
            }).then(response => {
                dispatch(socialLogin(response.data));
            });

            await dispatch(toggleIsFetching(false));

        } catch (e) {
            await dispatch(toggleIsFetching(false));
        }
    };

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />

            <Container component="main" maxWidth="xs" className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        error={touched.email && (Boolean(errors.email) || Boolean(errorsServer.email))}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        helperText={(touched.email && (errors.email || errorsServer.email))
                            ? (errors.email || errorsServer.email)
                            : ''}
                        name="email"
                        autoComplete="email"
                        value={values.email || ''}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />

                    <TextField
                        error={touched.password && (Boolean(errors.password))}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        helperText={
                            (touched.password && errors.password)
                                ? (errors.password)
                                : ''
                        }
                        type={values.showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={values.password || ''}
                        onBlur={handleBlur}
                        onFocus={onFocus}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {errorsServer.error || errorsServer.limit
                        ? <Alert severity="error">{errorsServer.error || errorsServer.limit}</Alert>
                        : null}
                    <Typography
                        component='div'
                        variant="body2"
                        display="block"
                        gutterBottom
                        className={classes.line}
                    >
                        or
                    </Typography>

                    <Grid container justify='space-between' spacing={2} className={classes.gridRoot}>
                        <Grid item xs={6} sm={6}>
                            <GoogleLogin
                                clientId={socialAuth.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Google Log in"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                className={classes.google}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FacebookLogin
                                appId={socialAuth.REACT_APP_FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields="name,email"
                                callback={responseFacebook}
                                cssClass={classes.facebookBtn}
                                textButton={<span>Facebook Log in</span>}
                                icon={< FacebookIcon />}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.submit}
                    >
                        Submit
                    </Button>

                    <Grid container>
                        <Grid component={Link} to={RoutesUrls.forgotPassword} variant="body2" item xs>
                            Forgot password?
                        </Grid>
                        <Grid component={Link} to={RoutesUrls.register} variant="body2" item>
                            {"Don't have an account? Sign Up"}
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Copyright />
        </>
    );
};

export default Login;
