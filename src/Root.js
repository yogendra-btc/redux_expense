import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Expense from './expense';
import NewExpense from './add_expense';
import login from './login';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="expense" component={Expense} />
      <Route path="expense/add" component={NewExpense} />
      <Route path="login" component={login} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}   

export default Root
