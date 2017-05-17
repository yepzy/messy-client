/*
 Import Dependencies
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

/*
 Import Components
 */
import App from './components/App';

// Load SCSS
import '../scss/app.scss';

/* Import our data store */
import store, { history } from './store';
import CreateAccount from './components/CreateAccount';
import ListMessys from './components/ListMessys';
import Login from './components/Login';

/*
 Rendering
 This is where we hook up the Store with our actual component and the router
 */

function MainRouting() {
  return (<Provider store={ store }>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={ history }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Login } />
        <Route path='/create' component={ CreateAccount } />
        <Route path='/sign-in' component={ Login } />
        <Route path='/sign-up' component={ CreateAccount } />
        <Route path='/messys' component={ ListMessys } />
      </Route>
    </Router>
  </Provider>);
}
render(<MainRouting />,
  document.getElementById('root')
);

