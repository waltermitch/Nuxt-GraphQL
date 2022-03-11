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
          @click="activeTab = index"
        >
          {{ tabHeader }}
        </li>
      </ul>
    </header>

    <div class="content">
      <component :is="tabs[activeTab]" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabsView',
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
  data() {
    return {
      activeTab: 0,
    }
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
}

.item {
  padding: 0 30px;
  font-size: $font-s;
  font-weight: 500;
  line-height: 40px;
  transition: color linear 0.3s;
  cursor: pointer;

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
