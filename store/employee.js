import { EMPLOYEE } from '~/constants/employee'

export const state = () => ({
  addEmployee: false,
  editEmployee: false,
  employee: EMPLOYEE,
})

export const mutations = {
  SET_ADD_EMPLOYEE(state, payload) {
    state.addEmployee = payload
  },
  SET_EDIT_EMPLOYEE(state, payload) {
    state.editEmployee = payload
  },
  SET_EMPLOYEE(state, payload) {
    state.employee = payload
  },
  SET_ID(state, payload) {
    state.employee.id = payload
  },
  SET_FIRST_NAME(state, payload) {
    state.employee.firstName = payload
  },
  SET_LAST_NAME(state, payload) {
    state.employee.lastName = payload
  },
  SET_SALARY_BASE(state, payload) {
    state.employee.salaryBase = payload
  },
  SET_SALARY_OVERTIME(state, payload) {
    state.employee.salaryOvertime = payload
  },
  SET_STATE_TAX_CODE(state, payload) {
    state.employee.stateTaxCode = payload
  },
  SET_IS_HOURLY(state, payload) {
    state.employee.isHourly = payload
  },
  SET_IS_EXEMPT(state, payload) {
    state.employee.isExempt = payload
  },
  SET_IS_PROD_ELIGIBLE(state, payload) {
    state.employee.isProdEligible = payload
  },
  SET_IS_ACTIVE(state, payload) {
    state.employee.isActive = payload
  },
  SET_LOCAL_TAX_CODE(state, payload) {
    state.employee.localTaxCode = payload
  },
  SET_UNITS(state, payload) {
    state.employee.units = payload
  },
}

export const getters = {
  getAddEmployee: (state) => state.addEmployee,
  getEditEmployee: (state) => state.editEmployee,
  getEmployee: (state) => state.employee,
}
