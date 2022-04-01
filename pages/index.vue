<template>
  <p>Home page</p>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'redirectToSpecificPage',
  meta: {
    redirectTo: '/home/select-unit',
  },
}
</script>
