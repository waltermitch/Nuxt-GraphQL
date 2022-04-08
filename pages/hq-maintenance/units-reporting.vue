<template>
  <BasePageLayout>
    <template #sideBar>
      <SideBar :nav-tabs="navTabs" />
    </template>

    <template #header>
      <PageSubtitle> Maintenance / Units Reporting </PageSubtitle>

      <PageTitle> Units Reporting </PageTitle>
    </template>

    <template #content>
      <HQUnitsReportingContent />
    </template>
  </BasePageLayout>
</template>

<script>
import { HQ_MAINTENANCE_TABS } from '~/constants/constants'
import { sideBarNavTabsMixin } from '~/mixins/sideBarNavTabsMixin'
import BasePageLayout from '~/components/BasePageLayout.vue'
import SideBar from '~/components/SideBar.vue'
import PageSubtitle from '~/components/PageSubtitle.vue'
import PageTitle from '~/components/PageTitle.vue'
import HQUnitsReportingContent from '~/components/HQUnitsReportingContent.vue'
export default {
  name: 'UnitsReporting',
  components: {
    BasePageLayout,
    SideBar,
    PageSubtitle,
    PageTitle,
    HQUnitsReportingContent,
  },
  mixins: [sideBarNavTabsMixin(HQ_MAINTENANCE_TABS)],
  layout: 'hqlayout',
}
</script>

<style lang="scss" scoped></style>
