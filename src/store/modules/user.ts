import dayjs from 'dayjs'
import {REQUIRED_REFER_FIELD_VALUES} from '@/constants/referFields'
import {namespace} from 'vuex-class'

const initState: TUserState = {
  details: {
    userId: '',
    jobId: '',
    email: '',
    name: '',
    experience: 0,
    intro: '',
    phone: '',
    leetCodeUrl: '',
    thirdPersonIntro: '',
    resumeId: '',
    avatarUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    finishedRefers: 0,
    totalRefers: 0,
    finishedResumes: 0,
    totalResumes: 0
  },
  job: {
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
  },
  resume: {
    resumeId: '',
    url: '',
    name: ''
  }
}

const user = {
  namespaced: true,
  state: initState,
  getters: {
    jobItem: ({job, details}: TUserState) => ({
        jobId: job.jobId,
        company: job.company,
        referer: {
          name: details.name,
          avatarUrl: details.avatarUrl
        },
        deadline: job.deadline,
        expiration: job.expiration,
        referredCount: job.referredCount,
        referTotal: job.referTotal,
        requiredFields: job.requiredFields,
        source: job.source
    })
  },
  mutations: {
    setUser: (state: TUserState, user: TUser) => {
      state.details = {
        ...state.details,
        ...user
      }
    },
    setJob: (state: TUserState, job: TJob) => {
      state.job = {
        ...state.job,
        ...job
      }
    },
    setResume: (state: TUserState, resume: TResume) => {
      state.resume = {
        ...state.resume,
        ...resume
      }
    },
    setAvatarUrl: (state: TUserState, avatarUrl: string) => {
      state.details.avatarUrl = avatarUrl
    }
  }
}

export const USER_MODULE = namespace('user')

export default user
