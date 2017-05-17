import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const nextRootReducer = rootReducer.default;

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
    notif_login_fail_args: [],
    notif_create: {
      inProgress: false,
      success: false,
      fail: false,
    },
    notif_create_fail_args: [],
    notif_logout: false,
  },
  messy: {
    messyEdit: '',
    messys: [],
    notif_fetch: {
      inProgress: false,
      success: false,
      fail: false,
    },
    notif_fetch_fail_args: [],
    notif_send: {
      inProgress: false,
      success: false,
      fail: false,
    },
    notif_send_fail_args: [],
    notif_delete: {
      inProgress: false,
      success: false,
      fail: false,
    },
    notif_delete_fail_args: [],
  },
};

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

// we export history because we need it in `messy-src.js` to feed into <Router>
export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
