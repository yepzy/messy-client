import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

/*
 Components
 This is where the actual interface / view comes into play
 Everything is in Main - so we import that one
 */

import Main from './Main';


/*
 Here we specify which state needs to be made available to the component
 our state.posts and state.comments will be available via this.props.posts and this.props.comments
 */

function mapStateToProps (state) {
    return {
        token: state.login.token,
        user: state.login.user,
        messages: state.message.messages,
        messageEdit: state.message.messageEdit,
    };
}

/*
 This will bind our actions to dispatch (make the fire-able)
 and make the actions available via props
 */

export function mapDispatchToProps (dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

/*
 Here we create an <App/> component which is just our <Main/> component with it's props
 populated with our actions and our state

 We're injecting the data at the top level and passing it down, but you can connect() any component to make the actions and the store available to you.
 */

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
