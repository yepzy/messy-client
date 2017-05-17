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

function mapStateToProps(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    messys: state.messy.messys,
    messyEdit: state.messy.messyEdit,
    loginNotif: {
      login: state.login.notif_login,
      create: state.login.notif_create,
      logout: state.login.notif_logout,
      failArgs: {
        login: state.login.notif_login_fail_args,
        create: state.login.notif_create_fail_args,
      },
    },
    messyNotif: {
      fetch: state.messy.notif_fetch,
      send: state.messy.notif_send,
      delete: state.messy.notif_delete,
      failArgs: {
        fetch: state.messy.notif_fetch_fail_args,
        send: state.messy.notif_send_fail_args,
        delete: state.messy.notif_delete_fail_args,
      },
    },
  };
}

/*
 This will bind our actions to dispatch (make the fire-able)
 and make the actions available via props
 */

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

/*
 Here we create an <App/> component which is just our <Main/> component with it's props
 populated with our actions and our state

 We're injecting the data at the top level and passing it down,
 but you can connect() any component to make the actions and the store available to you.
 */

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
