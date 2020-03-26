import axios, {AxiosResponse} from 'axios'

const ResumeService = {
  getResumes: async (userId: string, page: number): Promise<AxiosResponse<IResumesResponseData>> => {
    return await axios.get('/resumes', {
      params: {userId, page}
    })
  },
}

export default ResumeService
