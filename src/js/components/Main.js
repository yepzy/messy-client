import React from 'react';
import { Link } from 'react-router';

const Main = (props) => {

    let menu = [];
    let login_status = '';

    if (!props.token && sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
        props.autoConnect(sessionStorage.getItem('token'), sessionStorage.getItem('user'));
    }

    const logout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        props.logout();
    };
    const refresh = (e) => {
        e.preventDefault();
        props.getMessages(props.token);
    };

    if (props.token) {
        menu.push(<li key="menu-"><a onClick={refresh}><i className="fa fa-refresh"></i> </a></li>);
        menu.push(<li key="menu-0"><Link to="/messages">List of messy</Link></li>);
        menu.push(<li key="menu-1">
            <a onClick={logout}>Logout</a>
        </li>);
        login_status = <span> - <i className="fa fa-user"></i></span>;
    } else {
        menu.push(<li key="menu-2"><Link to="/sign-in">Sign In</Link></li>);
        menu.push(<li key="menu-3"><Link to="/sign-up">Sign Up</Link></li>);
    }


    return (
        <div className="block">
            <h1 id="title">
                <Link to="/">Messy <i className="fa fa-envelope-o"></i> {login_status}</Link>
            </h1>
            <nav>
                <ul>
                    {menu}
                </ul>
            </nav>

            { React.cloneElement(props.children, props) }
        </div>
    );
};

export default Main;
