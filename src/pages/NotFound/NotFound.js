import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from '../../components/Copyright';

import { RoutesUrls } from '../../configs/RoutesUrls';

import useStyles from './styles';

const NotFound = () => {
    const classes = useStyles();

    return (
        <>
            <Container component='main' maxWidth='md' className={classes.root}>
                <Typography component='p' variant='h1' align='center' className={classes.error}>
                    404
                </Typography>
                <Typography component='h1' variant="h2" align='center'>
                    Страница не найдена
                </Typography>
                <Typography component='p' variant="body1" align='center'>
                    Вернуться на <Link to={RoutesUrls.homePage}>главную страницу</Link>
                </Typography>
            </Container>
            <Copyright />
        </>
    );
};

export default NotFound;
