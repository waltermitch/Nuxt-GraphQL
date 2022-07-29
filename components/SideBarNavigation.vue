<template>
  <nav class="navigation">
    <SideBarTab
      v-for="tab in mutableNav"
      :key="tab.id"
      :page-url="tab.pageUrl"
      :icon-src="tab.iconSrc"
      :caption="tab.caption"
    />
  </nav>
</template>

<script>
import SideBarTab from './SideBarTab.vue'
import CheckPermission from "~/graphql/mutations/checkPermissions/checkPermissions.gql";

export default {
  name: 'SideBarNavigation',
  components: {SideBarTab},
  props: {
    navTabs: {
      type: [Array, String],
      required: true,
    },
  },
  data() {
    return {
      mutableNav: {},
    }
  },
  mounted() {
    this.verifyPermissions();
  },
  methods: {
    async verifyPermissions() {
      this.mutableNav = [];

      for (const item of this.navTabs) {
        if (!item.permission) {
          this.mutableNav.push(item);
        } else {
          await this.$apollo.mutate({
            mutation: CheckPermission,
            variables: item.permission,
          }).then((res) => {
            console.log(res.data.checkPermission.permission);

            if (res.data.checkPermission.permission)
              this.mutableNav.push(item);
          });
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  width: 240px;

  &--active {
    @media screen and (max-width: $md) {
      position: absolute;
      width: 220px;
      height: 100%;
      background: white;
      z-index: 10;
    }
  }
}

.icon {
  cursor: pointer;
  transition: $transition;
  height: 24px;
  width: 24px;
  margin-left: 10px;
  margin-bottom: 10px;

  @media screen and (min-width: calc($lg + 1px)) {
    display: none;
  }

  &--active {
    transform: rotateY(180deg);
  }
}
</style>
