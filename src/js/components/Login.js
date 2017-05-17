import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  const values = {
    login: '',
    password: '',
  };

  if (props.token) {
    props.router.push('/messys');
  }

  const submit = (e) => {
    e.preventDefault();
    props.login(values.login, values.password);
  };

  const changeValue = (type, value) => {
    values[type] = value;
  };

  return (
    <form onSubmit={ submit } className='user-form'>
      <div className='form-group'>
        <label htmlFor='login'>Login : </label>
        <input type='text' id='login' onChange={ e => changeValue('login', e.target.value) } autoComplete='off' />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password : </label>
        <input type='password' id='password' onChange={ e => changeValue('password', e.target.value) } />
      </div>
      <div className='form-group'>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

Login.propTypes = {
  router: PropTypes.object,
  token: PropTypes.string,

};

export default Login;
