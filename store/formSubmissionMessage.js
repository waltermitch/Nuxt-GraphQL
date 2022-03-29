export const state = () => ({
  showMessage: false,
  messageType: '',
})

export const mutations = {
  SET_SHOW_MESSAGE(state, payload) {
    state.showMessage = payload
  },
  SET_MESSAGE_TYPE(state, payload) {
    state.messageType = payload
  },
}

export const actions = {
  setShowMessage({ commit }, data) {
    commit('SET_SHOW_MESSAGE', data)
  },
  setMessageType({ commit }, data) {
    commit('SET_MESSAGE_TYPE', data)
  },
}

export const getters = {
  getShowMessage: (state) => state.showMessage,
  getMessageType: (state) => state.messageType,
}
