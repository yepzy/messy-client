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

const timeoutHideNotif = (dispatch) => {
    setTimeout(() => {
        dispatch({type: 'HIDE_NOTIFICATION_LOGIN'});
        dispatch({type: 'HIDE_NOTIFICATION_MESSY'});
    }, 5000);
};

export function autoConnect (token, user) {
    return (dispatch) => {
        dispatch({
            type: 'AUTO_CONNECT',
            token,
            user
        });
        timeoutHideNotif(dispatch);
    };
}

export function logout () {
    return (dispatch) => {
        dispatch({type: 'LOGOUT'});
        timeoutHideNotif(dispatch);
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
            timeoutHideNotif(dispatch);
        }).catch(function (error) {
            console.log('ACTION | CREATE_ACCOUNT -> error => ', error);
            dispatch(fail_create_account());
            timeoutHideNotif(dispatch);
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
            timeoutHideNotif(dispatch);
        }).catch((error) => {
            console.log('ACTION | LOGIN -> error => ', error);
            dispatch(fail_login());
            timeoutHideNotif(dispatch);
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
export function fail_login (error) {
    return {
        type: 'FAIL_LOGIN',
        error
    };
}

export function getMessys (token) {

    return (dispatch) => {
        dispatch(request_get_messys());

        let url = 'http://tpiut2017.cleverapps.io/u/timeline';

        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer:' + token
            }
        }).then(response => {return response.json();}).then(data => {
            console.log('ACTION | GET MESSY -> response => ', data);
            if (_.isArray(data)) {
                dispatch(received_get_messys(data));
            } else {
                dispatch(fail_get_messys());
            }
            timeoutHideNotif(dispatch);
        }).catch(function (error) {
            console.log('ACTION | GET MESSY -> error => ', error);
            dispatch(fail_get_messys());
            timeoutHideNotif(dispatch);
        });
    };
}
export function request_get_messys () {
    return {
        type: 'REQUEST_GET_MESSY'
    };
}
export function received_get_messys (data) {
    _.map(data, messy => {
        messy.date = moment(messy.date).valueOf();
        return messy;
    });

    let messys = _.orderBy(data, 'date', 'desc');
    _.map(messys, messy => {
        messy.date = moment(messy.date).fromNow();
        return messy;
    });
    return {
        type: 'RECEIVED_GET_MESSY',
        messys
    };
}
export function fail_get_messys (error) {
    return {
        type: 'FAIL_GET_MESSY',
        error
    };
}

export function writeMessy (messy, token) {
    return (dispatch) => {
        dispatch(request_write_messy());

        let data = {
            'message': messy
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
                dispatch(received_write_messy(data));
                dispatch(getMessys(token));
            } else {
                dispatch(fail_write_messy());
            }
            timeoutHideNotif(dispatch);
        }).catch((error) => {
            console.log('ACTION | WRITE MESSAGE -> error => ', error);
            dispatch(fail_login(error.error));
            timeoutHideNotif(dispatch);
        });
    };
}
export function request_write_messy () {
    return {
        type: 'REQUEST_WRITE_MESSAGE'
    };

}
export function received_write_messy () {
    return {
        type: 'RECEIVED_WRITE_MESSAGE',

    };
}
export function fail_write_messy (error) {
    return {
        type: 'FAIL_WRITE_MESSAGE',
        error
    };
}

export function deleteMessy (id_messy, token) {
    return (dispatch) => {
        dispatch(request_delete_messy());

        let url = 'http://tpiut2017.cleverapps.io/u/timeline/' + id_messy;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer:' + token
            }
        }).then(response => {
            console.log('ACTION | DELETE MESSAGE -> response => ', response);
            if (response.status === 204) {
                dispatch(received_delete_messy('Messy has been send'));
                dispatch(getMessys(token));
            } else {
                dispatch(fail_delete_messy());
            }
        }).catch((error) => {
            console.log('ACTION | DELETE MESSAGE -> error => ', error);
            dispatch(fail_delete_messy());
            timeoutHideNotif(dispatch);
        });
    };
}
export function request_delete_messy () {
    return {
        type: 'REQUEST_DELETE_MESSAGE'
    };

}
export function received_delete_messy (messy) {
    return {
        type: 'RECEIVED_DELETE_MESSAGE',
        messy

    };
}
export function fail_delete_messy (error) {
    return {
        type: 'FAIL_DELETE_MESSAGE',
        error
    };
}


