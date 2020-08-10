/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Post from '../../components/Post';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';

import { getPosts } from '../../store/actions/postActions';

import useStyles from './style';

const Posts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const posts = useSelector(store => store.postReducer.posts);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Helmet>
                <title>Главная страница</title>
            </Helmet>

            <Container component='section' maxWidth='lg' className={classes.root}>
                <Typography variant="h4" align='center'>
                    Статьи
                </Typography>

                {(posts && posts.length > 0)
                    ? posts.map(post => {
                        return <Post key={post._id} post={post} />
                    })
                    : <Typography variant="h2" gutterBottom align='center' className={classes.marginTop}>
                        Нет ни одного поста
                    </Typography>}
            </Container>

            <Copyright />
        </>
    );
};

export default Posts;
