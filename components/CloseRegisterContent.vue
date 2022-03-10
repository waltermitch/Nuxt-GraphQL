<template>
  <div>
    <PageSubheader>
      <PageSubheaderItem>
        <template #title>398</template>

        <template #subtitle>Unit Number</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>09/21/2019</template>

        <template #subtitle>Period End</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>Reg#2</template>

        <template #subtitle>Register Name</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>Register#2</template>

        <template #subtitle>Register Name</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>$0.00</template>

        <template #subtitle>Total Daily Deposit</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>11/11/2021</template>

        <template #subtitle>Close Date</template>
      </PageSubheaderItem>
    </PageSubheader>
  </div>
</template>

<script>
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
export default {
  name: 'CloseRegisterContent',
  components: { PageSubheader, PageSubheaderItem },
}
</script>

<style lang="scss" scoped></style>
