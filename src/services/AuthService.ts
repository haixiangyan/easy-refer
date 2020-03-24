import axios, {AxiosResponse} from 'axios'

const AuthService = {
  isLogin: false,
  login: async (loginForm: LoginForm): Promise<AxiosResponse<ILoginResponseData>> => {
    return await axios.post('/login', loginForm)
  },
  register: async (registerForm: RegisterForm): Promise<AxiosResponse<ILoginResponseData>> => {
    return await axios.post('/register', registerForm)
  }
}

export default AuthService
