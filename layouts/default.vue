<template>
  <div class="container">
    <TheHeader />

    <div class="nuxt-container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
  },
}
</script>

<style lang="scss" scoped></style>
