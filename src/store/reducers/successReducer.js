import * as actions from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SUCCESS:
            return {
                ...state,
                ...action.payload
            };

        case actions.CLEAR_SUCCESS:
            return {};

        default:
            return state;
    }
};
