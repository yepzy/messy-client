const Utils = require('../utils/Utils');
function login (state = [], action) {
    switch (action.type) {
        case 'REQUEST_LOGIN' :
            console.log('ACTION | LOGIN REQUEST ***');
            return Object.assign({}, state, {
                notif_login: Utils.inProgressSnippet
            });
            break;
        case 'RECEIVED_LOGIN' :
            console.log('ACTION | LOGIN RECEIVED ***');
            sessionStorage.setItem('token', action.token);
            sessionStorage.setItem('user', JSON.stringify(action.user));
            return Object.assign({}, state, {
                token: action.token,
                user: action.user,
                notif_login: Utils.successSnippet
            });
            break;
        case 'FAIL_LOGIN' :
            console.log('ACTION | LOGIN FAIL ***');
            return Object.assign({},
                state, {
                    notif_login: Utils.failSnippet
                }
            );
            break;
        case 'LOGOUT' :
            console.log('ACTION | LOGOUT ***');
            return Object.assign({},
                state, {
                    token: null,
                    user: null,
                    notif_logout: true
                }
            );
            break;
        case 'REQUEST_CREATE_ACCOUNT':
            console.log('ACTION | CREATE ACCOUNT REQUEST ***');
            return Object.assign({}, state, {
                notif_create: Utils.inProgressSnippet
            });
            break;
        case 'RECEIVED_CREATE_ACCOUNT':
            console.log('ACTION | CREATE ACCOUNT RECEIVED ***');
            sessionStorage.setItem('token', action.token);
            sessionStorage.setItem('user', JSON.stringify(action.user));
            return Object.assign({}, state, {
                token: action.token,
                user: action.user,
                notif_create: Utils.successSnippet
            });
            break;
        case 'FAIL_CREATE_ACCOUNT':
            console.log('ACTION | CREATE ACCOUNT FAIL ***');
            return Object.assign({}, state, {
                notif_create: Utils.failSnippet
            });
            break;
        case 'AUTO_CONNECT':
            console.log('ACTION | AUTO CONNECT ***');
            return Object.assign({}, state, {
                token: action.token,
                user: action.user,
                notif_login: Utils.successSnippet
            });
            break;
        case 'HIDE_NOTIFICATION_LOGIN' :
            console.log('ACTION | HIDE NOTIFICATION LOGIN ***');
            return Object.assign({}, state, {
                notif_login: Utils.initSnippet,
                notif_create: Utils.initSnippet,
                notif_logout: false
            });
            break;
        default:
            return state;
    }
}

export default login;
