import React from 'react';

const NotificationInProgress = (props) => {

        return (
            <div className="progress">
                {props.text} <i className="fa fa-spinner fa-spin"> </i>
            </div>
        );
    }
;

export default NotificationInProgress;
