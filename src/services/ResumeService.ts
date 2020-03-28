import axios, {AxiosResponse} from 'axios'

const ResumeService = {
  getResumes: async (userId: string, page: number): Promise<AxiosResponse<IGetResumes>> => {
    return await axios.get('/resume', {
      params: {userId, page}
    })
  },
  applyForRefer: async (application: TApplication): Promise<AxiosResponse<IApply>> => {
    return await axios.post('/resume', application)
  }
}

export default ResumeService
