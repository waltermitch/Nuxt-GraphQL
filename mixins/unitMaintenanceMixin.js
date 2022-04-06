import { mapActions, mapGetters } from 'vuex'
export const unitMaintenanceMixin = {
  computed: {
    ...mapGetters({
      isShowAddUnit: 'unitMaintenance/getShowAddUnit',
    }),
  },
  methods: {
    ...mapActions({
      setShowAddUnit: 'unitMaintenance/setShowAddUnit',
    }),
    showAddUnit() {
      this.setShowAddUnit('HQUnitMaintenance')
    },
    hideAddUnit() {
      this.setShowAddUnit('HQUnitsTableContent')
    },
    cancel() {
      this.cancelEvent()
      this.hideAddUnit()
    },
  },
}
