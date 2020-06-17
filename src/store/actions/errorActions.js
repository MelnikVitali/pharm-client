import * as actions from './types';

export const error = (error) => ({
    type: actions.ERROR,
    error
});

export const clearErrors = () => ({
    type: actions.CLEAR_ERRORS,
});
