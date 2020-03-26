import axios, {AxiosResponse} from 'axios'

const UserService = {
  getIntro: async (userId: string): Promise<AxiosResponse<IIntroResponseData>> => {
    return await axios.get('/user/intro', {
      params: {userId}
    })
  },
  getUser: async (userId: string): Promise<AxiosResponse<IUserResponseData>> => {
    return await axios.get('/user/info', {
      params: {userId}
    })
  }
}

export default UserService
