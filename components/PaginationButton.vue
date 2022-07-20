<template>
  <button
    class="pagination-button"
    :disabled="disabled"
    @click="clickEvent"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PaginationButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickEvent() {
      this.$emit('event')
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination-button {
    transition: $transition;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    width: 30px;
    height: 30px;

    margin: 0px 5px;

    border-radius: 5px;
    font-size: $font-xs;

    color: #000;
    background: #fff;
    border: 1px solid $gainsboro;

    &:disabled {
        background: $thistle;
        cursor: not-allowed;
    }
    &:hover:not(:disabled) {
        border: 1px solid $firebrick;
    }
}
</style>
