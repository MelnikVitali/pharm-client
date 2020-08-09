import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as QueryString from "query-string";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Alert } from '@material-ui/lab';

import { resetPassword } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import { clearSuccess } from '../../store/actions/successActions';

import { RoutesUrls } from '../../configs/RoutesUrls';

import Preloader from '../Preloader';

import useStyles from './style';

const ResetPassword = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const params = QueryString.parse(props.location.search);
    const token = params.token;

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
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false

        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Пароль должен состоять не менее чем из 6 символов')
                .required('Укажите пароль'),
            confirmPassword: Yup.string()
                .oneOf([ Yup.ref('password'), null ], 'Пароли не совпадают')
                .required('Повторите пароль')
        }),
        onSubmit: fields => dispatch(resetPassword({
            newPassword: fields.password,
            resetLink: token
        })),
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
            <Container component="main" maxWidth="xs" className={classes.root}>

                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <HelpOutlineIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>

                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                        <TextField
                            error={touched.password && Boolean(errors.password)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            helperText={(touched.password && errors.password)
                                ? errors.password
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
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            helperText={(touched.confirmPassword && errors.confirmPassword)
                                ? errors.confirmPassword
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
                            ? <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errorsServer.error}
                            </Alert>
                            : null}
                        {successServer.message
                            ? <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                {successServer.message}
                            </Alert>
                            : null}

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
                            to={RoutesUrls.homePage}
                        >
                         LogIn
                        </Button>

                    </form>
                </div>

            </Container>
        </>
    );
};

export default ResetPassword;
