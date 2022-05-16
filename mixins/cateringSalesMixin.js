import { mapGetters } from 'vuex'
import { CATERING_ORDER } from '~/constants/cateringOrder'
export const cateringSalesMixin = {
  computed: {
    ...mapGetters({
      getId: 'cateringSales/getId',
      getDescription: 'cateringSales/getDescription',
      getItems: 'cateringSales/getItems',
      getDeliveryDate: 'cateringSales/getDeliveryDate',
      getHeadCount: 'cateringSales/getHeadCount',
      getPhoneNumber: 'cateringSales/getPhoneNumber',
      getOrderBy: 'cateringSales/getOrderBy',
      getOrderFor: 'cateringSales/getOrderFor',
      getOrderDate: 'cateringSales/getOrderDate',
      getIsTaxable: 'cateringSales/getIsTaxable',
      getTax: 'cateringSales/getTax',
      getShipToName: 'cateringSales/getShipToName',
      getShipToAddress: 'cateringSales/getShipToAddress',
      getBillToName: 'cateringSales/getBillToName',
      getBillToAddress: 'cateringSales/getBillToAddress',
      getIsCashOrder: 'cateringSales/getIsCashOrder',
      getChargeNumber: 'cateringSales/getChargeNumber',
      getIsEdit: 'cateringSales/getIsEdit',
    }),
  },
  methods: {
    cancelEdit() {
      this.$router.push('/review/catering-sales')
    },
    cancelCreate() {
      console.log('cancelCreate')
      this.$store.commit('cateringSales/SET_CATERING_ORDER', CATERING_ORDER)
    },
  },
}
