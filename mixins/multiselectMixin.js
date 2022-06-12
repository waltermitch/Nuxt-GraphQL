import Multiselect from 'vue-multiselect'

export const multiselectMixin = {
  components: { Multiselect },
  methods: {
    nameWithId({ name, id }) {
      return `${id} — ${name}`
    },
  },
}
