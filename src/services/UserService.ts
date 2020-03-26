import axios, {AxiosResponse} from 'axios'

const UserService = {
  getIntro: async (userId: string): Promise<AxiosResponse<IIntro>> => {
    return await axios.get('/user/intro', {
      params: {userId}
    })
  },
  getUser: async (userId: string): Promise<AxiosResponse<IUser>> => {
    return await axios.get('/user/info', {
      params: {userId}
    })
  },
  editUser: async (user: TUser): Promise<AxiosResponse<IUser>> => {
    return await axios.post('/user/info', user)
  }
}

export default UserService
