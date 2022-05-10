<template>
  <BasePageLayout>
    <template #sideBar>
      <SideBar :nav-tabs="navTabs" />
    </template>

    <template #header>
      <PageSubtitle> Unit Setup / Unit Info </PageSubtitle>

      <PageTitle> Unit Vendor </PageTitle>
    </template>

    <template #content>
      <HQUnitVendorContent />
    </template>
  </BasePageLayout>
</template>

<script>
import { HQ_UNITS_TABS } from '~/constants/constants'
import { unitMaintenanceMixin } from '~/mixins/unitMaintenanceMixin'
import { sideBarNavTabsMixin } from '~/mixins/sideBarNavTabsMixin'
import BasePageLayout from '~/components/BasePageLayout.vue'
import SideBar from '~/components/SideBar.vue'
import PageSubtitle from '~/components/PageSubtitle.vue'
import PageTitle from '~/components/PageTitle.vue'
import HQUnitVendorContent from '~/components/HQUnitVendorContent'
export default {
  name: 'UnitVendorPage',
  components: {
    BasePageLayout,
    SideBar,
    PageSubtitle,
    PageTitle,
    HQUnitVendorContent,
  },
  mixins: [unitMaintenanceMixin, sideBarNavTabsMixin(HQ_UNITS_TABS)],
  layout: 'hqlayout',
}
</script>

<style lang="scss" scoped></style>
