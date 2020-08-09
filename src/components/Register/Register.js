import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';

import { clearErrors } from '../../store/actions/errorActions';
import { registerUser } from '../../store/actions/authActions';
import { clearSuccess } from '../../store/actions/successActions';

import { APIUrls } from '../../configs/APIUrls';

import Preloader from '../Preloader';
import Navbar from '../Navbar';
import Copyright from '../Copyright';

import useStyles from './style';

const Register = () => {
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
        touched, handleBlur, setValues
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Укажите имя'),
            email: Yup.string()
                .email('Укажите правильный email')
                .required('Укажите email'),
            password: Yup.string()
                .min(6, 'Пароль должен состоять не менее чем из 6 символов')
                .required('Укажите пароль'),
            confirmPassword: Yup.string()
                .oneOf([ Yup.ref('password'), null ], 'Пароли не совпадают')
                .required('Повторите пароль')
        }),
        onSubmit: fields => dispatch(registerUser(fields))
    });

    const onFocus = () => {
        dispatch(clearErrors());
        dispatch(clearSuccess());
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
        console.log(values.showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {isFetching ? <Preloader /> : null}

            <Navbar />
            <Container component="main" maxWidth="xs" className={classes.root}>

                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                        <TextField
                            error={touched.name && (Boolean(errors.name) || Boolean(errorsServer.name))}
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label={errors.name || errorsServer.name ? "Error Name" : "Name"}
                            helperText={(touched.name && (errors.name || errorsServer.name))
                                ? (errors.name || errorsServer.name)
                                : ''}
                            name="name"
                            autoComplete="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={onFocus}
                        />

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
                            error={touched.password && (Boolean(errors.password) || Boolean(errorsServer.password))}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            helperText={(touched.password && (errors.password || errorsServer.password))
                                ? (errors.password || errorsServer.password)
                                : ''}
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

                        <TextField
                            error={touched.confirmPassword &&
                            (Boolean(errors.confirmPassword) ||
                                Boolean(errorsServer.confirmPassword))}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            helperText={(touched.confirmPassword &&
                                (errors.confirmPassword || errorsServer.confirmPassword))
                                ? (errors.confirmPassword || errorsServer.confirmPassword)
                                : ''}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="confirmPassword"
                            value={values.confirmPassword || ''}
                            onBlur={handleBlur}
                            onFocus={onFocus}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {errorsServer.error
                            ? <Alert severity="error">{errorsServer.error}</Alert>
                            : null}
                        {successServer.message
                            ? <Alert severity="success">{successServer.message}</Alert>
                            : null}

                        <Button
                            disabled={!isValid}
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            className={classes.submit}
                            size="medium"
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid
                                component={Link}
                                to={APIUrls.login}
                                variant="body2"
                                item
                            >
                                Already have an account? Sign in
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Copyright />
        </>
    );
};

export default Register;
