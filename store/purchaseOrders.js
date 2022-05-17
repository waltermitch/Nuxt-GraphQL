export const state = () => ({
  id: '',
  invoiceNumber: '',
  purchaseDate: '',
  vendor: '',
  poNumber: '',
  purchaseTotal: '',
  items: [],
})

export const mutations = {
  SET_ID(state, payload) {
    state.id = payload
  },
  SET_INVOICE_NUMBER(state, payload) {
    state.invoiceNumber = payload
  },
  SET_PURCHASE_DATE(state, payload) {
    state.purchaseDate = payload
  },
  SET_VENDOR(state, payload) {
    state.vendor = payload
  },
  SET_PO_NUMBER(state, payload) {
    state.poNumber = payload
  },
  SET_PURCHASE_TOTAL(state, payload) {
    state.purchaseTotal = payload
  },
  SET_ITEMS(state, payload) {
    state.items = [...state.items, payload]
  },
}

export const getters = {
  getId: (state) => state.id,
  getInvoiceNumber: (state) => state.invoiceNumber,
  getPurchaseDate: (state) => state.purchaseDate,
  getVendor: (state) => state.vendor,
  getPoNumber: (state) => state.poNumber,
  getPurchaseTotal: (state) => state.purchaseTotal,

  getItems: (state) => state.items,
}
