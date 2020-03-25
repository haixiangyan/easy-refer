import axios, {AxiosResponse} from 'axios'

const JobService = {
  getJobs: async (page: number, userId: string): Promise<AxiosResponse<IJobsResponseData>> => {
    return await axios.get(`/jobs?page=${page}&userId=${userId}`)
  },
}

export default JobService
