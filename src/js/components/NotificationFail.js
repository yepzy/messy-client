import React from 'react';
import PropTypes from 'prop-types';

const NotificationFail = (props) => {
  return (
    <div className='fail'>
      <p>{ props.text }</p>
      <small>{ props.args }</small>
    </div>
  );
};

NotificationFail.propTypes = {
  text: PropTypes.string,
  args: PropTypes.string,
};

export default NotificationFail;
