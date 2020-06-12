import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

import reducers from './reducers';

// Create store
export default createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));