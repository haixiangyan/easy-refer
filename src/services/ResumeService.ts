import axios, {AxiosResponse} from 'axios'

const ResumeService = {
  getResumes: async (userId: string, page: number): Promise<AxiosResponse<IGetResumes>> => {
    return await axios.get('/resume', {
      params: {userId, page}
    })
  },
  getResume: async (resumeId: string): Promise<AxiosResponse<IGetResume>> => {
    return await axios.get('/resume', {
      params: {resumeId}
    })
  },
  applyForRefer: async (application: TApplication): Promise<AxiosResponse<IApply>> => {
    return await axios.post('/resume', application)
  },
  updateResumeStatus: async(resumeId: string, status: string): Promise<AxiosResponse<IData>> => {
    return await axios.patch('/resume', {
      resumeId, status
    })
  }
}

export default ResumeService
