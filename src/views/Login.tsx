import * as React from 'react'
import {useHistory, useLocation} from 'react-router'
import AuthApi from '../api/AuthApi'
import {message} from 'antd'

const Login: React.FunctionComponent = () => {
  let history = useHistory();
  let location = useLocation();

  const { from } = location.state as any || { from: { pathname: "/" } };

  const login = async () => {
    try {
      const {data} = await AuthApi.login('xxx', 'yyyy')

      AuthApi.authenticated = data.success

      if (AuthApi.authenticated) {
        history.replace(from)
      } else {
        message.error(data.message)
      }
    } catch (error) {
      message.error(error)
    }
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Login
