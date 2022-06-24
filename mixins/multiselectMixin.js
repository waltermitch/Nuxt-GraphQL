import Multiselect from 'vue-multiselect'

export const multiselectMixin = {
  components: { Multiselect },
  methods: {
    nameWithId({ name, code }) {
      return `${code} — ${name}`
    },
  },
}
