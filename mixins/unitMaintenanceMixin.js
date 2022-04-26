import { mapActions, mapGetters } from 'vuex'
export const unitMaintenanceMixin = {
  computed: {
    ...mapGetters({
      isShowAddUnit: 'unitMaintenance/getShowAddUnit',
      unitID: 'unitMaintenance/getUnitID',
      unit: 'unitMaintenance/getUnit',
    }),
  },
  methods: {
    ...mapActions({
      setShowAddUnit: 'unitMaintenance/setShowAddUnit',
      setUnitID: 'unitMaintenance/setUnitID',
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
