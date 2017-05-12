import React from 'react';

const MessageEdit = (props) => {

        let input = props.parent.messageEdit;

        const submit = (e) => {
            e.preventDefault();
            props.parent.writeMessage(input, props.parent.token);
            props.parent.getMessages(props.parent.token);
        };

        const changeMsgValue = e => input = e.target.value;

        return (
            <form onSubmit={submit} className="write-form">
                <div>
                    <input type="text" id="write-msg" value={input} onChange={changeMsgValue}/>
                    <button type="submit"><i className="fa fa-send"> </i></button>
                </div>
            </form>
        );
    }
;

export default MessageEdit;