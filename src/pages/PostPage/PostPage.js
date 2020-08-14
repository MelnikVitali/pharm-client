/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { getPost, deletePost } from '../../store/actions/postActions';

import { Button, Typography, Divider, Container } from '@material-ui/core';

import { RoutesUrls } from '../../configs/RoutesUrls';

import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';

import useStyles from './style';

const PostPage = React.memo((props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const post = useSelector(store => store.postReducer.post);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const { history } = props;
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getPost(id));
    }, []);

    const onDeletePost = () => {
        dispatch(deletePost(id, history));
    };

    if (!post) {
        return <Preloader />
    }

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Container component='main' maxWidth='lg' className={classes.root}>
                <Helmet>
                    <title>{post.title}</title>
                </Helmet>

                <Typography variant="h3" display="block" gutterBottom>
                    {post.title}
                </Typography>

                <Divider light />

                <Typography display="block" gutterBottom className={classes.textMuted}>
                    {`Post author : ${post.author ? post.author.name : 'unknown author'}`}
                </Typography>

                <Typography variant="subtitle1" display="block" gutterBottom>
                    {post.text}
                </Typography>

                <div className={classes.marginBottom}>
                    <Link to={RoutesUrls.homePage}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.margin}
                        >
                            Вернуться на главную
                        </Button>
                    </Link>
                    <Link to={`${RoutesUrls.editPost}/${post._id}`} className={classes.textDecoration}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="default"
                            className={classes.margin}
                        >
                            Редактировать
                        </Button>
                    </Link>
                    <Button onClick={onDeletePost} className={classes.margin} variant="contained"
                            color="secondary" type="submit">
                        Удалить
                    </Button>
                </div>
            </Container>
            <Copyright />
        </>
    );
});

export default PostPage;
