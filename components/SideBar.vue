<template>
  <aside class="sidebar">
    <SideBarNavigation :nav-tabs="navTabs" />
  </aside>
</template>

<script>
import SideBarNavigation from './SideBarNavigation.vue'
export default {
  name: 'SideBar',
  components: { SideBarNavigation },
  props: {
    navTabs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  width: 240px;
  padding: 16px;
  border-right: 1px solid $white-smoke;
}
</style>
