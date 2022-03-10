<template>
  <div class="section">
    <slot name="sideBar"></slot>

    <main class="container">
      <header class="header">
        <slot name="header"></slot>
      </header>

      <div class="content">
        <slot name="content"></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BasePageLayout',
}
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  width: 100%;
  max-width: $xxl;
}

.container {
  width: 100%;
  background: $cultured;
}

.header {
  padding: 24px 20px 22px;
  background: #fff;
  border-bottom: 1px solid $white-smoke;
  width: 100%;

  h3 {
    margin-bottom: 2px;
  }
}

.content {
  width: 100%;
}
</style>
