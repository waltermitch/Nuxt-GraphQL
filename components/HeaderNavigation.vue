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
import { mapGetters } from 'vuex'
import { HEADER_TABS, HQ_HEADER_TABS } from '../constants/constants'
import HeaderTab from './HeaderTab.vue'
export default {
  name: 'HeaderNavigation',
  components: { HeaderTab },
  computed: {
    ...mapGetters({
      role: 'auth/getRole',
    }),
    headerTabs() {
      switch (this.role) {
        case 'admin':
          return HQ_HEADER_TABS
        default:
          return HEADER_TABS
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;

  @media screen and (max-width: $md) {
    flex-direction: column;
  }
}
</style>
