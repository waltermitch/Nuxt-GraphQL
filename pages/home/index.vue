<template>
  <div></div>
</template>

<script>
export default {
  name: 'HomeIndexPage',
  middleware: 'redirectToSpecificPage',
  meta: {
    redirectTo: '/home/close-register',
  },
}
</script>

<style lang="scss" scoped></style>
