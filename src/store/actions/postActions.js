import axios from 'axios';

import { APIUrls } from '../../configs/APIUrls';
import { RoutesUrls } from '../../configs/RoutesUrls';

import * as actions from './types';

import { toggleIsFetching } from './toggleIsFetchingActions';

export const getPosts = () => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.get(APIUrls.posts);

        await dispatch(toggleIsFetching(false));

        dispatch({ type: actions.GET_POSTS, posts: res.data });

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};

export const getPost = (id) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.get(`${APIUrls.posts}/${id}`);

        await dispatch(toggleIsFetching(false));

        dispatch({ type: actions.GET_POST, post: res.data });

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};

export const addPost = (post, history) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        await axios.post(APIUrls.posts, post);

        await dispatch(toggleIsFetching(false));

        dispatch({ type: actions.ADD_POST });

        history.push(RoutesUrls.homePage);

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};

export const editPost = (id, post, history) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        await axios.put(`${APIUrls.posts}/${id}`, post);

        await dispatch(toggleIsFetching(false));

        dispatch({ type: actions.EDIT_POST });

        history.push(`${RoutesUrls.post}/${id}`);

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};

export const deletePost = (id, history) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        await axios.delete(`${APIUrls.posts}/${id}`);

        await dispatch(toggleIsFetching(false));

        dispatch({ type: actions.DELETE_POST });

        history.replace(RoutesUrls.homePage);

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};
