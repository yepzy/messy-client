import React from 'react';
import _ from 'lodash';
const uuidV4 = require('uuid/v4');
const TextNotif = require('../utils/text_notification');
import NotificationSuccess from './NotificationSuccess';
import NotificationInProgress from './NotificationInProgress';
import NotificationFail from './NotificationFail';

const Notification = (props) => {
        let messyNotif = props.parent.messyNotif;
        let loginNotif = props.parent.loginNotif;

        let notifications = [];

        _.forOwn(messyNotif, (action, slug) => {
            let key = uuidV4();
            if (action.success) {
                notifications.push(<NotificationSuccess key={key} text={TextNotif[slug + '_success']}/>);
            }
            if (action.inProgress) {
                notifications.push(<NotificationInProgress key={key} text={TextNotif[slug + '_inProgress']}/>);
            }
            if (action.fail) {
                notifications.push(<NotificationFail key={key} text={TextNotif[slug + '_fail']}/>);
            }
        });

        _.forOwn(loginNotif, (action, slug) => {
            let key = uuidV4();
            if (_.isObject(action)) {
                if (action.success) {
                    notifications.push(<NotificationSuccess key={key} text={TextNotif[slug + '_success']}/>);
                }
                if (action.inProgress) {
                    notifications.push(<NotificationInProgress key={key} text={TextNotif[slug + '_inProgress']}/>);
                }
                if (action.fail) {
                    notifications.push(<NotificationFail key={key} text={TextNotif[slug + '_fail']}/>);
                }
            } else if (action) {
                notifications.push(<NotificationSuccess key={key} text={TextNotif[slug + '_success']}/>);
            }
        });

        return (
            <div className="notification-block">
                {notifications}
            </div>
        );
    }
;

export default Notification;
