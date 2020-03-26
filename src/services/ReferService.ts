import axios, {AxiosResponse} from 'axios'

const RefersService = {
  getRefers: async (userId: string, page: number): Promise<AxiosResponse<IGetRefers>> => {
    return await axios.get('/refer', {
      params: {userId, page}
    })
  },
}

export default RefersService
