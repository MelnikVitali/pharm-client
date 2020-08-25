/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

import Post from '../../components/Post';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';

import { getPosts } from '../../store/actions/postActions';

import STORAGE from '../../helpers/storage';

import { history } from '../../helpers/history';

import { RoutesUrls } from '../../configs/RoutesUrls';

import useStyles from './style';

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.zoom}>
                {children}
            </div>
        </Zoom>
    );
}

const Posts = React.memo((props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const posts = useSelector(store => store.postReducer.posts);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const storageToken = STORAGE.getItem('accessToken');

    useEffect(() => {
        if (storageToken) {
            dispatch(getPosts());
        } else {
            history.push(RoutesUrls.login);
        }
    }, []);

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Helmet>
                <title>Главная страница</title>
            </Helmet>

            <Container component='section' maxWidth='lg' className={classes.root} >
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
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            <Copyright />
        </>
    );
});

export default Posts;
