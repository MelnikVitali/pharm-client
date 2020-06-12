import *as actions from '../actions/types';

const initialState = {
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return { user: action.user };

        default:
            return state;
    }
};