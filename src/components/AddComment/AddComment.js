import React, {  useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { addComment } from "../../store/actions/postActions";

const mapStateToProps = state => ({
    user: state.authReducer.user
});

export const AddComment = withRouter(connect(mapStateToProps, { addComment })(props =>{

    const [ text, setText ] = useState('');

    const onChange = e => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(props.match.params);
        const id = props.match.params.id;
        console.log(text, id);

        props.addComment(id, {text});

        setText('');
    };


    if (!props.user) {
        return <div>
            <p>Комментировать могут только зарегестрированные пользователи<br />
                <Link to='/login'>Войти</Link>
                &nbsp;
                или
                &nbsp;
                <Link to='/register'>зарегистрироваться</Link>
            </p>
        </div>
    }

    return (
        <form className='mb-3' onSubmit={ onSubmit }>
            <div className="form-group">
                <label htmlFor="text">Коментарий</label>
                <textarea
                    value={ text }
                    onChange={ onChange }
                    name='text'
                    className='form-control'
                />
            </div>
            <button type='submit' className='btn btn-primary'>Отправить</button>
        </form>
    )
}));
