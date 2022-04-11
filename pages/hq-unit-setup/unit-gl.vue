<template>
  <div></div>
</template>

<script>
import { HQ_UNITS_TABS } from '~/constants/constants'
import { sideBarNavTabsMixin } from '~/mixins/sideBarNavTabsMixin'
// import BasePageLayout from '~/components/BasePageLayout.vue'
// import SideBar from '~/components/SideBar.vue'
// import PageSubtitle from '~/components/PageSubtitle.vue'
// import PageTitle from '~/components/PageTitle.vue'
// import DefaultButton from '~/components/DefaultButton.vue'
export default {
  name: 'UnitGL',
  components: {
    // BasePageLayout,
    // SideBar,
    // PageSubtitle,
    // PageTitle,
    // DefaultButton,
  },
  mixins: [sideBarNavTabsMixin(HQ_UNITS_TABS)],
  layout: 'hqlayout',
}
</script>

<style lang="scss" scoped></style>
