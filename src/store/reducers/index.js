import { combineReducers } from 'redux';

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import fileUploadReducer from "./fileUploadReducer";
import postReducer from "./postReducer";
import imageReducer from "./imageReducer";
import successReducer from './successReducer';
import toggleIsFetchingReducer from './toggleIsFetchingReducer';

export default combineReducers({
    authReducer,
    postReducer,
    fileUploadReducer,
    imageReducer,
    errorReducer,
    successReducer,
    toggleIsFetchingReducer
});
