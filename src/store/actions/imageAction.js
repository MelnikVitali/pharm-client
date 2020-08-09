import axios from 'axios';

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
                src: `${APIUrls.baseGetImage}/${image.imageName}.png`,
                bigSrc: `${APIUrls.baseGetImage}/${image.imageName}.png`,
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