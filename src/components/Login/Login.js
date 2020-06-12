import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

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

const Login = (props) => {
    console.log(props);
    const classes = useStyles();

    const dispatch = useDispatch();

    const [ fields, setFields ] = useState({
        email: '',
        password: ''
    });

    const onChange = e => {
        setFields({
                ...fields,
                [e.target.name]: e.target.value
            }
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log(fields);

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
                <form className={classes.form} noValidate onSubmit={ onSubmit }>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={fields.email}
                        onChange={ onChange }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={fields.password}
                        onChange={ onChange }
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
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
                            <Link to='/registration' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
        // <div className='row'>
        //     <form className="card p-3 mx-auto col-md-6">
        //         <h2>Вход</h2>
        //
        //         <div className="form-group">
        //             <label htmlFor="email">Email</label>
        //             <input
        //                 type="email"
        //                 className="form-control"
        //                 value={fields.email}
        //                 name="email"
        //             />
        //         </div>
        //
        //         <div className="form-group">
        //             <label htmlFor="password">Пароль</label>
        //             <input
        //                 type="password"
        //                 className="form-control"
        //                 value={fields.password}
        //                 name="password"
        //             />
        //         </div>
        //
        //     </form>
        //
        // </div>
    );
};

export default Login;
