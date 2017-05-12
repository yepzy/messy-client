import React from 'react';

const Login = (props) => {
    let values = {
        login: '',
        password: ''
    };

    if(props.token){
        props.router.push('/messages');
    }

    const submit = (e) => {
        e.preventDefault();
        props.login(values.login, values.password);
    };

    const changeValue = (type, value) => {
        values[type] = value;
    };

    return (
        <form onSubmit={submit} className="user-form">
            <div className="form-group">
                <label>Login : </label>
                <input type="text" id="login" onChange={e => changeValue('login', e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password : </label>
                <input type="password" id="password" onChange={e => changeValue('password', e.target.value)}/>
            </div>
            <div className="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default Login;