import axios, {AxiosResponse} from 'axios'

const AuthService = {
  isLogin: false,
  login: async (loginForm: LoginForm): Promise<AxiosResponse<ILoginData>> => {
    return await axios.post('/login', loginForm)
  }
}

export default AuthService
