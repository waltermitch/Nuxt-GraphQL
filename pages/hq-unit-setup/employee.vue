<template>
  <BasePageLayout>
    <template #sideBar>
      <SideBar :nav-tabs="navTabs" />
    </template>

    <template #header>
      <PageSubtitle> Unit Setup / Unit Employee </PageSubtitle>

      <PageTitle> Employee </PageTitle>
    </template>

    <template #content>
      <HQEmployeeToUnitContent />
    </template>
  </BasePageLayout>
</template>

<script>
import { HQ_UNITS_TABS } from '~/constants/constants'
import { sideBarNavTabsMixin } from '~/mixins/sideBarNavTabsMixin'
import BasePageLayout from '~/components/BasePageLayout.vue'
import SideBar from '~/components/SideBar.vue'
import PageSubtitle from '~/components/PageSubtitle.vue'
import PageTitle from '~/components/PageTitle.vue'
import HQEmployeeToUnitContent from '~/components/HQEmployeeToUnitContent.vue'
export default {
  name: 'EmployeeToUnitPage',
  components: {
    BasePageLayout,
    SideBar,
    PageSubtitle,
    PageTitle,
    HQEmployeeToUnitContent,
  },
  mixins: [sideBarNavTabsMixin(HQ_UNITS_TABS)],
  layout: 'hqlayout',
  created() {
    this.$store.commit('sidebar/SET_MENU', this.navTabs)
  },
}
</script>

<style lang="scss" scoped></style>
