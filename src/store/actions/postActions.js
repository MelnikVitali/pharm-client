import axios from 'axios';
import * as actions from './types';

export const getPosts = () => async dispatch => {
    const res = await axios.get('/posts');
    dispatch({ type: actions.GET_POSTS, posts: res.data });
};

export const getPost = (id) => async dispatch => {
    const res = await axios.get(`/posts/${ id }`);

    dispatch({ type: actions.GET_POST, post: res.data });
};

export const addPost = (post, history) => async dispatch => {
    await axios.post('/posts', post);
    dispatch({ type: actions.ADD_POST });
    history.push('/');
};

export const editPost = (id, post, history) => async dispatch => {
    await axios.put(`/posts/${ id }`, post);
    dispatch({ type: actions.EDIT_POST });
    history.push(`/post/${ id }`);
};

export const deletePost = (id, history) => async dispatch => {
    await axios.delete(`/posts/${ id }`);
    dispatch({ type: actions.DELETE_POST });
    history.replace('/');
};

export const addComment = (id, comment) => async dispatch => {
    const res = await axios.post(`/posts/comment/${ id }`, comment);

    console.log(res.data);
    dispatch({ type: actions.ADD_COMMENT , post: res.data});
};

export const deleteComment = (id) => async dispatch => {
    const res = await axios.delete(`/posts/comment/${ id }`);
    dispatch({ type: actions.DELETE_COMMENT , post: res.data});
};



