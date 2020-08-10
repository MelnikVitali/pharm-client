/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';


import { getImages } from '../../store/actions/imageAction';

import useStyles from './style';

const Gallery = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const images = useSelector(store => store.imageReducer.images);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);


    useEffect(() => {
        dispatch(getImages());
    }, [dispatch]);

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Helmet>
                <title>Галерея изображений</title>
            </Helmet>
            <Typography variant="h4" align='center' style={{ marginBottom: '2rem' }}>
                Галерея изображений
            </Typography>

            <Container component='section' maxWidth='lg' className={classes.root}>
                {(images && images.length > 0)
                    ? <PhotoGrid columns={3} photos={images} />
                    : <Typography
                        variant="h2"
                        gutterBottom
                        align='center'
                        className={classes.subtitle}
                    >
                        Нет ни одной картинки
                    </Typography>}
            </Container>
            <Copyright />
        </>
    );
};

export default Gallery;
