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
                // src: `http://localhost:5000/images/${image.imageName}.webp`,
                // bigSrc:  `http://localhost:5000/images/${image.imageName}.webp`,
                // src: `https://pharm-backend.herokuapp.com/images/${image.imageName}.png`,
                // bigSrc:  `https://pharm-backend.herokuapp.com/images/${image.imageName}.png`,
                src: `data:image/webp;base64,${image.base64}`,
                bigSrc:  `data:webp/png;base64,${image.base64}`,
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