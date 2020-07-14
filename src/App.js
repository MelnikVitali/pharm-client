import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Posts from './components/Posts';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import PostPage from './components/PostPage';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import FileUploader from './components/FileUploader';
import ForgotPassword from './components/ForgotPassword';

import MaterialUI from './components/MaterialUI';

import { APIUrls } from './configs/APIUrls';
import './index.css';
import ResetPassword from './components/ResetPassword';
import EmailConfirmAuth from './components/EmailConfirmAuth/EmailConfirmAuth';

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={APIUrls.homePage} component={Posts} />
                <Route exact path={APIUrls.login} component={Login} />
                <Route exact path={APIUrls.register} component={Register} />
                <Route exact path={APIUrls.logout} component={Logout} />
                <Route exact path={`${APIUrls.post}/:id`} component={PostPage} />
                <Route exact path={APIUrls.addPost} component={AddPost} />
                <Route exact path={`${APIUrls.editPost}/:id`} component={EditPost} />
                <Route exact path={APIUrls.fileUpload} component={FileUploader} />
                <Route exact path={APIUrls.learnMaterialUI} component={MaterialUI} />
                <Route exact path={`${APIUrls.emailActivation}/:id`} component={EmailConfirmAuth} />
                <Route exact path={APIUrls.forgotPassword} component={ForgotPassword} />
                <Route exact path={`${APIUrls.resetPassword}/:token`} component={ResetPassword} />
                <Route path='/' component={NotFound} />
            </Switch>
        </>
    );
};

export default App;
