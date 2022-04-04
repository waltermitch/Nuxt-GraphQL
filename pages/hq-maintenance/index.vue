<template>
  <div></div>
</template>

<script>
export default {
  name: 'HomeIndexPage',
  layout: 'hqlayout',
  middleware: 'redirectToSpecificPage',
  meta: {
    redirectTo: 'hq-maintenance/export-purchases',
  },
}
</script>

<style lang="scss" scoped></style>
