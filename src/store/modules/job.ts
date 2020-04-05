import dayjs from 'dayjs'
import {REQUIRED_REFER_FIELD_VALUES} from '@/constants/referFields'

type TJobState = TJob & TMapper

const initState: TJobState = {
  jobId: '',
  refererId: '',
  company: '',
  deadline: dayjs().add(1, 'month').toISOString(),
  expiration: 5,
  referTotal: 0,
  referredCount: 0,
  requiredFields: [...REQUIRED_REFER_FIELD_VALUES],
  source: '',
  createdAt: new Date().toISOString(),
  updatedAt: dayjs().toISOString()
}

const job = {
  namespaced: true,
  state: initState,
  mutations: {
    setJob: (state: TJobState, job: TJob & TMapper) => {
      Object.keys(state).forEach((key: string) => {
        state[key] = job[key]
      })
    }
  }
}

export default job
