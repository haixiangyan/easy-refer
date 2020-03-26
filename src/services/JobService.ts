import axios, {AxiosResponse} from 'axios'

const JobService = {
  getJobs: async (userId: string, page: number): Promise<AxiosResponse<IJobsResponseData>> => {
    return await axios.get('/jobs', {
      params: {userId, page}
    })
  },
}

export default JobService
