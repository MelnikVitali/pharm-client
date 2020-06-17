import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import './Navbar.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const Navbar = () => {
    const classes = useStyles();

    const user = useSelector(state => state.authReducer.user);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
            <div className="container">
                <Link to='/' className="navbar-brand">
                    React Blog
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/add' className="nav-link">Добавить статью</Link>
                        </li>
                    </ul>
                </div>
                {user ? (
                    <ul className="navbar-nav d-flex align-items-center">
                        <li className="nav-item">
                            <Link to='#' className="nav-link">
                                <Avatar className={classes.orange}>{user.name.substring(0, 1).toUpperCase()}</Avatar>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/logout' className="nav-link">
                                Выход
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/login' className="nav-link">
                                Вход
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/register' className="nav-link">
                                Регистрация
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;