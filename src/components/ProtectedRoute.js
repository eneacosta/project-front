import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} 
    render={props => {
         return getToken() ?
          <Component  {...props} />
          :
          <Redirect to="/" />
      }
    } />
  )
}

export default ProtectedRoute;