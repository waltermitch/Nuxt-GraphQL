import {PURCHASE_ORDER} from "~/constants/purchaseOrder";


export const state = () => ({
  isEdit: false,
  purchaseOrder: PURCHASE_ORDER,
  deleteItemIDs: [],
})

export const mutations = {
  SET_CATERING_ORDER(state, payload) {
    state.purchaseOrder = payload
  },
  SET_ID(state, payload) {
    state.id = payload
  },
  SET_IS_EDIT(state, payload) {
    state.isEdit = payload
  },
  SET_DELETE_ITEM_IDS(state, payload) {
    state.deleteItemIDs = [...state.deleteItemIDs, payload]
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
  getIsEdit: (state) => state.isEdit,
  getItems: (state) => state.items,
}
