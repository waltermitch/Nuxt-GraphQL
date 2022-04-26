export const state = () => ({
  showAddUnit: 'HQUnitsTableContent',
  unitID: '',
  unit: {
    unitNum: '',
    streetAddress: '',
    name: '',
    city: '',
    district: '',
    county: '',
    population: '',
    state: '',
    mgrFirstName: '',
    zipCode: '',
    mgrLastName: '',
    password: '',
    email: '',
    sysco: '',
    payrollTax: '',
    benefitDollars: '',
    vendingIncome: '',
    commissionDollars: '',
    vacationDollars: '',
    vending: '',
    active: '',
    businessInsurance: '',
    managementFeeType: '',
    managementFeeDollar: '',
    managementFeePercent: '',
    administrativeFeeType: '',
    administrativeFeeDollar: '',
    administrativeFeePercent: '',
    supportFeeDollar: '',
    supportFeeType: '',
    supportFeePercent: '',
    benefitsPercent: '',
    regTax: '',
    commissionPercent: '',
    kronos: '',
    startPeriod: '',
  },
})

export const mutations = {
  SET_SHOW_ADD_UNIT(state, payload) {
    state.showAddUnit = payload
  },
  SET_UNIT_ID(state, payload) {
    state.unitID = payload
  },
  SET_UNIT(state, payload) {
    state.unit = payload
  },
  SET_UNIT_NUM(state, payload) {
    state.unit.unitNum = payload
  },
  SET_UNIT_STREET_ADDRESS(state, payload) {
    state.unit.streetAddress = payload
  },
  SET_UNIT_NAME(state, payload) {
    state.unit.name = payload
  },
  SET_UNIT_CITY(state, payload) {
    state.unit.city = payload
  },
  SET_UNIT_DISTRICT(state, payload) {
    state.unit.district = payload
  },
  SET_UNIT_COUNTY(state, payload) {
    state.unit.county = payload
  },
  SET_UNIT_POPULATION(state, payload) {
    state.unit.population = payload
  },
  SET_UNIT_STATE(state, payload) {
    state.unit.state = payload
  },
  SET_UNIT_MGR_FIRST_NAME(state, payload) {
    state.unit.mgrFirstName = payload
  },
  SET_UNIT_MGR_LAST_NAME(state, payload) {
    state.unit.mgrLastName = payload
  },
  SET_UNIT_MGR_ZIP_CODE(state, payload) {
    state.unit.zipCode = payload
  },
  SET_UNIT_PASSWORD(state, payload) {
    state.unit.password = payload
  },
  SET_UNIT_EMAIL(state, payload) {
    state.unit.email = payload
  },
}

export const actions = {
  setShowAddUnit({ commit }, data) {
    commit('SET_SHOW_ADD_UNIT', data)
  },
  setUnitID({ commit }, data) {
    commit('SET_UNIT_ID', data)
  },
  setUnit({ commit }, data) {
    commit('SET_UNIT', data)
  },
}

export const getters = {
  getShowAddUnit: (state) => state.showAddUnit,
  getUnitID: (state) => state.unitID,
  getUnit: (state) => state.unit,
}
