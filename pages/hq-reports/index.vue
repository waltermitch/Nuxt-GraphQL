<template>
  <div></div>
</template>

<script>
export default {
  name: 'HQReportsIndexPage',
  layout: 'hqlayout',
  middleware: 'redirectToSpecificPage',
  meta: {
    redirectTo: '/hq-reports/labor-schedule-report',
  },
}
</script>

<style lang="scss" scoped></style>
