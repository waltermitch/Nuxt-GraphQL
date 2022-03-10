<template>
  <div class="subheader">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageSubheader',
}
</script>

<style lang="scss" scoped>
.subheader {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid $white-smoke;
}
</style>
