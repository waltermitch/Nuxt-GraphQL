<template>
  <button
    class="button"
    :class="{
      'button--red': buttonColorGamma === 'red',
      'button--white': buttonColorGamma === 'white',
    }"
    :style="{ padding }"
    @click="buttonEvent"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: {
    padding: {
      type: String,
      default: '10px 12px',
    },
    buttonColorGamma: {
      type: String,
      default: 'red',
    },
  },
  methods: {
    buttonEvent() {
      this.$emit('event')
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  border-radius: 3px;
  font-size: $font-s;
  line-height: 20px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  &--red {
    color: #fff;
    background: $brown;
  }

  &--white {
    color: #000;
    background: #fff;
    border: 1px solid $gainsboro;
  }
}
</style>
