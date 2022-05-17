import { mapGetters } from 'vuex'
export const purchaseOrderMixin = {
  computed: {
    ...mapGetters({
      getIsEdit: 'purchaseOrders/getIsEdit',
      getId: 'purchaseOrders/getId',
      getInvoiceNumber: 'purchaseOrders/getInvoiceNumber',
      getPurchaseDate: 'purchaseOrders/getPurchaseDate',
      getVendor: 'purchaseOrders/getVendor',
      getPoNumber: 'purchaseOrders/getPoNumber',
      getPurchaseTotal: 'purchaseOrders/getPurchaseTotal',
      getItems: 'purchaseOrders/getItems',
    }),
  },
}
