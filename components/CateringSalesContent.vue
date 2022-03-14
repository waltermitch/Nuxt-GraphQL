<template>
  <div class="content">
    <PageSubheader>
      <PageSubheaderItem>
        <template #title>398</template>

        <template #subtitle>Unit Number</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>09/21/2019</template>

        <template #subtitle>Period End</template>
      </PageSubheaderItem>
    </PageSubheader>

    <PageContentWrapper>
      <TabsView :tabs-headers="tabsHeaders" :tabs="tabs"></TabsView>
    </PageContentWrapper>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import TabsView from './TabsView.vue'
import CateringSalesDetails from './CateringSalesDetails.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import CateringSalesItems from './CateringSalesItems.vue'
import CateringSalesShipAndBillTo from './CateringSalesShipAndBillTo.vue'
export default {
  name: 'CateringSalesContent',
  components: {
    PageSubheader,
    PageSubheaderItem,
    TabsView,
    CateringSalesDetails,
    PageContentWrapper,
    CateringSalesItems,
    CateringSalesShipAndBillTo,
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

<style lang="scss" scoped>
.content {
  div.subheader {
    justify-content: flex-start;

    div {
      margin-right: 120px;
    }
  }
}
</style>
