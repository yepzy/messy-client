import React from 'react';

const MessyEdit = (props) => {
  let input = '';

  let firstFocus = true;

  const submit = (e) => {
    e.preventDefault();
    props.parent.writeMessy(input, props.parent.token);
  };

  const changeMessyValue = e => input = e.target.value;

  const clear = e => {
    if (firstFocus) {
      const inputClear = e.target;
      inputClear.value = '';
      firstFocus = false;
    }
  };

  return (
    <form onSubmit={ submit } className='write-form'>
      <div>
        <textarea id='write-messy' onChange={ changeMessyValue } onFocus={ clear } />
        <button type='submit'><i className='fa fa-send' /></button>
      </div>
    </form>
  );
};

export default MessyEdit;
