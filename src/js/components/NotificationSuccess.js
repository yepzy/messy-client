import React from 'react';
import PropTypes from 'prop-types';

const NotificationSuccess = (props) => {
  return (
    <div className='success'>
      { props.text }
    </div>
  );
};

NotificationSuccess.propTypes = {
  text: PropTypes.string,
};

export default NotificationSuccess;
