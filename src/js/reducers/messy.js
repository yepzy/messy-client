import Utils from '../utils/Utils';

const debug = require('debug')('reducer');

function messy(state = [], action) {
  switch (action.type) {
    case 'REQUEST_GET_MESSY' :
      debug('ACTION | GET MESSY REQUEST ***');
      return Object.assign({}, state, {
        notif_fetch: Utils.inProgressSnippet,
      });

    case 'RECEIVED_GET_MESSY' :
      debug(`ACTION | GET MESSY RECEIVED *** ${ action.messys.toString() }`);
      return Object.assign({}, state, {
        messys: action.messys,
        notif_fetch: Utils.successSnippet,
      });

    case 'FAIL_GET_MESSY' :
      debug('ACTION | GET MESSY FAIL ***');
      return Object.assign({}, state, {
        notif_fetch: Utils.failSnippet,
        notif_fetch_fail_args: action.error,
      });

    case 'REQUEST_WRITE_MESSAGE' :
      debug('ACTION | WRITE MESSAGE REQUEST ***');
      return Object.assign({}, state, {
        notif_send: Utils.inProgressSnippet,
      });

    case 'RECEIVED_WRITE_MESSAGE' :
      debug('ACTION | WRITE MESSAGE RECEIVED ***');
      return Object.assign({}, state, {
        notif_send: Utils.successSnippet,
      });

    case 'FAIL_WRITE_MESSAGE' :
      debug('ACTION | WRITE MESSAGE FAIL ***');
      return Object.assign({}, state, {
        notif_send: Utils.failSnippet,
        notif_send_fail_args: action.error,
      });

    case 'REQUEST_DELETE_MESSAGE' :
      debug('ACTION | DELETE MESSAGE REQUEST ***');
      return Object.assign({}, state, {
        notif_delete: Utils.inProgressSnippet,
      });

    case 'RECEIVED_DELETE_MESSAGE' :
      debug('ACTION | DELETE MESSAGE RECEIVED ***');
      return Object.assign({}, state, {
        notif_delete: Utils.successSnippet,
      });

    case 'FAIL_DELETE_MESSAGE' :
      debug('ACTION | DELETE MESSY FAIL ***');
      return Object.assign({}, state, {
        notif_delete: Utils.failSnippet,
        notif_delete_fail_args: action.error,
      });

    case 'HIDE_NOTIFICATION_MESSY' :
      debug('ACTION | HIDE NOTIFICATION MESSY ***');
      return Object.assign({}, state, {
        notif_fetch: Utils.initSnippet,
        notif_send: Utils.initSnippet,
        notif_delete: Utils.initSnippet,
      });

    default:
      return state;
  }
}

export default messy;
