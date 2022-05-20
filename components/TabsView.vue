<template>
  <div>
    <header class="header">
      <ul class="list">
        <li
          v-for="(tabHeader, index) in tabsHeaders"
          :key="tabHeader"
          class="item"
          :class="{
            active: activeTab === index,
          }"
          @click="$store.commit('tabsView/SET_ACTIVE_TAB', index)"
        >
          {{ tabHeader }}
        </li>
      </ul>
    </header>

    <div class="content">
      <KeepAlive>
        <component :is="tabs[activeTab]" />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
export default {
  name: 'TabsView',
  mixins: [tabsViewMixin],
  props: {
    tabsHeaders: {
      type: Array,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      activeTab: 'tabsView/getActiveTab',
    }),
  },
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 37px;
}

.list {
  display: flex;
  border-bottom: 2px solid $white-smoke;
  @media screen and (max-width: $lg) {
    overflow: auto;
  }
}

.item {
  padding: 0 30px;
  font-size: $font-s;
  font-weight: 500;
  line-height: 40px;
  color: $suva-grey;
  transition: $transition;
  cursor: pointer;
  @media screen and (max-width: $lg) {
    white-space: nowrap;
  }
  &:hover {
    margin-bottom: -2px;
    color: $firebrick;
    border-bottom: 2px solid $firebrick;
  }
}

.active {
  margin-bottom: -2px;
  color: $firebrick;
  border-bottom: 2px solid $firebrick;
}
</style>
