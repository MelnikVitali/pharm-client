import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";

import { Spinner } from '../Spinner/Spinner';
import { AddComment } from '../AddComment/AddComment';
import { Comments } from '../Comments/Comments';

import { getPost, deletePost } from '../../store/actions/postActions';


const mapStateToProps = state => ({
    user: state.authReducer.user,
    post: state.postReducer.post
});


const PostPage = connect(mapStateToProps, { getPost, deletePost })(props => {
    const { getPost, history, post, user } = props;

    useEffect(() => {
        const id = props.match.params.id;

        getPost(id);
    }, [ getPost, props.match.params.id ]);


    const deletePost = () => {
        const id = props.match.params.id;

        props.deletePost(id, history);
    };

    if (!post) {
        return <Spinner />
    }
    return (
        <div>
            <Helmet>
                <title>{ post.title }</title>
            </Helmet>

            <h1>{ post.title }</h1>

            <p className="text-muted">{ post.author.name }</p>

            <p>{ post.text }</p>

            { user && user.id === post.author._id ? (
                <div className='mb-3'>
                    <button onClick={ deletePost } className='btn btn-danger mr-2'>
                        Удалить
                    </button>
                    <Link className=' btn btn-info mr-2' to={ `/edit/${ post._id }` }>
                        Редактировать
                    </Link>
                </div>
            ) : null }

            <AddComment />
            <Comments comments={ post.comments } />
        </div>
    );

});

export default PostPage;

