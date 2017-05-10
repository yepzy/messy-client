import React from 'react';

const User = (props) => {

        return (
            <div className="user">
                <img src={props.image} width="50" height="50" alt={props.name}/>
                <p>{props.name}</p>
            </div>
        );
    }
;

export default User;