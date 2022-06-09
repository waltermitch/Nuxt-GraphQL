export const state = () => ({
  activeTab: 0,
  allowSwitch: true,
})

export const mutations = {
  SET_ACTIVE_TAB(state, payload) {
    state.activeTab = payload
  },
  SET_ALLOW_SWITCH(state, payload) {
    state.allowSwitch = payload
  },
}

export const getters = {
  getActiveTab: (state) => state.activeTab,
  getAllowSwitch: (state) => state.allowSwitch,
}
