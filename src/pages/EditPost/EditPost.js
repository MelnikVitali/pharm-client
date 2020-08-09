import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Helmet from "react-helmet";

import {
    Button, Typography, TextField, Container
} from '@material-ui/core';

import { editPost, getPost } from '../../store/actions/postActions';

import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';
import Preloader from '../../components/Preloader';

import { APIUrls } from '../../configs/APIUrls';

import useStyles from './styles';

const validationSchema = Yup.object({
    title: Yup.string()
        .min(2, 'Заголовок должен состоять не менее чем из 2 символов')
        .required('Укажите заголовок'),
    text: Yup.string()
        .min(2, 'Текст должен состоять не менее чем из 2 символов')
        .required('Укажите текст'),
});

const EditPost = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const post = useSelector(store => store.postReducer.post);

    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const { history } = props;
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getPost(id));
    }, [ dispatch, id ]);

    const onSubmit = values => {
        dispatch(editPost(id,
            {
                title: values.title,
                text: values.text,
            },
            history));
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
                    <title>Редактирование статьи</title>
                </Helmet>

                <Typography variant="h4" align='center'>
                    Редактирование статьи
                </Typography>
                <Formik
                    initialValues={{
                        title: post.title,
                        text: post.text
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        onSubmit(values)
                    }}
                >
                    {({
                          handleSubmit, handleChange,
                          values, errors,
                          isValid,
                          touched,
                          handleBlur
                      }) => (
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>

                            <TextField
                                error={touched.title && Boolean(errors.title)}
                                variant="outlined"
                                required
                                fullWidth
                                className={classes.margin}
                                id="title"
                                label={"Заголовок"}
                                helperText={(touched.title && errors.title)
                                    ? errors.title
                                    : ''}
                                name="title"
                                autoComplete="title"
                                value={values.title}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />

                            <TextField
                                error={touched.text && Boolean(errors.text)}
                                variant="outlined"
                                required
                                fullWidth
                                className={classes.margin}
                                id="text"
                                label={"Текст статьи"}
                                helperText={(touched.text && errors.text)
                                    ? errors.text
                                    : ''}
                                name="text"
                                type="text"
                                value={values.text}
                                autoComplete="text"
                                onBlur={handleBlur}
                                onChange={handleChange}

                            />

                            <Button
                                disabled={!isValid}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Редактировать
                            </Button>

                            <Link to={`${APIUrls.post}/${post._id}`} className={classes.link}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                >
                                    Отмена
                                </Button>
                            </Link>
                        </form>
                    )}

                </Formik>
            </Container>
            <Copyright />
        </>
    );
};

export default EditPost;
