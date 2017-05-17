import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuidV4 from 'uuid/v4';
import TextNotif from '../utils/textNotification';
import NotificationSuccess from './NotificationSuccess';
import NotificationInProgress from './NotificationInProgress';
import NotificationFail from './NotificationFail';

const addNotification = (slug, action, notifications, failArgs = null) => {
  const key = uuidV4();
  if (action.success) {
    notifications.push(<NotificationSuccess key={ key } text={ TextNotif[`${ slug }_success`] } />);
  }
  if (action.inProgress) {
    notifications.push(<NotificationInProgress key={ key } text={ TextNotif[`${ slug }_inProgress`] } />);
  }
  if (action.fail) {
    notifications.push(<NotificationFail key={ key } text={ TextNotif[`${ slug }_fail`] } args={ failArgs } />);
  }

  return notifications;
};

const Notification = (props) => {
  const messyNotif = props.parent.messyNotif;
  const loginNotif = props.parent.loginNotif;

  let notifications = [];

  _.forOwn(messyNotif, (action, slug) => {
    const failArgs = messyNotif.failArgs[slug];
    notifications = addNotification(slug, action, notifications, failArgs);
  });

  _.forOwn(loginNotif, (action, slug) => {
    if (_.isObject(action)) {
      const failArgs = loginNotif.failArgs[slug];
      notifications = addNotification(slug, action, notifications, failArgs);
    } else if (action) {
      const key = uuidV4();
      notifications.push(<NotificationSuccess key={ key } text={ TextNotif[`${ slug }_success`] } />);
    }
  });

  return (
    <div className='notification-block'>
      { notifications }
    </div>
  );
};

Notification.propTypes = {
  parent: PropTypes.object,
};

export default Notification;
