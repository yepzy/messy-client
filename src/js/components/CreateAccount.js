import React from 'react';
import PropTypes from 'prop-types';

const CreateAccount = (props) => {
  const values = {
    login: '',
    password: '',
    image: '',
  };

  if (props.token) {
    props.router.push('/messys');
  }

  const submit = (e) => {
    e.preventDefault();
    props.createAccount(values.login, values.password, values.image);
  };

  const changeValue = (type, value) => values[type] = value;

  return (
    <form onSubmit={ submit } className='user-form'>
      <div className='form-group'>
        <label htmlFor='login'>Login : </label>
        <input
          type='text'
          id='login'
          onChange={ e => changeValue('login', e.target.value) }
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password : </label>
        <input
          type='password'
          id='password'
          onChange={ e => changeValue('password', e.target.value) }
        />
      </div>
      <div className='form-group'>
        <label htmlFor='image'>Url image : </label>
        <input
          type='text'
          id='image'
          onChange={ e => changeValue('image', e.target.value) }
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <button type='submit'>Create</button>
      </div>
    </form>
  );
};

CreateAccount.propTypes = {
  router: PropTypes.object,
  token: PropTypes.string,
};

export default CreateAccount;
