<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageContentWrapper',
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 24px 76px 20px;
}
</style>
