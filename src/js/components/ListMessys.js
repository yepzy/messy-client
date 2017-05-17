import React from 'react';
import _ from 'lodash';
import MessyEdit from './MessyEdit';
import MessyDisplay from './MessyDisplay';
import jwtDecode from 'jwt-decode';

const ListMessys = (props) => {

        let messys = [];
        let editMessy = null;
        if (props.token) {
            if (!props.messyNotif.fetch.inProgress &&
                _.isArray(props.messys) &&
                _.isEmpty(props.messys)) {
                props.getMessys(props.token);
            } else {
                let user_id = jwtDecode(props.token).id;
                props.messys.map((messy) => {
                    let deletable = messy.user_id === user_id;
                    messys.push(<MessyDisplay key={messy.id}
                                              id={messy.id}
                                              user={messy.user} isMyMessy={deletable}
                                              content={messy.message}
                                              date={messy.date} parent={props}/>);
                });
            }
        } else {
            props.router.push('/');
        }

        return (
            <div className="block-messys">
                <div className="list-messys">
                    {messys}
                </div>
                <MessyEdit messy={editMessy} parent={props}/>
            </div>
        );
    }
;

export default ListMessys;