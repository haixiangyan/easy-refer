type TUserStore = {
  userId: string
  email: string
  name: string
}

const auth = {
  namespaced: true,
  state: {
    userId: '',
    email: '',
    name: '',
  },
  mutations: {
    setUser: (state: TUserStore, payload: TUserStore) => {
      state.userId = payload.userId
      state.email = payload.email
      state.name = payload.name
    }
  }
}

export default auth
