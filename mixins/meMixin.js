import Me from '~/graphql/queries/me.query.gql'
export const meMixin = {
  apollo: {
    me: {
      query: Me,
    },
  },
  computed: {
    selectedUnit() {
      return this.me && this.me.selectedUnit
    },
  },
}
