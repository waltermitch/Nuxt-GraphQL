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

  div.table:first-child {
    width: 75%;
    margin-right: 60px;
  }

  div.table:last-child {
    width: 25%;
  }

  @media screen and(max-width: $xl) {
    flex-direction: column-reverse;
    margin-right: 0;
  }
}
</style>
