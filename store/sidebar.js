export const state = () => ({
  isShowSideBar: false,
})

export const mutations = {
  SET_IS_SHOW_SIDEBAR(state, payload) {
    state.isShowSideBar = payload
  },
}

export const getters = {
  getIsShowSideBar: (state) => state.isShowSideBar,
}
