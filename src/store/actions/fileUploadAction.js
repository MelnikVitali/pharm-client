import axios from 'axios';

import { APIUrls } from '../../configs/APIUrls';

import * as actions from './types';

import { toggleIsFetching } from './toggleIsFetchingActions';

export const openDropzone = () => dispatch => {
    dispatch({ type: actions.OPEN_DROPZONE });
};

export const closeDropzone = () => dispatch => {
    dispatch({ type: actions.CLOSE_DROPZONE });
};

export const clearAlert = () => dispatch => {
    dispatch({ type: actions.CLEAR_ALERT });
};

export const savingFiles = files => async dispatch => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();

    files.forEach(file => fd.append('myFiles', file));

    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.post(`${APIUrls.fileUpload}`, fd, config);

        if (res) {
            dispatch(toggleIsFetching(false));

            const resReject = res.data.rejected && res.data.rejected.map(file => file.fileName);
            const resSave = res.data.saved && res.data.saved.map(file => file.name);

            dispatch({
                type: actions.SAVING_FILES,
                open: false,
                saved: (resSave && resSave.join(', ')) || '',
                rejected: (resReject && resReject.join(', ')) || '',
                reason: 'A file with the same name already exists!',
                serverResponse: true
            });
        }
    } catch (error) {
        dispatch(toggleIsFetching(false));

        if (error && error.response) {
            dispatch({
                type: actions.ERROR_SAVING_FILES,
                open: false,
                serverError: error.response.data.error || 'Something went wrong!'
            });
        }
    }
};
