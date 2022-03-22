<template>
  <div></div>
</template>

<script>
export default {
  name: 'AdminIndexPage',
  middleware: 'redirectToSpecificPage',
  meta: {
    redirectTo: '/admin/close-week',
  },
}
</script>

<style lang="scss" scoped></style>
