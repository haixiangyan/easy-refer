import axios, {AxiosResponse} from 'axios'

const RefersService = {
  getRefers: async (userId: string, page: number): Promise<AxiosResponse<IRefersResponseData>> => {
    return await axios.get(`/refers?page=${page}&userId=${userId}`)
  },
}

export default RefersService
