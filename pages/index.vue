<template>
  <p>Home page</p>
</template>

<script>
import Me from '~/graphql/queries/me.query.gql'
export default {
  name: 'IndexPage',
  async mounted() {
    const {
      data: { me },
    } = await this.$apollo.query({ query: Me })

    if (me.isAdmin) {
      this.$router.push('/hq-maintenance')
    } else {
      this.$router.push('/home')
    }
  },
}
</script>
