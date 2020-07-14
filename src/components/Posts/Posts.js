import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import Container from '@material-ui/core/Container';
import Post from '../Post';

import { getPosts } from '../../store/actions/postActions';
import Preloader from '../Preloader';
import Navbar from '../Navbar';
import Typography from '@material-ui/core/Typography';

const Posts = () => {
    const dispatch = useDispatch();

    const posts = useSelector(store => store.postReducer.posts);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    useEffect(() => {
        dispatch(getPosts());
    }, [ dispatch ]);


    if (!posts) {
        return <Preloader />
    }

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Helmet>
                <title>Главная страница</title>
            </Helmet>
            <Container component='section' maxWidth='md'>
                {(posts.length) > 0
                    ? posts.map(post => {
                        return <Post key={post._id} post={post} />
                    })
                    : <Typography variant="h2" gutterBottom>
                        Нет ни одного поста
                    </Typography>}
            </Container>
        </>
    );
};

export default Posts;
