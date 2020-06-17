import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { resetTokenAndReattemptRequest} from '../helpers/authorization';

import reducers from './reducers';
import { history } from '../helpers/history';

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const originalRequest = error.config;
    // if (error.response.status === 401 && originalRequest.url === '/refresh-tokens') {
    //     history.push('/login');
    //
    //     return Promise.reject(error);
    // }

    if (error.response && error.response.status === 401) {
        originalRequest._retry = true;

            toast.error("Unauthorized");

        return resetTokenAndReattemptRequest(error);
    }

    if( error.response && error.response.status === 404){
        history.push('/notfound');
    }

    if(error.response.status === 500){
        toast.error('Ошибка сервера - проверьте терминал для получения дополнительной информации!');
    }

    if(error.response.status === 429){
        toast.error('Слишком много аккаунтов создано с этого IP, повторите попытку через 15 минут');
    }

    return Promise.reject(error);
});



// Create store
export default createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);
