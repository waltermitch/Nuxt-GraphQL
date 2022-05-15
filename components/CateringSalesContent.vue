<template>
  <div class="content">
    <PageSubHeaderContent />

    <PageContentWrapper>
      <TabsView :tabs-headers="tabsHeaders" :tabs="tabs"></TabsView>
    </PageContentWrapper>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PageSubheader from './PageSubheader.vue'
import TabsView from './TabsView.vue'
import CateringSalesDetails from './CateringSalesDetails.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import CateringSalesItems from './CateringSalesItems.vue'
import CateringSalesShipAndBillTo from './CateringSalesShipAndBillTo.vue'
import PageSubHeaderContent from './PageSubHeaderContent.vue'
export default {
  name: 'CateringSalesContent',
  components: {
    PageSubheader,
    TabsView,
    CateringSalesDetails,
    PageContentWrapper,
    CateringSalesItems,
    CateringSalesShipAndBillTo,
    PageSubHeaderContent,
  },
  data() {
    return {
      tabsHeaders: ['Details', 'Items', 'Ship To/Bill To'],
      tabs: [
        CateringSalesDetails,
        CateringSalesItems,
        CateringSalesShipAndBillTo,
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
