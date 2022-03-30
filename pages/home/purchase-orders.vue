<template>
  <BasePageLayout>
    <template #sideBar>
      <SideBar :nav-tabs="navTabs" />
    </template>

    <template #header>
      <PageSubtitle>Home / Purchase Orders</PageSubtitle>

      <PageTitle>Purchase Orders</PageTitle>
    </template>

    <template #content>
      <PurchaseOrdersContent />
    </template>
  </BasePageLayout>
</template>

<script>
import { HOME_NAV_TABS } from '~/constants/constants'
import BasePageLayout from '~/components/BasePageLayout.vue'
import SideBar from '~/components/SideBar.vue'
import PageSubtitle from '~/components/PageSubtitle.vue'
import PageTitle from '~/components/PageTitle.vue'
import PurchaseOrdersContent from '~/components/PurchaseOrdersContent.vue'
export default {
  name: 'PurchaseOrdersPage',
  components: {
    BasePageLayout,
    SideBar,
    PageSubtitle,
    PageTitle,
    PurchaseOrdersContent,
  },
  data() {
    return {
      navTabs: HOME_NAV_TABS,
    }
  },
}
</script>

<style lang="scss" scoped></style>
