<template>
  <NuxtLink class="tab" :to="to">
    <img :src="iconSrc" />

    <span class="caption">
      {{ name }}
    </span>
  </NuxtLink>
</template>

<script>
export default {
  name: 'HeaderTab',
  props: {
    to: {
      type: String,
      required: true,
    },
    iconSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  width: 89px;
  height: 82px;
  border-radius: 5px;
  transition: all 0.4s linear;

  &:hover {
    background: $firebrick;
  }
}

.caption {
  margin-top: 10px;
  font-size: $font-s;
  font-weight: 600;
  color: #fff;
}

.nuxt-link-exact-active {
  background: $firebrick;
}
</style>
