import axios, {AxiosResponse} from 'axios'

const AuthService = {
  isLogin: false,
  login: async (email: string, password: string): Promise<AxiosResponse<ILoginData>> => {
    return await axios.post('/login', {
      email,
      password
    })
  }
}

export default AuthService
