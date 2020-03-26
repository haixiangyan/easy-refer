import axios, {AxiosResponse} from 'axios'

const JobService = {
  getJobs: async (page: number, userId: string): Promise<AxiosResponse<IJobsResponseData>> => {
    return await axios.get('/jobs', {
      params: {userId, page}
    })
  },
}

export default JobService
