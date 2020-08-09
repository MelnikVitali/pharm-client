import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EmailConfirmAuth from './components/EmailConfirmAuth/EmailConfirmAuth';
import PostPage from './pages/PostPage';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Gallery from './pages/Gallery';
import FileUploader from './pages/FileUploader';

import { APIUrls } from './configs/APIUrls';

import './index.css';

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={APIUrls.homePage} component={Posts} />
                <Route exact path={APIUrls.login} component={Login} />
                <Route exact path={APIUrls.register} component={Register} />
                <Route exact path={APIUrls.logout} component={Logout} />
                <Route exact path={`${APIUrls.post}/:id`} component={PostPage} />
                <Route exact path={`${APIUrls.editPost}/:id`} component={EditPost} />
                <Route exact path={APIUrls.addPost} component={AddPost} />
                <Route exact path={APIUrls.fileUpload} component={FileUploader} />
                <Route exact path={APIUrls.images} component={Gallery} />
                <Route exact path={APIUrls.forgotPassword} component={ForgotPassword} />
                <Route path={`${APIUrls.resetPassword}`} component={ResetPassword} />
                <Route path={`${APIUrls.emailActivation}`} component={EmailConfirmAuth} />
                <Route exact path={`${APIUrls.notfound}`} component={NotFound} />
                <Route path='/' component={NotFound} />
            </Switch>
        </>
    );
};

export default App;
