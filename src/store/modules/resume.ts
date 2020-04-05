type TResumeState = TResume & TMapper

const initState: TResumeState = {
  resumeId: '',
  url: '',
  name: ''
}

const resume = {
  namespaced: true,
  state: initState,
  mutations: {
    setResume: (state: TResumeState, resume: TResume & TMapper) => {
      Object.keys(state).forEach((key: string) => {
        state[key] = resume[key]
      })
    }
  }
}

export default resume
