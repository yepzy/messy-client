import React from 'react';

const MessyEdit = (props) => {

        let input = props.parent.messyEdit;

        let firstFocus = true;

        const submit = (e) => {
            e.preventDefault();
            props.parent.writeMessy(input, props.parent.token);
        };

        const changeMessyValue = e => input = e.target.value;

        const clear = e => {
            if(firstFocus)
                e.target.value = "";
        };

        return (
            <form onSubmit={submit} className="write-form">
                <div>
                    <textarea id="write-messy" onChange={changeMessyValue} onFocus={clear}>
                    </textarea>
                    <button type="submit"><i className="fa fa-send"> </i></button>
                </div>
            </form>
        );
    }
;

export default MessyEdit;