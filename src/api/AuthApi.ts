import axios from 'axios'

const AuthApi = {
  async login(email: string, password: string) {
    return await axios.post('/login', {
      email,
      password
    })
  },
  authenticated: false
}

export default AuthApi
