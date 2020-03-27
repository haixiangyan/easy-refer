type TUserStore = {
  userId: string
  email: string
  name: string
  jobId: string | undefined
}

const auth = {
  namespaced: true,
  state: {
    userId: '',
    email: '',
    name: '',
    jobId: undefined
  },
  mutations: {
    setUser: (state: TUserStore, payload: TUserStore) => {
      state.userId = payload.userId
      state.email = payload.email
      state.name = payload.name
      state.jobId = payload.jobId
    }
  }
}

export default auth
