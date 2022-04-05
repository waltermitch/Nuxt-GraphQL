<template>
  <BasePageLayout>
    <template #sideBar>
      <SideBar :nav-tabs="navTabs" />
    </template>

    <template #header>
      <PageSubtitle> Maintenance / Send Unit Update </PageSubtitle>

      <PageTitle> Send Unit Update </PageTitle>
    </template>

    <template #content>
      <HQSendUnitUpdateContent />
    </template>
  </BasePageLayout>
</template>

<script>
import { HQ_MAINTENANCE_TABS } from '~/constants/constants'
import BasePageLayout from '~/components/BasePageLayout.vue'
import SideBar from '~/components/SideBar.vue'
import PageSubtitle from '~/components/PageSubtitle.vue'
import PageTitle from '~/components/PageTitle.vue'
import HQSendUnitUpdateContent from '~/components/HQSendUnitUpdateContent.vue'
export default {
  name: 'SendUnitUpdatePage',
  components: {
    BasePageLayout,
    SideBar,
    PageSubtitle,
    PageTitle,
    HQSendUnitUpdateContent,
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
