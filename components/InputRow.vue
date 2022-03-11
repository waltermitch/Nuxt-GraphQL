<template>
  <div class="input-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'InputsRow',
}
</script>

<style lang="scss" scoped>
.input-row {
  display: flex;

  div:first-child {
    margin-right: 20px;
  }
}
</style>
