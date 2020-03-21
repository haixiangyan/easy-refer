import * as React from 'react'
import {useHistory, useLocation} from 'react-router'
import fakeAuth from '../router/auth'

const Login: React.FunctionComponent = () => {
  let history = useHistory();
  let location = useLocation();

  const { from } = location.state as any || { from: { pathname: "/" } };
  const login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Login
