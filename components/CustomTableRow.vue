<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CustomTableRow',
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 20px;
  border-bottom: 1px solid $white-smoke;
}
</style>
