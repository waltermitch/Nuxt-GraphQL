<template>
  <div class="tables">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CustomTablesArea',
}
</script>

<style lang="scss" scoped>
.tables {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and(max-width: $xl) {
    flex-direction: column-reverse;
  }
}
</style>
