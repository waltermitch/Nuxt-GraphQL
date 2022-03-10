<template>
  <NuxtLink :to="pageUrl" class="tab">
    <img :src="iconSrc" class="icon" />

    <span class="caption">{{ caption }}</span>
  </NuxtLink>
</template>

<script>
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
  transition: all ease-in-out 0.3s;

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

  span.caption {
    color: #fff;
  }

  &:hover {
    background: #fff;

    span.caption {
      color: $night-rider;
    }

    img.icon {
      filter: brightness(0) saturate(100%) invert(38%) sepia(17%) saturate(0%)
        hue-rotate(256deg) brightness(99%) contrast(97%);
    }
  }
}
</style>
