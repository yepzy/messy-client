import React from 'react';
import User from './User';

const MessyDisplay = (props) => {
        let deleteBlock = '';
        let classNames = "messy";

        const deleteMessy = () => {
            props.parent.deleteMessy(props.id, props.parent.token);
        };

        if (props.isMyMessy) {
            deleteBlock = <a onClick={deleteMessy}><i className="fa fa-times"> </i></a>;
            classNames += " own-messy";
        }

        return (
            <div className={classNames}>
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

export default MessyDisplay;