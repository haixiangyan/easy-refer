import axios, {AxiosResponse} from 'axios'

const JobService = {
  getJobs: async (): Promise<AxiosResponse<IJobsResponseData>> => {
    return await axios.get('/jobs')
  },
}

export default JobService
