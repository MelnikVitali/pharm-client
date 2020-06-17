import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { loginUser } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const errors = useSelector(store => store.errorReducer);
    const user = useSelector(store =>  store.authReducer.user);

    const [ fields, setFields ] = useState({
        email: '',
        password: ''
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

        dispatch(loginUser(fields));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={errors.email ?
                            <span className="text-danger">{errors.email}</span>
                            : "Email Address"}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={fields.email}
                        onChange={onChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
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

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    {errors.limit && (<div className="text-danger">{errors.limit}</div>)}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/' variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='/register' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
};

export default Login;
