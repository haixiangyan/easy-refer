import {AxiosResponse} from 'axios'
import service from '@/service/config'

const ResumeService = {
  async getResumeById(resumeId: string): Promise<AxiosResponse<IResume>> {
    return await service.get(`/resumes/${resumeId}`)
  }
}

export default ResumeService
