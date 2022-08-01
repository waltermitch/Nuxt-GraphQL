<template>
  <nav class="navigation">
    <HeaderTab
      v-for="tab in mutableNav"
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
import RolePrivileges from "~/graphql/queries/RolePrivileges.gql";
export default {
  name: 'HeaderNavigation',
  components: { HeaderTab },
  apollo: {
    RolePrivileges: {
      query: RolePrivileges,
    },
  },
  data() {
    return {
      mutableNav: {},
    }
  },
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
  watch: {
    headerTabs() {
      this.verifyPermissions();
    },
  },
  mounted() {
    this.verifyPermissions();
  },
  methods: {
    verifyPermissions() {
      this.mutableNav = [];

      for (const item of this.headerTabs) {
        let addItem = !item.permissionTabs;

        if (!addItem) {
          addItem = false;
          const returnTabs = [];

          for (const subItem of item.permissionTabs) {
            const permissionsFilter = (subItem.permission && this.RolePrivileges) ? !!this.RolePrivileges.filter(privilege => {
              return (privilege.slugName === subItem.permission.slugName) && (privilege.permissionType === subItem.permission.permissionType)
            }).length : null;

            if (!subItem.permission || permissionsFilter)
              returnTabs.push(subItem);
          }

          if (returnTabs.length)
            addItem = true;
        }

        if (addItem)
          this.mutableNav.push(item);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;

  @media screen and (max-width: $lg) {
    flex-direction: column;
  }
}
</style>
