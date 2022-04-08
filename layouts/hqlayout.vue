<template>
  <div class="container">
    <TheHeader />

    <div class="nuxt-container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/TheHeader'
export default {
  name: 'HQLayout',
  components: {
    TheHeader,
  },
  middleware: ['isAuth', 'authAdmin'],
  mounted() {
    this.setRole('admin')
  },
  methods: {
    ...mapActions({
      setRole: 'auth/setRole',
    }),
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
  min-height: calc(100vh - 100px);
}
</style>
