import React from 'react';
import User from './User';

const MessageDisplay = (props) => {
        let deleteBlock = null;

        const deleteMessage = () => {
            props.deleteMessage(props.key, props.parent.token);
        };

        console.log(props.deletable)

        if (props.deletable) {
            deleteBlock = <a onClick={deleteMessage}><i className="fa fa-times"></i></a>;
        }

        return (
            <div className="message">
                <div className="user-block">
                    <User name={props.user.name} image={props.user.image}/>
                </div>
                <div className="content-block">
                    <p>{props.content}</p>
                    <div className="delete-block">
                        {deleteBlock}
                    </div>
                    <div className="date-block">
                        {props.date}
                    </div>
                </div>
            </div>
        );
    }
;

export default MessageDisplay;