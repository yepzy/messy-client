import React from 'react';

const CreateAccount = (props) => {
    let values = {
        login: '',
        password: '',
        image: '',
    };

    const submit = (e) => {
        e.preventDefault();
        props.createAccount(values.login, values.password, values.image);

    };

    const changeValue = (type, value) => values[type] = value;

    return (
        <form onSubmit={submit} className="user-form">
            <label>Login : </label>
            <input type="text" id="login"
                   onChange={e => changeValue('login', e.target.value)}/><br/>
            <label>Password : </label>
            <input type="password" id="password"
                   onChange={e => changeValue('password', e.target.value)}/><br/>
            <label>Url image : </label>
            <input type="text" id="image"
                   onChange={e => changeValue('image', e.target.value)}/><br/>
            <button type="submit">Login</button>
        </form>
    );
};

export default CreateAccount;