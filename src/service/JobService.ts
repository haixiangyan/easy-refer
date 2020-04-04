import {AxiosResponse} from 'axios'
import service from '@/service/config'

const JobService = {
  async getJobItemList(page: number, limit: number): Promise<AxiosResponse<IJobItemList>> {
    return await service.get('/jobs/item', {
      params: {page, limit}
    })
  },
  async getJobItemById(jobId: string): Promise<AxiosResponse<TJobItem>> {
    return await service.get(`/jobs/item/${jobId}`)
  }
}

export default JobService
