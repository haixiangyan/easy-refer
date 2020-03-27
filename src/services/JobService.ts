import axios, {AxiosResponse} from 'axios'

const JobService = {
  getJobs: async (userId: string, page: number): Promise<AxiosResponse<IGetJobs>> => {
    return await axios.get('/job', {
      params: {userId, page}
    })
  },
  getJob: async (userId: string, jobId: string): Promise<AxiosResponse<IGetJob>> => {
    return await axios.get('/job', {
      params: {userId, jobId}
    })
  },
  addJob: async (userId: string, job: TJob): Promise<AxiosResponse<IAddJob>> => {
    return await axios.post('/job', job)
  }
}

export default JobService
