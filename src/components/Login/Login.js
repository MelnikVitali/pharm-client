import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { loginUser } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

import { APIUrls } from '../../configs/APIUrls';

import useStyles from './style';
import Navbar from '../Navbar';
import Preloader from '../Preloader';

const Login = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const errorsServer = useSelector(store => store.errorReducer);
    const user = useSelector(store => store.authReducer.user);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    useEffect(() => {
        dispatch(clearErrors());

        if (user) {
            history.push(APIUrls.homePage);
        }
    }, [ history, user, dispatch ]);

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

    return (
        <>
            {isFetching ? <Preloader/> : null}
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

                    <Button
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>

                    <Grid container>
                        <Grid component={Link} to={APIUrls.forgotPassword} variant="body2" item xs>
                            Forgot password?
                        </Grid>
                        <Grid component={Link} to={APIUrls.register} variant="body2" item>
                            {"Don't have an account? Sign Up"}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default Login;
