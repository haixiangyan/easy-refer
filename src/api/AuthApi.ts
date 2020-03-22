import axios, {AxiosResponse} from 'axios'

const AuthApi = {
  async login(email: string, password: string): Promise<AxiosResponse<ILoginData>> {
    return await axios.post('/login', {
      email,
      password
    })
  },
  authenticated: false
}

export default AuthApi
