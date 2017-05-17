import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Notification from './Notification';

const Main = (props) => {
  const menu = [];
  let loginStatus = '';

  if (_.isUndefined(props.token) && sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
    props.autoConnect(sessionStorage.getItem('token'), JSON.parse(sessionStorage.getItem('user')));
  }

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    props.logout();
  };
  const refresh = (e) => {
    e.preventDefault();
    props.getMessys(props.token);
  };

  if (props.token) {
    menu.push(<li key='menu-refresh'><button onClick={ refresh }><i className='fa fa-refresh' /> </button></li>);
    menu.push(<li key='menu-0'><Link to='/messys'>List of messy</Link></li>);
    menu.push(<li key='menu-1'><button onClick={ logout }>Logout</button></li>);
    loginStatus = <span> - <i className='fa fa-user' /></span>;
  } else {
    menu.push(<li key='menu-2'><Link to='/sign-in'>Sign In</Link></li>);
    menu.push(<li key='menu-3'><Link to='/sign-up'>Sign Up</Link></li>);
  }

  return (
    <div className='block'>
      <h1 id='title'>
        <Link to='/'>Messy <i className='fa fa-envelope-o' /> {loginStatus}</Link>
      </h1>
      <nav>
        <ul>
          {menu}
        </ul>
      </nav>

      <Notification parent={ props } />

      { React.cloneElement(props.children, props) }
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  getMessys: PropTypes.func,
  autoConnect: PropTypes.func,
  token: PropTypes.string,
};

export default Main;
