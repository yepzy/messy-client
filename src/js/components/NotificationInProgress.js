import React from 'react';
import PropTypes from 'prop-types';

const NotificationInProgress = (props) => {
  return (
    <div className='progress'>
      { props.text } <i className='fa fa-spinner fa-spin' />
    </div>
  );
};

NotificationInProgress.propTypes = {
  text: PropTypes.string,
};

export default NotificationInProgress;
