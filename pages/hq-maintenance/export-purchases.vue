<template>
  <BasePageLayout>
    <template #sideBar>
      <SideBar :nav-tabs="navTabs" />
    </template>

    <template #header>
      <PageSubtitle> Maintenance / Export Purchases </PageSubtitle>

      <PageTitle> Export Purchases </PageTitle>
    </template>

    <template #content>
      <HQExportPurchases />
    </template>
  </BasePageLayout>
</template>

<script>
import { HQ_MAINTENANCE_TABS } from '~/constants/constants'
import BasePageLayout from '~/components/BasePageLayout.vue'
import SideBar from '~/components/SideBar.vue'
import PageSubtitle from '~/components/PageSubtitle.vue'
import PageTitle from '~/components/PageTitle.vue'
import HQExportPurchases from '~/components/HQExportPurchases.vue'
export default {
  name: 'HqMaintenanceExportPurchases',
  components: {
    BasePageLayout,
    SideBar,
    PageSubtitle,
    PageTitle,
    HQExportPurchases,
  },
  layout: 'hqlayout',
  data() {
    return {
      navTabs: HQ_MAINTENANCE_TABS,
    }
  },
}
</script>

<style lang="scss" scoped></style>
