import axios from 'axios';
import * as actions from './types';

import { APIUrls } from '../../configs/APIUrls';

export const getPosts = () => async dispatch => {
    const res = await axios.get(APIUrls.posts);

    dispatch({ type: actions.GET_POSTS, posts: res.data });
};

export const getPost = (id) => async dispatch => {
    const res = await axios.get(`${APIUrls.posts}/${id}`);

    dispatch({ type: actions.GET_POST, post: res.data });
};

export const addPost = (post, history) => async dispatch => {
    await axios.post(APIUrls.posts, post);

    dispatch({ type: actions.ADD_POST });

    history.push(APIUrls.homePage);
};

export const editPost = (id, post, history) => async dispatch => {
    await axios.put(`${APIUrls.posts}/${id}`, post);

    dispatch({ type: actions.EDIT_POST });

    history.push(`${APIUrls.post}/${id}`);
};

export const deletePost = (id, history) => async dispatch => {
    await axios.delete(`${APIUrls.posts}/${id}`);

    dispatch({ type: actions.DELETE_POST });

    history.replace(APIUrls.homePage);
};
