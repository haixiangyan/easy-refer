import * as React from 'react'
import {Route, Switch, Redirect} from 'react-router'
import Job from '../views/Job'
import User from '../views/User'
import Application from '../views/Application'
import Public from '../views/Public'

const RouterConfig: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/public">
        <Public/>
      </Route>
      <Route path="/application">
        <Application/>
      </Route>
      <Route path="/job">
        <Job/>
      </Route>
      <Route path="/user">
        <User/>
      </Route>
      <Redirect from="*" to="/public" />
    </Switch>
  )
}

export default RouterConfig
