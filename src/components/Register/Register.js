import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { clearErrors } from '../../store/actions/errorActions';
import { registerUser } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const errors = useSelector(store => store.errorReducer);
    const user = useSelector(store => store.authReducer.user);

    const [ fields, setFields ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        dispatch(clearErrors());

        if (user) {
            history.push('/');
        }

    }, [ dispatch, user, history ]);

    const onChange = e => {
        setFields({
                ...fields,
                [e.target.name]: e.target.value
            }
        );
    };

    const onSubmit = event => {
        event.preventDefault();

        dispatch(registerUser(fields));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label={errors.name ?
                                    <span className="text-danger">{errors.name}</span>
                                    : "Name"}
                                name="name"
                                autoComplete="name"
                                value={fields.name}
                                onChange={onChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={errors.email ?
                                    <span className="text-danger">{errors.email}</span>
                                    : "Email Address"}
                                name="email"
                                autoComplete="email"
                                value={fields.email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={errors.password ?
                                    <span className="text-danger">{errors.password}</span>
                                    : "Password"}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={fields.password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label={errors.password2 ?
                                    <span className="text-danger">{errors.password2}</span>
                                    : "Confirm password"}
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={fields.password2}
                                onChange={onChange}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Register;
