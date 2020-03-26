import axios, {AxiosResponse} from 'axios'

const AuthService = {
  login: async (loginForm: TLoginForm): Promise<AxiosResponse<ILogin>> => {
    return await axios.post('/login', loginForm)
  },
  register: async (registerForm: TRegisterForm): Promise<AxiosResponse<IRegister>> => {
    return await axios.post('/register', registerForm)
  }
}

export default AuthService
