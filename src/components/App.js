import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Posts from './Posts/Posts';
import NotFound from './NotFound/NotFound';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';


const App = () => {
    return (
        <div>
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Posts} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/' component={NotFound} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
