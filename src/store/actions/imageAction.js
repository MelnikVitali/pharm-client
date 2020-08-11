import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { APIUrls } from '../../configs/APIUrls';

import * as actions from './types';

import { toggleIsFetching } from './toggleIsFetchingActions';

export const getImages = () => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.get(APIUrls.images);

        await dispatch(toggleIsFetching(false));

        const images = res.data.map(image => {
            return {
                img: `data:image/png;base64,${image.base64}`,
                id: image._id,
                imageName: image.imageName,
                originalName: image.originalName
            }
        })

        dispatch({ type: actions.GET_IMAGES, images: images });

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};

export const deleteImage = (id) => async dispatch => {
    try {
        await dispatch(toggleIsFetching(true));

        const res = await axios.delete(`${APIUrls.images}/${id}`);

        if (res) {
            await dispatch(toggleIsFetching(false));
            toast.success(res.data.message);
        }

        await dispatch({ type: actions.DELETE_IMAGE, payload: id });

    } catch (error) {
        dispatch(toggleIsFetching(false));
    }
};
