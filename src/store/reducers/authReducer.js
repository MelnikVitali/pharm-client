import *as actions from '../actions/types';

const initialState = {
    user: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }

        case actions.LOGOUT_USER:
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
};
