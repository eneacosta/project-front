import React from 'react';
import Dashboard  from './Dashboard';
import SignIn from './views/SignIn';
import { Router, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import history from './history';

export default function App() {
  return (
  <Router history={history}>
    <Route exact path='/' component={SignIn} />
    <ProtectedRoute path='/dashboard' component={Dashboard} />
  </Router>
  );
}
