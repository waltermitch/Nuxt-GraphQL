<template>
  <nav class="navigation">
    <HeaderTab
      v-for="tab in headerTabs"
      :key="tab.id"
      :to="tab.to"
      :icon-src="tab.src"
      :name="tab.name"
    />
  </nav>
</template>

<script>
import { HEADER_TABS } from '../constants/constants'
import HeaderTab from './HeaderTab.vue'
export default {
  name: 'HeaderNavigation',
  components: { HeaderTab },
  data() {
    return {
      headerTabs: HEADER_TABS,
    }
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
}
</style>
