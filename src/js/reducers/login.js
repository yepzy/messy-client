function login (state = [], action) {
    switch (action.type) {
        case 'REQUEST_LOGIN' :
            console.log('ACTION | LOGIN REQUEST ***');
            return state;
            break;
        case 'RECEIVED_LOGIN' :
            console.log('ACTION | LOGIN RECEIVED ***');
            sessionStorage.setItem('token',action.token);
            sessionStorage.setItem('user',action.user);
            return Object.assign({}, state, {
                token: action.token,
                user: action.user
            });
            break;
        case 'FAIL_LOGIN' :
            console.log('ACTION | LOGIN FAIL ***');
            return state;
            break;
        case 'LOGOUT' :
            console.log('ACTION | LOGOUT ***');
            return Object.assign({},
                ...state, {token: null,user:null}
            );
            break;

        case
        'REQUEST_CREATE_ACCOUNT':
            console.log('ACTION | CREATE ACCOUNT REQUEST ***');
            return state;
            break;

        case
        'RECEIVED_CREATE_ACCOUNT':
            console.log('ACTION | CREATE ACCOUNT RECEIVED ***');
            sessionStorage.setItem('user',action.user);
            sessionStorage.setItem('token',action.token);
            return Object.assign({}, ...state, {token: action.token,user:action.user});
            break;

        case
        'FAIL_CREATE_ACCOUNT':
            console.log('ACTION | CREATE ACCOUNT FAIL ***');
            return state;
            break;

        case
        'AUTO_CONNECT':
            console.log('ACTION | AUTO CONNECT ***');
            return Object.assign({},...state, {token: action.token,user:action.user});
            break;
        default:
            return state;
    }
}

export default login;
