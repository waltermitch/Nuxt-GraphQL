<template>
  <div class="table">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  max-width: 1105px;
  background: #fff;
  border: 1px solid $gainsboro;
  border-radius: 8px;
}

.header {
  padding: 22px 20px 25px;
  background: $cultured;
  border-bottom: 1px solid $white-smoke;

  span {
    color: $night-rider;
    font-size: $font-s;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 5%;
  }
}
</style>
