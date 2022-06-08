import { mapActions, mapGetters } from 'vuex'
export const unitMaintenanceMixin = {
  computed: {
    ...mapGetters({
      isShowAddUnit: 'unitMaintenance/getShowAddUnit',
      unitID: 'unitMaintenance/getUnitID',
      unit: 'unitMaintenance/getUnit',
      unitFromAPI: 'unitMaintenance/getUnitFromApi',
      unitStateFromAPI: 'unitMaintenance/getUnitStateFromAPI',
      unitState: 'unitMaintenance/getUnitState',
    }),
  },
  methods: {
    ...mapActions({
      setShowAddUnit: 'unitMaintenance/setShowAddUnit',
      setUnit: 'unitMaintenance/setUnit',
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
      this.setUnitID(null)
      this.setUnit({
        code: '',
        address: '',
        name: '',
        city: {
          id: '',
          name: '',
          tax: '',
          createdAt: '',
          updatedAt: '',
          state: {
            id: '',
            code: '',
          },
        },
        district: '',
        county: '',
        population: '',
        state: {
          id: '',
          code: '',
          salesTaxCafeteria: '',
          salesTaxVending: '',
          salesTaxRestaurant: '',
          salesTaxStore: '',
          grossReceiptsTax: '',
          createdAt: '',
          updatedAt: '',
          cities: [],
          counties: [],
        },
        managerFirstName: '',
        zip: '',
        managerLastName: '',
        payrollPassword: '',
        emailAccount: '',
        users: [],
        sysco: '',
        payrollTaxPercent: '',
        benefitsAmount: '',
        vendingIncome: '',
        commissionAmount: '',
        vacationAmount: '',
        isVending: false,
        isActive: false,
        businessInsuranceAmount: '',
        managementFeeType: '',
        managementAmount: '',
        managementPercent: '',
        administrativeFeeType: '',
        administrativeAmount: '',
        administrativePercent: '',
        supportAmount: '',
        supportFeeType: '',
        supportPercent: '',
        benefitsPercent: '',
        //  TODO Need more information on reg tax field
        // regTax: '',
        commissionPercent: '',
        isKronos: false,
      })
    },
  },
}
