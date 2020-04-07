import {AxiosResponse} from 'axios'

import service from '@/service/config'

const AuthService = {
  async login(loginForm: TLoginForm): Promise<AxiosResponse<ILogin>> {
    return await service.post('/login', loginForm)
  },
  async register(registrationForm: TLoginForm): Promise<AxiosResponse<IRegister>> {
    return await service.post('/register', registrationForm)
  }
}

export default AuthService
