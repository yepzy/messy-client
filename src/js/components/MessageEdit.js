import React from 'react';

const MessageEdit = (props) => {
        let message = null;

        const submit = (e) => {
            e.preventDefault();
            props.parent.writeMessage(message, props.parent.token);
            message = '';
            props.parent.getMessages(props.parent.token);
        };

        const changeMsgValue = e => message = e.target.value;

        return (
            <form onSubmit={submit} className="write-form">
                <div>
                    <input type="text" id="write-msg" name="write-msg" value={message} onChange={changeMsgValue}/>
                    <button type="submit"><i className="fa fa-send"></i> </button>
                </div>
            </form>
        );
    }
;

export default MessageEdit;