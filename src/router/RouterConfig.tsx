import * as React from 'react'
import PrivateRoute from './PrivateRoute'
import Job from '../views/Job'
import User from '../views/User'
import Application from '../views/Application'
import Public from '../views/Public'
import Login from '../views/Login'

import {Route, Switch, Redirect} from 'react-router'
const RouterConfig: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/public">
        <Public/>
      </Route>
      <PrivateRoute path="/application">
        <Application/>
      </PrivateRoute>
      <PrivateRoute path="/job">
        <Job/>
      </PrivateRoute>
      <PrivateRoute path="/user">
        <User/>
      </PrivateRoute>
      <Redirect from="*" to="/public" />
    </Switch>
  )
}

export default RouterConfig
