<template>
  <div></div>
</template>

<script>
export default {
  name: 'HomeIndexPage',
  middleware: 'redirectToSpecificPage',
  meta: {
    redirectTo: '/home/select-unit',
  },
}
</script>

<style lang="scss" scoped></style>
