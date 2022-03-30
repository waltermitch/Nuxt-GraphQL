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
      <TabsView :tabs-headers="tabsHeaders" :tabs="tabs" />
    </PageContentWrapper>
  </div>
</template>

<script>
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import TabsView from './TabsView.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import PurchaseOrdersDetails from './PurchaseOrdersDetails.vue'
import PurchaseOrdersItems from './PurchaseOrdersItems.vue'
export default {
  name: 'PurchaseOrdersContent',
  components: {
    PageSubheader,
    PageSubheaderItem,
    TabsView,
    PageContentWrapper,
  },
  data() {
    return {
      tabsHeaders: ['Details', 'Items'],
      tabs: [PurchaseOrdersDetails, PurchaseOrdersItems],
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
