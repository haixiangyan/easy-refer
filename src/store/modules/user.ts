type TUserStore = TMapper & {
  userId: string
  email: string
  name: string
  jobId: string | undefined
  intro?: string
  phone?: string
  leetCodeUrl?: string
  thirdPersonIntro?: string
  resumeUrl?: string
}

const auth = {
  namespaced: true,
  state: {
    userId: '',
    email: '',
    name: '',
    jobId: undefined,
    // 可无
    intro: '',
    phone: '',
    leetCodeUrl: '',
    thirdPersonIntro: '',
    resumeUrl: ''
  },
  mutations: {
    setUser: (state: TUserStore, payload: TUserStore) => {
      Object.keys(state).forEach((key: string) => {
        if (key in state && key in payload) {
          state[key] = payload[key]
        }
      })
    }
  }
}

export default auth
