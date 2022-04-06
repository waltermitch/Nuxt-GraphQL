export const state = () => ({
  showAddUnit: 'HQUnitsTableContent',
})

export const mutations = {
  SET_SHOW_ADD_UNIT(state, payload) {
    state.showAddUnit = payload
  },
}

export const actions = {
  setShowAddUnit({ commit }, data) {
    commit('SET_SHOW_ADD_UNIT', data)
  },
}

export const getters = {
  getShowAddUnit: (state) => state.showAddUnit,
}
