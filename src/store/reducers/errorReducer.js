import * as actions from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ERROR:
            return {
                ...state,
                ...action.payload
            };

        case actions.CLEAR_ERRORS:
            return {};

        default:
            return state;
    }
};

