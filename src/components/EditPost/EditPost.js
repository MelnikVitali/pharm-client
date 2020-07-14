import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from "react-helmet";

import {
    Button, Typography, TextField
} from '@material-ui/core';


import { editPost, getPost } from '../../store/actions/postActions';

import Spinner from '../Spinner';

import useStyles from './styles';
import Navbar from '../Navbar';
import Container from '@material-ui/core/Container';
import Preloader from '../Preloader';

const EditPost = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const post = useSelector(store => store.postReducer.post);

    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const { history } = props;
    const id = props.match.params.id;

    const titleInput = useRef(null);
    const textInput = useRef(null);

    useEffect(() => {
        dispatch(getPost(id));
    }, [ dispatch, id ]);

    const onSubmit = e => {
        e.preventDefault();

        dispatch(editPost(id,
            {
                title: titleInput.current.value,
                text: textInput.current.value,
            },
            history));
    };

    if (!post) {
        return <Spinner />
    }

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Container component='main' maxWidth='md' className={classes.root}>
                <Helmet>
                    <title>Редактирование статьи</title>
                </Helmet>

                <Typography variant="h4" align='center'>
                    Редактирование статьи
                </Typography>

                <form className={classes.form} noValidate onSubmit={onSubmit}>

                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.margin}
                        id="title"
                        label={"Заголовок"}
                        name="title"
                        autoComplete="title"
                        inputRef={titleInput}
                        defaultValue={post.title}
                    />

                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.margin}
                        id="text"
                        label={"Текст статьи"}
                        name="text"
                        type="text"
                        inputRef={textInput}
                        defaultValue={post.text}
                        autoComplete="text"

                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Редактировать
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default EditPost;
