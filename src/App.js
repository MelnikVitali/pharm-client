import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Logout from './components/Logout';
import Register from './pages/Register';
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

import { RoutesUrls } from './configs/RoutesUrls';

import './index.css';

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={RoutesUrls.homePage} component={Posts} />
                <Route exact path={RoutesUrls.login} component={Login} />
                <Route exact path={RoutesUrls.register} component={Register} />
                <Route exact path={RoutesUrls.logout} component={Logout} />
                <Route exact path={`${RoutesUrls.post}/:id`} component={PostPage} />
                <Route exact path={`${RoutesUrls.editPost}/:id`} component={EditPost} />
                <Route exact path={RoutesUrls.addPost} component={AddPost} />
                <Route exact path={RoutesUrls.fileUpload} component={FileUploader} />
                <Route exact path={RoutesUrls.images} component={Gallery} />
                <Route exact path={RoutesUrls.forgotPassword} component={ForgotPassword} />
                <Route path={`${RoutesUrls.resetPassword}`} component={ResetPassword} />
                <Route path={`${RoutesUrls.emailActivation}`} component={EmailConfirmAuth} />
                <Route exact path={`${RoutesUrls.notfound}`} component={NotFound} />
                <Route path='/' component={NotFound} />
            </Switch>
        </>
    );
};

export default App;
