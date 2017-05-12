function message (state = [], action) {
    switch (action.type) {
        case 'REQUEST_GET_MESSAGES' :
            console.log('ACTION | GET MESSAGES REQUEST ***');
            return state;
            break;
        case 'RECEIVED_GET_MESSAGES' :
            console.log('ACTION | GET MESSAGES RECEIVED ***');
            return Object.assign({}, ...state, {messages: action.messages});
            break;
        case 'FAIL_GET_MESSAGES' :
            console.log('ACTION | GET MESSAGES FAIL ***');
            return state;
            break;
        case 'REQUEST_WRITE_MESSAGE' :
            console.log('ACTION | WRITE MESSAGE REQUEST ***');
            return state;
            break;
        case 'RECEIVED_WRITE_MESSAGE' :
            console.log('ACTION | WRITE MESSAGE RECEIVED ***');
            return Object.assign({}, ...state, {messageEdit: ''});
            break;
        case 'FAIL_WRITE_MESSAGE' :
            console.log('ACTION | WRITE MESSAGE FAIL ***');
            return state;
            break;
        case 'REQUEST_DELETE_MESSAGE' :
            console.log('ACTION | DELETE MESSAGE REQUEST ***');
            return state;
            break;
        case 'RECEIVED_DELETE_MESSAGE' :
            console.log('ACTION | DELETE MESSAGE RECEIVED ***');
            return state;
            break;
        case 'FAIL_DELETE_MESSAGE' :
            console.log('ACTION | DELETE MESSAGES FAIL ***');
            return state;
            break;
        default:
            return state;
    }
}

export default message;
