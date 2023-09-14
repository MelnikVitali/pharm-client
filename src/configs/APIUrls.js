const API_URL = (process.env.NODE_ENV === "production") ? process.env.REACT_APP_baseURL : 'http://localhost:5000';

export const APIUrls = {
    baseGetImage: `${API_URL}/images`,
    register: `${API_URL}/register`,
    login: `${API_URL}/login`,
    logout: `${API_URL}/logout`,
    fileUpload: `${API_URL}/content`,
    images: `${API_URL}/pictures`,
    addPost: `${API_URL}/add`,
    editPost: `${API_URL}/edit`,
    post: `${API_URL}/post`,
    posts: `${API_URL}/posts`,
    refreshTokens: `${API_URL}/refresh-tokens`,
    forgotPassword: `${API_URL}/forgot-password`,
    resetPassword: `${API_URL}/reset-password`,
    emailActivation: `${API_URL}/email-activation`,
    repeatEmailActivation: `${API_URL}/repeat-email`,
    googleLogin: `${API_URL}/google-login`,
    facebookLogin: `${API_URL}/facebook-login`
};