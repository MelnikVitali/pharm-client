import * as actions from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_IMAGES:
            return { ...state, images: action.images };

        default:
            return state;
    }
};
