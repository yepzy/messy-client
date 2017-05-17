const Utils = require('../utils/Utils');

function messy (state = [], action) {
    switch (action.type) {
        case 'REQUEST_GET_MESSY' :
            console.log('ACTION | GET MESSY REQUEST ***');
            return Object.assign({}, state, {
                notif_fetch: Utils.inProgressSnippet
            });
            break;
        case 'RECEIVED_GET_MESSY' :
            console.log('ACTION | GET MESSY RECEIVED ***');
            return Object.assign({}, state, {
                messys: action.messys,
                notif_fetch: Utils.successSnippet
            });
            break;
        case 'FAIL_GET_MESSY' :
            console.log('ACTION | GET MESSY FAIL ***');
            return Object.assign({}, state, {
                notif_fetch: Utils.failSnippet
            });
            break;
        case 'REQUEST_WRITE_MESSAGE' :
            console.log('ACTION | WRITE MESSAGE REQUEST ***');
            return Object.assign({}, state, {
                notif_send: Utils.inProgressSnippet
            });
            break;
        case 'RECEIVED_WRITE_MESSAGE' :
            console.log('ACTION | WRITE MESSAGE RECEIVED ***');
            return Object.assign({}, state, {
                messyEdit: '',
                notif_send: Utils.successSnippet
            });
            break;
        case 'FAIL_WRITE_MESSAGE' :
            console.log('ACTION | WRITE MESSAGE FAIL ***');
            return Object.assign({}, state, {
                notif_send: Utils.failSnippet
            });
            break;
        case 'REQUEST_DELETE_MESSAGE' :
            console.log('ACTION | DELETE MESSAGE REQUEST ***');
            return Object.assign({}, state, {
                notif_delete: Utils.inProgressSnippet
            });
            break;
        case 'RECEIVED_DELETE_MESSAGE' :
            console.log('ACTION | DELETE MESSAGE RECEIVED ***');
            return Object.assign({}, state, {
                notif_delete: Utils.successSnippet
            });
            break;
        case 'FAIL_DELETE_MESSAGE' :
            console.log('ACTION | DELETE MESSY FAIL ***');
            return Object.assign({}, state, {
                notif_delete: Utils.failSnippet
            });
            break;
        case 'HIDE_NOTIFICATION_MESSY' :
            console.log('ACTION | HIDE NOTIFICATION MESSY ***');
            return Object.assign({}, state, {
                notif_fetch: Utils.initSnippet,
                notif_send: Utils.initSnippet,
                notif_delete: Utils.initSnippet
            });
            break;
        default:
            return state;
    }
}

export default messy;
