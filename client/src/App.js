import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/Alert';
import Inbox from './components/users/Inbox';
import PrivateRoute from './components/routing/PrivateRoute';
import Contact from './components/users/Contact';
import { getContactNumber } from './actions/number';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getContactNumber());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/inbox' component={Inbox} />
            <PrivateRoute exact path='/contacts' component={Contact} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
