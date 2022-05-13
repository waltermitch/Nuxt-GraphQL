<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <NuxtLink to="/" class="logo">
          <img src="~assets/images/header/logo.svg" />
        </NuxtLink>

        <HeaderNavigation v-if="!onlyLogo" />
      </div>

      <div v-if="!onlyLogo" class="profile">
        <img src="~assets/images/header/avatar.svg" />

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          :class="{
            'icon--active': isShowDropdown,
          }"
          @click="isShowDropdown = !isShowDropdown"
        >
          <path
            d="M15.8798 9.29006L11.9998 13.1701L8.11979 9.29006C7.72978 8.90006 7.09978 8.90006 6.70978 9.29006C6.31978 9.68006 6.31978 10.3101 6.70978 10.7001L11.2998 15.2901C11.6898 15.6801 12.3198 15.6801 12.7098 15.2901L17.2998 10.7001C17.6898 10.3101 17.6898 9.68006 17.2998 9.29006C16.9098 8.91006 16.2698 8.90006 15.8798 9.29006Z"
            fill="white"
          />
        </svg>

        <div v-if="isShowDropdown" class="logout">
          <span class="logout-item" @click="logout">Logout</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Logout from '../graphql/mutations/logout.gql'
import HeaderNavigation from './HeaderNavigation.vue'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
export default {
  name: 'TheHeader',
  components: { HeaderNavigation },
  mixins: [submitMessagesMixin],
  props: {
    onlyLogo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShowDropdown: false,
    }
  },
  methods: {
    async logout() {
      const {
        data: { logout },
      } = await this.$apollo.mutate({
        mutation: Logout,
      })

      if (logout.status === 'TOKEN_REVOKED') {
        this.$apolloHelpers.onLogout()
        this.showSubmitMessage(logout.message, 'success')
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
  background: $nero;

  &-left {
    display: flex;
  }
}

.logo {
  display: flex;
  margin-right: 80px;

  img {
    height: 82px;
    width: 135px;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  max-width: $xxl;
  margin: 0 auto;
  padding: 8px 40px 10px;
}

.profile {
  position: relative;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
  }
}

.logout {
  position: absolute;
  right: 0;
  bottom: -110px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 150px;
  background: #ffffff;
  box-shadow: 2px 2px 4px rgba(196, 197, 221, 0.25),
    -2px -2px 4px rgba(196, 197, 221, 0.25);
  border-radius: 2px;

  &-item {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;

    &:hover {
      color: $firebrick;
    }
  }
}

.icon {
  cursor: pointer;
  transition: $transition;

  &--active {
    transform: rotateX(180deg);
  }
}
</style>
