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
    isVending: false,
    isActive: false,
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
  SET_UNIT_SYSCO(state, payload) {
    state.unit.sysco = payload
  },
  SET_UNIT_PAYROLL_TAX(state, payload) {
    state.unit.payrollTax = payload
  },
  SET_UNIT_BENEFIT_DOLLARS(state, payload) {
    state.unit.benefitDollars = payload
  },
  SET_UNIT_VENDING_INCOME(state, payload) {
    state.unit.vendingIncome = payload
  },
  SET_UNIT_COMMISSION_DOLLARS(state, payload) {
    state.unit.commissionDollars = payload
  },
  SET_UNIT_VACATION_DOLLARS(state, payload) {
    state.unit.vacationDollars = payload
  },
  SET_UNIT_IS_VENDING(state, payload) {
    state.unit.isVending = payload
  },
  SET_UNIT_IS_ACTIVE(state, payload) {
    state.unit.isActive = payload
  },
  SET_UNIT_BUSINESS_INSURANCE(state, payload) {
    state.unit.businessInsurance = payload
  },
  SET_UNIT_MANAGEMENT_FEE_TYPE(state, payload) {
    state.unit.managementFeeType = payload
  },
  SET_UNIT_MANAGEMENT_FEE_DOLLAR(state, payload) {
    state.unit.managementFeeDollar = payload
  },
  SET_UNIT_MANAGEMENT_FEE_PERCENT(state, payload) {
    state.unit.managementFeePercent = payload
  },
  SET_UNIT_ADMINISTRATIVE_FEE_TYPE(state, payload) {
    state.unit.administrativeFeeType = payload
  },
  SET_UNIT_ADMINISTRATIVE_FEE_DOLLAR(state, payload) {
    state.unit.administrativeFeeDollar = payload
  },
  SET_UNIT_ADMINISTRATIVE_FEE_PERCENT(state, payload) {
    state.unit.administrativeFeePercent = payload
  },
  SET_UNIT_SUPPORT_FEE_TYPE(state, payload) {
    state.unit.supportFeeType = payload
  },
  SET_UNIT_SUPPORT_FEE_DOLLAR(state, payload) {
    state.unit.supportFeeDollar = payload
  },
  SET_UNIT_SUPPORT_FEE_PERCENT(state, payload) {
    state.unit.supportFeePercent = payload
  },
  SET_UNIT_BENEFITS_PERCENT(state, payload) {
    state.unit.benefitsPercent = payload
  },
  SET_UNIT_REG_TAX(state, payload) {
    state.unit.regTax = payload
  },
  SET_UNIT_COMMISSION_PERCENT(state, payload) {
    state.unit.commissionPercent = payload
  },
  SET_UNIT_KRONOS(state, payload) {
    state.unit.kronos = payload
  },
  SET_UNIT_START_PERIOD(state, payload) {
    state.unit.startPeriod = payload
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
