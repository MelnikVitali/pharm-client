import { combineReducers } from 'redux';

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import imageReducer from "./imageReducer";
import successReducer from './successReducer';
import toggleIsFetchingReducer from './toggleIsFetchingReducer';

export default combineReducers({
    authReducer,
    postReducer,
    imageReducer,
    errorReducer,
    successReducer,
    toggleIsFetchingReducer
});
