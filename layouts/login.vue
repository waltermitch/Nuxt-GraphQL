<template>
  <div class="container">
    <TheHeader only-logo />

    <div class="nuxt-container">
      <Nuxt />

      <FormSubmissionMessage
        v-if="showMessage"
        :type="messageType"
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import TheHeader from '@/components/TheHeader'
export default {
  name: 'LoginLayout',
  components: {
    TheHeader,
  },
  mixins: [submitMessagesMixin],
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}

.nuxt-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background: $platinum;
}
</style>
