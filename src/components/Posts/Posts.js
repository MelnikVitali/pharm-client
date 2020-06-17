import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { Spinner} from '../Spinner/Spinner';
import { Post } from '../Post/Post';

import { getPosts } from '../../store/actions/postActions';

const mapStateToProps = state => ({
    posts: state.postReducer.posts
});

 const Posts = connect(mapStateToProps, { getPosts })(props => {
    const { posts, getPosts } = props;

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    if (!posts) {
        return <Spinner />
    }

    return (
        <div>
            <Helmet>
                <title>Главная страница</title>
            </Helmet>
            { posts.map(post => {
                return <Post key={ post._id } post={ post } />
            }) }
        </div>
    );
});

export default Posts;