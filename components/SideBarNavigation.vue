<template>
  <nav class="navigation">
    <SideBarTab
      v-for="tab in navTabs"
      :key="tab.id"
      :page-url="tab.pageUrl"
      :icon-src="tab.iconSrc"
      :caption="tab.caption"
    />
  </nav>
</template>

<script>
import SideBarTab from './SideBarTab.vue'
export default {
  name: 'SideBarNavigation',
  components: { SideBarTab },
  props: {
    navTabs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
}
</style>
