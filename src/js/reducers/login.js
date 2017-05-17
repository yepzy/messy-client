import Utils from '../utils/Utils';

const debug = require('debug')('reducer');

function login(state = [], action) {
  switch (action.type) {
    case 'REQUEST_LOGIN' :
      debug('ACTION | LOGIN REQUEST ***');
      return Object.assign({}, state, {
        notif_login: Utils.inProgressSnippet,
      });

    case 'RECEIVED_LOGIN' :
      debug(`ACTION | LOGIN RECEIVED *** ${ action.token } ${ action.user }`);
      sessionStorage.setItem('token', action.token);
      sessionStorage.setItem('user', JSON.stringify(action.user));
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        notif_login: Utils.successSnippet,
      });

    case 'FAIL_LOGIN' :
      debug('ACTION | LOGIN FAIL ***');
      return Object.assign({},
        state, {
          notif_login: Utils.failSnippet,
          notif_login_fail_args: action.error,
        }
      );

    case 'LOGOUT' :
      debug('ACTION | LOGOUT ***');
      return Object.assign({},
        state, {
          token: null,
          user: null,
          notif_logout: true,
        }
      );

    case 'REQUEST_CREATE_ACCOUNT':
      debug('ACTION | CREATE ACCOUNT REQUEST ***');
      return Object.assign({}, state, {
        notif_create: Utils.inProgressSnippet,
      });

    case 'RECEIVED_CREATE_ACCOUNT':
      debug(`ACTION | CREATE ACCOUNT RECEIVED *** ${ action.token } ${ action.user }`);
      sessionStorage.setItem('token', action.token);
      sessionStorage.setItem('user', JSON.stringify(action.user));
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        notif_create: Utils.successSnippet,
      });

    case 'FAIL_CREATE_ACCOUNT':
      debug('ACTION | CREATE ACCOUNT FAIL ***');
      return Object.assign({}, state, {
        notif_create: Utils.failSnippet,
        notif_create_fail_args: action.error,
      });

    case 'AUTO_CONNECT':
      debug(`ACTION | AUTO CONNECT *** ${ action.token } ${ action.user }`);
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        notif_login: Utils.successSnippet,
      });

    case 'HIDE_NOTIFICATION_LOGIN' :
      debug('ACTION | HIDE NOTIFICATION LOGIN ***');
      return Object.assign({}, state, {
        notif_login: Utils.initSnippet,
        notif_create: Utils.initSnippet,
        notif_logout: false,
      });

    default:
      return state;
  }
}

export default login;
