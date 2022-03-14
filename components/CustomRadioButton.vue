<template>
  <div
    class="radio-container"
    :style="{ width, height, borderRadius }"
    @click="setIsActive"
  >
    <div
      class="radio"
      :class="{ 'radio-active': isActive }"
      :style="{
        width: radioWidth,
        height: radioHeight,
        borderRadius: radioBorderRadius,
      }"
    ></div>

    <span class="title">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CustomRadioButton',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    withTitle: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '20px',
    },
    radioWidth: {
      type: String,
      default: '12px',
    },
    height: {
      type: String,
      default: '20px',
    },
    radioHeight: {
      type: String,
      default: '12px',
    },
    borderRadius: {
      type: String,
      default: '3px',
    },
    radioBorderRadius: {
      type: String,
      default: '0px',
    },
  },
  methods: {
    setIsActive() {
      this.$emit('set-is-active')
    },
  },
}
</script>

<style lang="scss" scoped>
.radio {
  cursor: pointer;

  &-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px;
    border: 1.5px solid $dark-grey;
  }

  &-active {
    background: $firebrick;
  }
}

.caption {
  margin-left: 8px;
  font-size: $font-s;
  line-height: 20px;
}
</style>
