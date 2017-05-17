import { combineReducers } from 'redux';

/*
 Reducers
 */

import { routerReducer } from 'react-router-redux'; // we need this for react-router
import login from './login';
import messy from './messy';

// Combine all our reducers togeher
const rootReducer = combineReducers({ login, messy, routing: routerReducer });

export default rootReducer;
