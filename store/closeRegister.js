import { CLOSE_REGISTER } from '~/constants/closeRegister'

export const state = () => ({
  isEdit: false,
  closeRegister: CLOSE_REGISTER,
  deleteItemIDs: [],
})

export const mutations = {
  SET_CLOSE_REGISTER(state, payload) {
    state.closeRegister = payload
  },
  SET_IS_EDIT(state, payload) {
    state.isEdit = payload
  },
  SET_DELETE_ITEM_IDS(state, payload) {
    state.deleteItemIDs = [...state.deleteItemIDs, payload]
  },
  SET_ID(state, payload) {
    state.closeRegister.id = payload
  },
  SET_REGISTER(state, payload) {
    state.closeRegister = {
      ...state.closeRegister,
      register: payload,
    }
  },
  SET_ITEMS(state, payload) {
    state.closeRegister.items = [...payload]
  },
  SET_ITEM(state, payload) {
    state.closeRegister.items = [...state.closeRegister.items, payload]
  },
  SET_UNIT(state, payload) {
    state.closeRegister = {
      ...state.closeRegister,
      unit: payload,
    }
  },
  SET_NON_RESETABLE(state, payload) {
    state.closeRegister.nonResetable = payload
  },
  SET_NET_TOTAL(state, payload) {
    state.closeRegister.netTotal = payload
  },
  SET_LAST_NON_RESETABLE(state, payload) {
    state.closeRegister.lastNonResetable = payload
  },
  SET_NET_OV(state, payload) {
    state.closeRegister.netOV = payload
  },
  SET_TOTAL_TO_DISTRIBUTE(state, payload) {
    state.closeRegister.totalToDistribute = payload
  },
  SET_NET_CHARGE(state, payload) {
    state.closeRegister.netCharge = payload
  },
  SET_TAX_FROM_THE_TAPE(state, payload) {
    state.closeRegister.taxFromTheTape = payload
  },
  SET_NET_VOUCHER(state, payload) {
    state.closeRegister.netVoucher = payload
  },
  SET_OVERRING_TAX(state, payload) {
    state.closeRegister.overringTax = payload
  },
  SET_NET_CASH(state, payload) {
    state.closeRegister.netCash = payload
  },
  SET_CHARGE_TAX(state, payload) {
    state.closeRegister.chargeTax = payload
  },
  SET_VOUCHER_TAX(state, payload) {
    state.closeRegister.voucherTax = payload
  },
  SET_CASH_TAX(state, payload) {
    state.closeRegister.cashTax = payload
  },
  SET_TOTAL_PETTY_CACHE(state, payload) {
    state.closeRegister.totalPettyCache = payload
  },
  SET_ACTUAL_CACHE_DEPOSIT(state, payload) {
    state.closeRegister.actualCacheDeposit = payload
  },
  SET_CALCULATED_CACHE_DEPOSIT(state, payload) {
    state.closeRegister.calculatedCacheDeposit = payload
  },
  SET_OVER_SHORT(state, payload) {
    state.closeRegister.overShort = payload
  },
  SET_CUSTOMER_COUNT_BREAKFAST(state, payload) {
    state.closeRegister.customerCountBreakfast = payload
  },
  SET_NET_SALES_BREAKFAST(state, payload) {
    state.closeRegister.netSalesBreakfast = payload
  },
  SET_CUSTOMER_COUNT_LUNCH(state, payload) {
    state.closeRegister.customerCountLunch = payload
  },
  SET_NET_SALES_LUNCH(state, payload) {
    state.closeRegister.netSalesLunch = payload
  },
  SET_CUSTOMER_COUNT_DINNER(state, payload) {
    state.closeRegister.customerCountDinner = payload
  },
  SET_NET_SALES_DINNER(state, payload) {
    state.closeRegister.netSalesDinner = payload
  },
  SET_CUSTOMER_COUNT_TOTALS(state, payload) {
    state.closeRegister.customerCountTotals = payload
  },
  SET_NET_SALES_TOTALS(state, payload) {
    state.closeRegister.netSalesTotals = payload
  },
  SET_CLOSE_DATE(state, payload) {
    state.closeRegister.closeDate = payload
  },
  SET_PERIOD_END(state, payload) {
    state.closeRegister.periodEnd = payload
  },
}

export const getters = {
  getId: (state) => state.closeRegister.id,
  getRegister: (state) => state.closeRegister.register,
  getItems: (state) => state.closeRegister.items,
  getUnit: (state) => state.closeRegister.unit,
  getNonResetable: (state) => state.closeRegister.nonResetable,
  getNetTotal: (state) => state.closeRegister.netTotal,
  getLastNonResetable: (state) => state.closeRegister.lastNonResetable,
  getNetOV: (state) => state.closeRegister.netOV,
  getTotalToDistribute: (state) => state.closeRegister.totalToDistribute,
  getNetCharge: (state) => state.closeRegister.netCharge,
  getTaxFromTheTape: (state) => state.closeRegister.taxFromTheTape,
  getNetVoucher: (state) => state.closeRegister.netVoucher,
  getOverringTax: (state) => state.closeRegister.overringTax,
  getNetCash: (state) => state.closeRegister.netCash,
  getChargeTax: (state) => state.closeRegister.chargeTax,
  getVoucherTax: (state) => state.closeRegister.voucherTax,
  getCashTax: (state) => state.closeRegister.cashTax,
  getTotalPettyCache: (state) => state.closeRegister.totalPettyCache,
  getActualCacheDeposit: (state) => state.closeRegister.actualCacheDeposit,
  getCalculatedCacheDeposit: (state) =>
    state.closeRegister.calculatedCacheDeposit,
  getOverShort: (state) => state.closeRegister.overShort,
  getCustomerCountBreakfast: (state) =>
    state.closeRegister.customerCountBreakfast,
  getNetSalesBreakfast: (state) => state.closeRegister.netSalesBreakfast,
  getCustomerCountLunch: (state) => state.closeRegister.customerCountLunch,
  getNetSalesLunch: (state) => state.closeRegister.netSalesLunch,
  getCustomerCountDinner: (state) => state.closeRegister.customerCountDinner,
  getNetSalesDinner: (state) => state.closeRegister.netSalesDinner,
  getCustomerCountTotals: (state) => state.closeRegister.customerCountTotals,
  getNetSalesTotals: (state) => state.closeRegister.netSalesTotals,
  getCloseDate: (state) => state.closeRegister.closeDate,
  getPeriodEnd: (state) => state.closeRegister.periodEnd,
  getIsEdit: (state) => state.isEdit,
}
