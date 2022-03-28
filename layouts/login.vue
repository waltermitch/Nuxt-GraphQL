<template>
  <div class="container">
    <TheHeader only-logo />

    <div class="nuxt-container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
export default {
  name: 'LoginLayout',
  components: {
    TheHeader,
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}

.nuxt-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background: $platinum;
}
</style>
