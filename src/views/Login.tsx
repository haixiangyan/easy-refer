import * as React from 'react'
import {useHistory, useLocation} from 'react-router'
import AuthApi from '../api/AuthApi'

const Login: React.FunctionComponent = () => {
  let history = useHistory();
  let location = useLocation();

  const { from } = location.state as any || { from: { pathname: "/" } };
  const login = async () => {
    const response = await AuthApi.login('xxx', 'yyyy')
    console.log(response)
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Login
