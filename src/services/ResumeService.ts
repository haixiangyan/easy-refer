import axios, {AxiosResponse} from 'axios'

const ResumeService = {
  getResumes: async (userId: string, page: number): Promise<AxiosResponse<IResumesResponseData>> => {
    return await axios.get(`/resumes?page=${page}&userId=${userId}`)
  },
}

export default ResumeService
