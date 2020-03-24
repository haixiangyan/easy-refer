import axios, {AxiosResponse} from 'axios'

const JobService = {
  getJobs: async (page: number): Promise<AxiosResponse<IJobsResponseData>> => {
    return await axios.get(`/jobs?page=${page}`)
  },
}

export default JobService
