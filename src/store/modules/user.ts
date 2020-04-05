export type TUserState = TUser & TMapper

const initState: TUserState = {
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
}

const user = {
  namespaced: true,
  state: initState,
  mutations: {
    setUser: (state: TUserState, user: TUser & TMapper) => {
      Object.keys(state).forEach((key: string) => {
        state[key] = user[key]
      })
    },
    setAvatarUrl: (state: TUserState, avatarUrl: string) => {
      state.avatarUrl = avatarUrl
    }
  }
}

export default user
