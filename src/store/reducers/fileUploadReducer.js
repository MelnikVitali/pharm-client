import * as actions from '../actions/types';

const initialState = {
    open: false,
    files: [],
    serverError: null,
    serverResponse: null,
    saved: '',
    rejected: '',
    reason: 'All files with such names already exist!',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_DROPZONE:
            return {
                ...initialState,
                open: true
            };

        case actions.CLOSE_DROPZONE:
            return {
                ...state,
                open: false
            };

        case actions.SAVING_FILES:
            return {
                ...state,
                open: action.open,
                saved: action.saved,
                rejected: action.rejected,
                reason: action.reason,
                serverResponse: action.serverResponse
            };

        case actions.ERROR_SAVING_FILES:
            return {
                ...state,
                open: action.open,
                serverError: action.serverError
            }

        case actions.CLEAR_ALERT:
            return {
                ...initialState
            }

        default:
            return state;
    }
};
