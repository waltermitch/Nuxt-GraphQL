export const state = () => ({
  id: '',
  description: '',
  items: [],
  deliveryDate: '',
  headCount: '',
  phoneNumber: '',
  orderBy: '',
  orderFor: '',
  orderDate: '',
  isTaxable: false,
  tax: '',
  shipToName: '',
  shipToAddress: '',
  billToName: '',
  billToAddress: '',
  isCashOrder: false,
  chargeNumber: '',
})

export const mutations = {
  SET_ID(state, payload) {
    state.id = payload
  },
  SET_DESCRIPTION(state, payload) {
    state.description = payload
  },
  SET_ITEMS(state, payload) {
    state.items = [...state.items, payload]
  },
  SET_DELIVERY_DATE(state, payload) {
    state.deliveryDate = payload
  },
  SET_HEAD_COUNT(state, payload) {
    state.headCount = payload
  },
  SET_PHONE_NUMBER(state, payload) {
    state.phoneNumber = payload
  },
  SET_ORDER_BY(state, payload) {
    state.orderBy = payload
  },
  SET_ORDER_FOR(state, payload) {
    state.orderFor = payload
  },
  SET_ORDER_DATE(state, payload) {
    state.orderDate = payload
  },
  SET_IS_TAXABLE(state, payload) {
    state.isTaxable = payload
  },
  SET_TAX(state, payload) {
    state.tax = payload
  },
  SET_SHIP_TO_NAME(state, payload) {
    state.shipToName = payload
  },
  SET_SHIP_TO_ADDRESS(state, payload) {
    state.shipToAddress = payload
  },
  SET_BILL_TO_NAME(state, payload) {
    state.billToName = payload
  },
  SET_BILL_TO_ADDRESS(state, payload) {
    state.billToAddress = payload
  },
  SET_IS_CASH_ORDER(state, payload) {
    state.isCashOrder = payload
  },
  SET_CHARGE_NUMBER(state, payload) {
    state.chargeNumber = payload
  },
}

export const getters = {
  getId: (state) => state.id,
  getDescription: (state) => state.description,
  getItems: (state) => state.items,
  getDeliveryDate: (state) => state.deliveryDate,
  getHeadCount: (state) => state.headCount,
  getPhoneNumber: (state) => state.phoneNumber,
  getOrderBy: (state) => state.orderBy,
  getOrderFor: (state) => state.orderFor,
  getOrderDate: (state) => state.orderDate,
  getIsTaxable: (state) => state.isTaxable,
  getTax: (state) => state.tax,
  getShipToName: (state) => state.shipToName,
  getShipToAddress: (state) => state.shipToAddress,
  getBillToName: (state) => state.billToName,
  getBillToAddress: (state) => state.billToAddress,
  getIsCashOrder: (state) => state.isCashOrder,
  getChargeNumber: (state) => state.chargeNumber,
}
