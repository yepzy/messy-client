import React from 'react';
import _ from 'lodash';
import MessageEdit from './MessageEdit';
import MessageDisplay from './MessageDisplay';
import jwtDecode = require('jwt-decode');


const ListMessages = (props) => {

        let messages = [];
        let editMessage = null;

        if (props.token && _.isEmpty(props.messages)) {
            props.getMessages(props.token);
        } else if (_.isEmpty(props.messages)) {
            props.router.push('/');
        }

        if (!_.isUndefined(props.messages) && _.isArray(props.messages)) {
            props.messages.map((msg) => {
                let user_id =
                console.log(" msg ",msg.user_id," user ",props.user_id);
                let deletable = msg.user_id === props.user_id;
                messages.push(<MessageDisplay key={msg.id} user={msg.user} deletable={deletable} content={msg.message}
                                              date={msg.date} parent={props}/>);
            });
        }

        return (
            <div className="block-messages">
                <div className="list-messages">
                    {messages}
                </div>
                <MessageEdit message={editMessage} parent={props}/>
            </div>
        );
    }
;

export default ListMessages;