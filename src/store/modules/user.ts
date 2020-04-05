type TUserStore = TMapper & TUser

const user = {
  namespaced: true,
  state: {
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
  mutations: {
    setUser: (state: TUserStore, user: TUserStore) => {
      Object.keys(state).forEach((key: string) => {
        state[key] = user[key]
      })
    },
    setAvatarUrl: (state: TUserStore, avatarUrl: string) => {
      state.avatarUrl = avatarUrl
    }
  }
}

export default user
