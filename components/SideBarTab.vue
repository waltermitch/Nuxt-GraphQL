<template>
  <NuxtLink :to="pageUrl" class="tab" :class="{ 'tab--active': isShowSideBar }">
    <img :src="iconSrc" class="icon" />

    <span v-show="width > 768" class="caption">{{ caption }}</span>
    <span v-if="isShowSideBar" class="caption">{{ caption }}</span>
  </NuxtLink>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBarTab',
  props: {
    pageUrl: {
      type: String,
      required: true,
    },
    iconSrc: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      width: process.client && window.innerWidth,
    }
  },
  computed: {
    ...mapGetters({
      isShowSideBar: 'sidebar/getIsShowSideBar',
    }),
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      if (process.client) {
        this.width = window.innerWidth
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 208px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: $transition;

  @media screen and (max-width: $md) {
    width: fit-content;
  }

  &--active {
    width: 100%;
  }

  img.icon {
    filter: brightness(0) saturate(100%) invert(47%) sepia(0%) saturate(991%)
      hue-rotate(185deg) brightness(84%) contrast(94%);
  }

  &:hover {
    background: $firebrick;

    span.caption {
      color: #fff;
    }

    img.icon {
      filter: brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(0%)
        hue-rotate(172deg) brightness(103%) contrast(105%);
    }
  }
}

.icon {
  width: 24px;
  height: 24px;
}

.caption {
  margin-left: 15px;
  color: $night-rider;
  font-size: $font-s;
  font-weight: 500;
}

.nuxt-link-exact-active {
  background: $firebrick;

  img.icon {
    filter: brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(0%)
      hue-rotate(172deg) brightness(103%) contrast(105%);
  }

  span.caption {
    color: #fff;
  }
}
</style>
