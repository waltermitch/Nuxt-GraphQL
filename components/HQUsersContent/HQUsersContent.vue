<template>
  <div>
    <component :is="isShowAddUser" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "HQUsersContent",
  computed: {
    ...mapGetters({
      isShowAddUser: 'users/getShowAddUser',
    }),
  },
  methods:{

  },
}
</script>

<style scoped>

</style>
