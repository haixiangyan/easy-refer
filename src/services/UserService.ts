import axios, {AxiosResponse} from 'axios'

const UserService = {
  getIntro: async (userId: string): Promise<AxiosResponse<IIntroResponseData>> => {
    return await axios.get(`/user/intro?userId=${userId}`)
  },
}

export default UserService
