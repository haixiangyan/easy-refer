import axios, {AxiosResponse} from 'axios'

const ResumeService = {
  getResumes: async (userId: string, page: number): Promise<AxiosResponse<IGetResumes>> => {
    return await axios.get('/resume', {
      params: {userId, page}
    })
  },
}

export default ResumeService
