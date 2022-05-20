<template>
  <PageSubheader>
    <PageSubheaderItem>
      <template #title>{{ selectedUnit && selectedUnit.code }}</template>

      <template #subtitle>Unit Number</template>
    </PageSubheaderItem>

    <PageSubheaderItem>
      <template #title>{{ selectedUnit && selectedUnit.periodEnd }}</template>

      <template #subtitle>Period End</template>
    </PageSubheaderItem>
  </PageSubheader>
</template>

<script>
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import { meMixin } from '~/mixins/meMixin'
export default {
  name: 'PageSubHeaderContent',
  components: { PageSubheader, PageSubheaderItem },
  mixins: [meMixin],
}
</script>

<style lang="scss" scoped>
div.subheader {
  justify-content: flex-start;
  overflow: auto;
  div {
    @media screen and (min-width: $lg) {
      margin-right: 120px;
    }
    @media screen and (max-width: $lg) {
      margin-right: 30px;
    }
  }
}
</style>
