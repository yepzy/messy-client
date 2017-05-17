import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

/*
 Store

 Redux apps have a single store which takes
 1. All Reducers which we combined into `rootReducer`
 2. An optional starting state - similar to React's getInitialState
 */

const defaultState = {
    login: {
        notif_login: {
            inProgress: false,
            success: false,
            fail: false,
        },
        notif_logout: false,
        notif_create: {
            inProgress: false,
            success: false,
            fail: false,
        }
    },
    messy: {
        messyEdit: '',
        messys: [],
        notif_fetch: {
            inProgress: false,
            success: false,
            fail: false,
        },
        notif_send: {
            inProgress: false,
            success: false,
            fail: false,
        },
        notif_delete: {
            inProgress: false,
            success: false,
            fail: false,
        },
    }
};

const enhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

// we export history because we need it in `messy-src.js` to feed into <Router>
export const history = syncHistoryWithStore(browserHistory, store);

/*
 Enable Hot Reloading for the reducers
 We re-require() the reducers whenever any new code has been written.
 Webpack will handle the rest
 */

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
