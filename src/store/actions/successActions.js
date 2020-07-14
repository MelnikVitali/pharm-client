import * as actions from './types';

export const success = (success) => ({
    type: actions.SUCCESS,
    success
});

export const clearSuccess = () => ({
    type: actions.CLEAR_SUCCESS,
});
