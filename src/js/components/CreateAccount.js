import React from 'react';

const CreateAccount = (props) => {
    let values = {
        login: '',
        password: '',
        image: '',
    };

    if(props.token){
        props.router.push('/messages');
    }

    const submit = (e) => {
        e.preventDefault();
        props.createAccount(values.login, values.password, values.image);

    };

    const changeValue = (type, value) => values[type] = value;

    return (
        <form onSubmit={submit} className="user-form">
            <div className="form-group">
                <label>Login : </label>
                <input type="text" id="login"
                       onChange={e => changeValue('login', e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password : </label>
                <input type="password" id="password"
                       onChange={e => changeValue('password', e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Url image : </label>
                <input type="text" id="image"
                       onChange={e => changeValue('image', e.target.value)}/>
            </div>
            <div className="form-group">
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default CreateAccount;