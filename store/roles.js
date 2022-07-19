export const state = () => ({
  showAddRole: 'HQRoles',
  updateRole: {
    name: '',
    roleMenu: '',
  },
})

export const mutations = {
  SET_SHOW_ADD_ROLE(state, payload) {
    state.showAddRole = payload
  },
  SET_UPDATE_ROLE(state, payload) {
    state.updateRole.id = payload.id
    state.updateRole.name = payload.name
    state.updateRole.roleMenu = payload.roleMenus
  },
  SET_UPDATE_ROLE_NAME(state, payload){
    state.updateRole.name = payload
  },
  SET_UPDATE_ROLE_ROLE_MENU(state, payload){
    state.updateRole.roleMenu = payload
  }
}

export const actions = {
  setShowAddRole({ commit }, data) {
    commit('SET_SHOW_ADD_ROLE', data)
  },
  setUpdateRole({ commit }, data){
    commit('SET_UPDATE_ROLE', data)
  }
}

export const getters = {
  getShowAddRole: (state) => state.showAddRole,
  getUpdateRole: (state) => state.updateRole,
}
