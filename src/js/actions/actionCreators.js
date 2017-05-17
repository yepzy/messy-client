/**
 Action Creators

 These fire events which the reducer will handle
 We will later call these functions = require(inside our component

 Later these functions get bound to 'dispatch' fires the actual event
 Right now they just return an object

 It's a code convention to use all capitals and snake case for the event names
 We use const to store the name of the event so it is immutable

 */
import _ from 'lodash';
import moment from 'moment';

const debug = require('debug')('action');

const timeoutHideNotif = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HIDE_NOTIFICATION_LOGIN',
    });
    dispatch({
      type: 'HIDE_NOTIFICATION_MESSY',
    });
  }, 5000);
};

export function autoConnect(token, user) {
  return (dispatch) => {
    dispatch({
      type: 'AUTO_CONNECT',
      token,
      user,
    });
    timeoutHideNotif(dispatch);
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
    timeoutHideNotif(dispatch);
  };
}

export function requestCreateAccount() {
  return {
    type: 'REQUEST_CREATE_ACCOUNT',
  };
}
export function failCreateAccount(error) {
  return {
    type: 'FAIL_CREATE_ACCOUNT',
    error,
  };
}
export function receivedCreateAccount(data) {
  return {
    type: 'RECEIVED_CREATE_ACCOUNT',
    token: data.token,
    user: data.user,
  };
}
export function createAccount(name, password, image) {
  return (dispatch) => {
    dispatch(requestCreateAccount());

    const data = {
      'name': name,
      'password': password,
      'image': image,
    };
    const url = 'http://tpiut2017.cleverapps.io/join';

    debug('ACTION | CREATE_ACCOUNT -> data => ', data);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': data.length,
      },
      body: JSON.stringify(data),
    }).then(response => { return response.json(); }).then(respData => {
      debug('ACTION | CREATE_ACCOUNT -> response => ', respData);
      if (respData.token) {
        dispatch(receivedCreateAccount(respData));
      } else {
        dispatch(failCreateAccount(respData.error));
      }
      timeoutHideNotif(dispatch);
    }).catch(error => {
      debug('ACTION | CREATE_ACCOUNT -> error => ', error);
      dispatch(failCreateAccount(error.error));
      timeoutHideNotif(dispatch);
    });
  };
}

export function requestLogin() {
  return {
    type: 'REQUEST_LOGIN',
  };
}
export function failLogin(error) {
  return {
    type: 'FAIL_LOGIN',
    error,
  };
}
export function receivedLogin(data) {
  return {
    type: 'RECEIVED_LOGIN',
    token: data.token,
    user: data.user,
  };
}
export function login(name, password) {
  return (dispatch) => {
    dispatch(requestLogin());

    const data = {
      'name': name,
      'password': password,
    };
    const url = 'http://tpiut2017.cleverapps.io/authenticate';

    debug('ACTION | LOGIN -> data => ', data);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': data.length,
      },
      body: JSON.stringify(data),
    }).then(response => { return response.json(); }).then(respData => {
      debug('ACTION | LOGIN -> response => ', respData);
      if (respData.token) {
        dispatch(receivedLogin(respData));
      } else {
        dispatch(failLogin(respData.error));
      }
      timeoutHideNotif(dispatch);
    }).catch((error) => {
      debug('ACTION | LOGIN -> error => ', error);
      dispatch(failLogin(error.error));
      timeoutHideNotif(dispatch);
    });
  };
}

export function requestGetMessys() {
  return {
    type: 'REQUEST_GET_MESSY',
  };
}
export function failGetMessys(error) {
  return {
    type: 'FAIL_GET_MESSY',
    error,
  };
}
export function receivedGetMessys(data) {
  const copyData = _.clone(data, true);
  _.map(copyData, messy => {
    const messyTmp = messy;
    messyTmp.date = moment(messyTmp.date).valueOf();
    return messyTmp;
  });

  const messys = _.orderBy(copyData, 'date', 'desc');
  _.map(messys, messy => {
    const messyTmp = messy;
    messyTmp.date = moment(messyTmp.date).fromNow();
    return messyTmp;
  });
  return {
    type: 'RECEIVED_GET_MESSY',
    messys,
  };
}
export function getMessys(token) {
  return (dispatch) => {
    dispatch(requestGetMessys());

    const url = 'http://tpiut2017.cleverapps.io/u/timeline';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer:${ token }`,
      },
    }).then(response => { return response.json(); }).then(respData => {
      debug('ACTION | GET MESSY -> response => ', respData);
      if (_.isArray(respData)) {
        dispatch(receivedGetMessys(respData));
      } else {
        dispatch(failGetMessys(respData.error));
      }
      timeoutHideNotif(dispatch);
    }).catch(error => {
      debug('ACTION | GET MESSY -> error => ', error);
      dispatch(failGetMessys(error.error));
      timeoutHideNotif(dispatch);
    });
  };
}

export function requestWriteMessy() {
  return {
    type: 'REQUEST_WRITE_MESSAGE',
  };
}
export function failWriteMessy(error) {
  return {
    type: 'FAIL_WRITE_MESSAGE',
    error,
  };
}
export function receivedWriteMessy() {
  return {
    type: 'RECEIVED_WRITE_MESSAGE',
  };
}
export function writeMessy(messy, token) {
  return (dispatch) => {
    dispatch(requestWriteMessy());

    const data = {
      'message': messy,
    };
    const url = 'http://tpiut2017.cleverapps.io/u/timeline';

    debug('ACTION | WRITE MESSAGE -> data => ', data);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': data.length,
        'Authorization': `Bearer:${ token }`,
      },
      body: JSON.stringify(data),
    }).then(response => { return response.json(); }).then(respData => {
      debug('ACTION | WRITE MESSAGE -> response => ', respData);
      if (respData.id) {
        dispatch(receivedWriteMessy(respData));
        dispatch(getMessys(token));
      } else {
        dispatch(failWriteMessy(respData.error));
      }
      timeoutHideNotif(dispatch);
    }).catch((error) => {
      debug('ACTION | WRITE MESSAGE -> error => ', error);
      dispatch(failLogin(error.error));
      timeoutHideNotif(dispatch);
    });
  };
}

export function requestDeleteMessy() {
  return {
    type: 'REQUEST_DELETE_MESSAGE',
  };
}
export function failDeleteMessy(error) {
  return {
    type: 'FAIL_DELETE_MESSAGE',
    error,
  };
}
export function receivedDeleteMessy(messy) {
  return {
    type: 'RECEIVED_DELETE_MESSAGE',
    messy,
  };
}
export function deleteMessy(idMessy, token) {
  return (dispatch) => {
    dispatch(requestDeleteMessy());

    const url = `http://tpiut2017.cleverapps.io/u/timeline/${ idMessy }`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer:${ token }`,
      },
    }).then(response => {
      debug('ACTION | DELETE MESSAGE -> response => ', response);
      if (response.status === 204) {
        dispatch(receivedDeleteMessy('Messy has been send'));
        dispatch(getMessys(token));
      } else {
        dispatch(failDeleteMessy(response.error));
      }
    }).catch((error) => {
      debug('ACTION | DELETE MESSAGE -> error => ', error);
      dispatch(failDeleteMessy(error.error));
      timeoutHideNotif(dispatch);
    });
  };
}
