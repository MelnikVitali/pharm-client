import React, { useState } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import withAuth from "../../hocs/withAuth";

import { addPost } from '../../store/actions/postActions';

export const AddPost = withAuth(connect(null, { addPost })(props => {
    const [ fields, setFields ] = useState({
        title: '',
        text: ''
    });

    const onSubmit = e => {
        e.preventDefault();
        props.addPost(fields, props.history);
    };

    const onChange = e => {
        setFields({
                ...fields,
                [e.target.name]: e.target.value
            }
        );
    };

    return (
        <form onSubmit={ onSubmit }>
            <Helmet>
                <title>Добавить статью</title>
            </Helmet>

            <div className='form-group'>
                <label htmlFor="title">Заголовок</label>
                <input
                    type="text"
                    value={ fields.title }
                    onChange={ onChange }
                    name='title'
                    className="form-control"
                />
            </div>

            <div className='form-group'>
                <label htmlFor="text">Содержание</label>
                <input
                    type="text"
                    value={ fields.text }
                    onChange={ onChange }
                    name='text'
                    className="form-control"
                />
            </div>

            <button type='submit' className='btn btn-primary '>Опубликовать</button>
        </form>
    );

}));

