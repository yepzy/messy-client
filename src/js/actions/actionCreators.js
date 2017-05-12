/**
 Action Creators

 These fire events which the reducer will handle
 We will later call these functions from inside our component

 Later these functions get bound to 'dispatch' fires the actual event
 Right now they just return an object

 It's a code convention to use all capitals and snake case for the event names
 We use const to store the name of the event so it is immutable

 */
const _ = require('lodash');
import moment from 'moment';

export function autoConnect (token,user) {
    return {
        type : 'AUTO_CONNECT',
        token,
        user
    }
}

export function logout () {
    return {
        type: 'LOGOUT'
    };
}

export function createAccount (name, password, image) {
    return (dispatch) => {
        dispatch(request_create_account());

        let data = {
            'name': name, 'password': password, 'image': image
        };
        let url = 'http://tpiut2017.cleverapps.io/join';

        console.log('ACTION | CREATE_ACCOUNT -> data => ', data);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Content-length': data.length
            },
            body: JSON.stringify(data)
        }).then(response => {return response.json();}).then(data => {
            console.log('ACTION | CREATE_ACCOUNT -> response => ', data);
            if (data.token) {
                dispatch(received_create_account(data));
            } else {
                dispatch(fail_create_account());
            }
        }).catch(function (error) {
            console.log('ACTION | CREATE_ACCOUNT -> error => ', error);
            dispatch(fail_create_account());
        });
    };
}
export function request_create_account () {
    return {
        type: 'REQUEST_CREATE_ACCOUNT'
    };
}
export function received_create_account (data) {
    return {
        type: 'RECEIVED_CREATE_ACCOUNT',
        token: data.token,
        user: data.user
    };
}
export function fail_create_account () {
    return {
        type: 'FAIL_CREATE_ACCOUNT'
    };
}

export function login (name, password) {

    return (dispatch) => {
        dispatch(request_login());

        let data = {
            'name': name, 'password': password
        };
        let url = 'http://tpiut2017.cleverapps.io/authenticate';

        console.log('ACTION | LOGIN -> data => ', data);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Content-length': data.length
            },
            body: JSON.stringify(data)
        }).then(response => {return response.json();}).then(data => {
            console.log('ACTION | LOGIN -> response => ', data);
            if (data.token) {
                dispatch(received_login(data));
            } else {
                dispatch(fail_login());
            }
        }).catch((error) => {
            console.log('ACTION | LOGIN -> error => ', error);
            dispatch(fail_login());
        });
    };
}
export function request_login () {
    return {
        type: 'REQUEST_LOGIN'
    };
}
export function received_login (data) {
    return {
        type: 'RECEIVED_LOGIN',
        token: data.token,
        user: data.user
    };
}

export function fail_login () {
    return {
        type: 'FAIL_LOGIN'
    };
}

export function getMessages (token) {

    return (dispatch) => {
        dispatch(request_get_messages());

        let url = 'http://tpiut2017.cleverapps.io/u/timeline';

        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer:' + token
            }
        }).then(response => {return response.json();}).then(data => {
            console.log('ACTION | GET MESSAGES -> response => ', data);
            if (_.isArray(data)) {
                dispatch(received_get_messages(data));
            } else {
                dispatch(fail_get_messages());
            }
        }).catch(function (error) {
            console.log('ACTION | GET MESSAGES -> error => ', error);

            dispatch(fail_get_messages());
        });
    };
}
export function request_get_messages () {
    return {
        type: 'REQUEST_GET_MESSAGES'
    };
}
export function received_get_messages (data) {
    _.map(data, msg => {
        msg.date = moment(msg.date).fromNow();
        return msg;
    });

    let messages = _.orderBy(data,'date','desc');
    return {
        type: 'RECEIVED_GET_MESSAGES',
        messages
    };
}
export function fail_get_messages () {
    return {
        type: 'FAIL_GET_MESSAGES'
    };
}

export function writeMessage (message,token) {
    return (dispatch) => {
        dispatch(request_write_message());

        let data = {
            'message': message
        };
        let url = 'http://tpiut2017.cleverapps.io/u/timeline';

        console.log('ACTION | WRITE MESSAGE -> data => ', data);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Content-length': data.length,
                'Authorization': 'Bearer:' + token
            },
            body: JSON.stringify(data)
        }).then(response => {return response.json();}).then(data => {
            console.log('ACTION | WRITE MESSAGE -> response => ', data);
            if (data.id) {
                dispatch(received_write_message(data));
            } else {
                dispatch(fail_write_message());
            }
        }).catch((error) => {
            console.log('ACTION | WRITE MESSAGE -> error => ', error);
            dispatch(fail_login());
        });
    };
}
export function request_write_message () {
    return {
        type: 'REQUEST_WRITE_MESSAGE'
    };

}
export function received_write_message () {
    return {
        type: 'RECEIVED_WRITE_MESSAGE',

    };
}
export function fail_write_message () {
    return {
        type: 'FAIL_WRITE_MESSAGE'
    };
}

export function deleteMessage (id_message,token) {
    return (dispatch) => {
        dispatch(request_delete_message());

        let url = 'http://tpiut2017.cleverapps.io/u/timeline/'+id_message;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer:' + token
            }
        }).then(response => {
            console.log('ACTION | DELETE MESSAGE -> response => ', response);
            if (response.status === 204) {
                dispatch(received_delete_message('Messy has been send'));
                dispatch(getMessages(token));
            } else {
                dispatch(fail_delete_message());
            }
        }).catch((error) => {
            console.log('ACTION | DELETE MESSAGE -> error => ', error);
            dispatch(fail_delete_message());
        });
    };
}
export function request_delete_message () {
    return {
        type: 'REQUEST_DELETE_MESSAGE'
    };

}
export function received_delete_message (message) {
    return {
        type: 'RECEIVED_DELETE_MESSAGE',
        message

    };
}
export function fail_delete_message () {
    return {
        type: 'FAIL_DELETE_MESSAGE'
    };
}
