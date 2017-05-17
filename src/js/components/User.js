import React from 'react';
import PropTypes from 'prop-types';

const User = (props) => {
  return (
    <div className='user'>
      <img src={ props.image } width='50' height='50' alt={ props.name } />
      <p>{ props.name }</p>
    </div>
  );
};

User.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

export default User;
