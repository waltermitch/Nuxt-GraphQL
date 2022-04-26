export const state = () => ({
  activeTab: 0,
})

export const mutations = {
  SET_ACTIVE_TAB(state, payload) {
    state.activeTab = payload
  },
}

export const getters = {
  getActiveTab: (state) => state.activeTab,
}
