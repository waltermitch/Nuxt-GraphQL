import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'

export const mutationMixin = {
  mixins: [submitMessagesMixin, formMixin],
  methods: {
    async mutationAction(
      mutation,
      variablesObject,
      queryToRefetch,
      successMessage,
      errorMessage
    ) {
      const formValidated =
        this.$refs.form && (await this.$refs.form.validate())

      if (formValidated || !this.$refs.form) {
        try {
          await this.$apollo.mutate({
            mutation,
            variables: variablesObject,
            refetchQueries: [{ query: queryToRefetch }],
          })
          this.clearState()
          this.showSubmitMessage(successMessage, 'success')
        } catch (error) {
          this.showSubmitMessage(errorMessage, 'error')
        }
      } else {
        this.showSubmitMessage('Form validation failed', 'error')
      }
    },
  },
}
