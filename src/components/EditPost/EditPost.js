import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import { editPost, getPost } from '../../store/actions/postActions';

import { Spinner } from '../Spinner/Spinner';

const mapStateToProps = state => ({
    post: state.postReducer.post
});

export const EditPost = connect(mapStateToProps, { editPost, getPost })(props => {
    const { getPost, editPost, history, post, match } = props;


    const titleInput = useRef(null);
    const textInput = useRef(null);

    useEffect(() => {
        const id = match.params.id;

        getPost(id);
    }, [ getPost, match.params.id ]);

    const onSubmit = e => {
        e.preventDefault();

        const id = match.params.id;

        editPost(id,
            {
                title: titleInput.current.value,
                text: textInput.current.value,
            },
            history);
    };

    if (!post) {
        return <Spinner />
    }

    return (
        <form onSubmit={ onSubmit }>
            <Helmet>
                <title>Редактирование статьи</title>
            </Helmet>

            <div className='form-group'>
                <label htmlFor="title">Заголовок</label>
                <input
                    ref={ titleInput }
                    type="text"
                    defaultValue={ post.title }
                    className="form-control"
                />
            </div>

            <div className='form-group'>
                <label htmlFor="text">Содержание</label>
                <input
                    ref={ textInput }
                    type="text"
                    defaultValue={ post.text }
                    className="form-control"
                />
            </div>

            <button type='submit' className='btn btn-primary '>Редактировать</button>
        </form>
    );
});



