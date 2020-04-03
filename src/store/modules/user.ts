type TUserStore = TStringMapper & TUser

const auth = {
  namespaced: true,
  state: {
    userId: '',
    name: '',
    email: '',
    phone: '',
    experience: 0,
    resumeUrl: '',
    intro: '',
    jobId: '',
    thirdPersonIntro: '',
    leetCodeUrl: '',
    avatarUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
  },
  mutations: {
    setUser: (state: TUserStore, user: TUserStore) => {
      Object.keys(state).forEach((key: string) => {
        if (key in state && key in user) {
          state[key] = user[key]
        }
      })
    },
    setAvatarUrl: (state: TUserStore, avatarUrl: string) => {
      state.avatarUrl = avatarUrl
    }
  }
}

export default auth
