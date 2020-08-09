import * as actions from './types';

export const toggleIsFetching = (isFetching) => ({
    type: actions.TOGGLE_IS_FETCHING,
    payload: isFetching
});
