import * as actions from '../actions/types';

const initialState = {
    images: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_IMAGES:
            return { ...state, images: action.images };

        case actions.DELETE_IMAGE:
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.payload)
            };

        default:
            return state;
    }
};
