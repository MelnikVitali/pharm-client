import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { addPost } from '../../store/actions/postActions';

import {
    Button,
    Typography,
    TextField
} from '@material-ui/core';

import useStyles from './styles';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';
import Container from '@material-ui/core/Container';
import Preloader from '../../components/Preloader';
import { APIUrls } from '../../configs/APIUrls';
import STORAGE from '../../helpers/storage';

const AddPost = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { history } = props;

    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const storageToken = STORAGE.getItem('accessToken');
    useEffect(() => {
        if (!storageToken) {
            history.push(APIUrls.login);
        }
    }, [ history, storageToken ]);

    const {
        handleSubmit, handleChange,
        values, errors, isValid,
        touched, handleBlur
    } = useFormik({
        initialValues: {
            title: '',
            text: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(2, 'Заголовок должен состоять не менее чем из 2 символов')
                .required('Укажите заголовок'),
            text: Yup.string()
                .min(2, 'Текст должен состоять не менее чем из 2 символов')
                .required('Укажите текст'),
        }),
        onSubmit: fields => dispatch(addPost(fields, history))
    });

    const onChange = (event) => {
        handleChange(event);
    };

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Container component='main' maxWidth='lg' className={classes.root}>
                <Helmet>
                    <title>Добавить статью</title>
                </Helmet>

                <Typography variant="h4" align='center'>
                    Добавить статью
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit}>

                    <TextField
                        error={touched.title && Boolean(errors.title)}
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.margin}
                        id="title"
                        label="Заголовок"
                        helperText={(touched.title && errors.title)
                            ? errors.title
                            : ''}
                        name="title"
                        type="text"
                        autoComplete="title"
                        value={values.title}
                        onBlur={handleBlur}
                        onChange={onChange}
                        autoFocus
                    />

                    <TextField
                        error={touched.text && Boolean(errors.text)}
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.margin}
                        id="text"
                        label="Текст статьи"
                        helperText={(touched.text && errors.text)
                            ? errors.text
                            : ''}
                        name="text"
                        type="text"
                        autoComplete="text"
                        value={values.text}
                        onBlur={handleBlur}
                        onChange={onChange}

                    />

                    <Button
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Опубликовать
                    </Button>
                </form>
            </Container>
            <Copyright />
        </>
    );
};

export default AddPost;
