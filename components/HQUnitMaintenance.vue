<template>
  <PageContentWrapper>
    <TabsView :tabs-headers="tabsHeaders" :tabs="tabs" />
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import TabsView from './TabsView.vue'
import HQUnitMaintenanceDetails from './HQUnitMaintenanceDetails.vue'
import HQUnitMaintenanceFinancials from './HQUnitMaintenanceFinancials.vue'
import HQUnitMaintenanceFees from './HQUnitMaintenanceFees.vue'
export default {
  name: 'HQUnitMaintenance',
  components: {
    PageContentWrapper,
    TabsView,
  },
  data() {
    return {
      tabsHeaders: ['Details', 'Financials', 'Fees'],
      tabs: [
        HQUnitMaintenanceDetails,
        HQUnitMaintenanceFinancials,
        HQUnitMaintenanceFees,
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
