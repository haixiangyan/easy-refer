export const state = () => ({
  loading: false,
})

export const mutations = {
  setLoading(state: {loading: boolean}, isLoading: boolean) {
    state.loading = isLoading
  }
}
