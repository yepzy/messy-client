import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import MessyEdit from './MessyEdit';
import MessyDisplay from './MessyDisplay';

const ListMessys = (props) => {
  const messys = [];
  if (props.token) {
    if (!props.messyNotif.fetch.inProgress &&
      _.isArray(props.messys) &&
      _.isEmpty(props.messys)) {
      props.getMessys(props.token);
    } else {
      const userId = jwtDecode(props.token).id;
      props.messys.map((messy) => {
        const deletable = messy.user_id === userId;
        messys.push(
          <MessyDisplay
            key={ messy.id }
            id={ messy.id }
            user={ messy.user }
            isMyMessy={ deletable }
            content={ messy.message }
            date={ messy.date }
            parent={ props }
          />
        );
        return () => {};
      });
    }
  } else {
    props.router.push('/');
  }

  return (
    <div className='block-messys'>
      <div className='list-messys'>
        { messys }
      </div>
      <MessyEdit parent={ props } />
    </div>
  );
};

ListMessys.propTypes = {
  router: PropTypes.object,
  token: PropTypes.string,
  messys: PropTypes.arrayOf(PropTypes.object),
  getMessys: PropTypes.func,
  messyNotif: PropTypes.object,
};

export default ListMessys;
