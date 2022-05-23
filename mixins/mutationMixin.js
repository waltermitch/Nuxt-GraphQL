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
          const res = await this.$apollo.mutate({
            mutation,
            variables: variablesObject,
            refetchQueries: [{ query: queryToRefetch }],
          })
          this.clearState()
          this.showSubmitMessage(successMessage, 'success')

          return res
        } catch (error) {
          const errorObj = error.graphQLErrors[0]
          const extensionsErrorName = errorObj.extensions.category
          if (extensionsErrorName === 'validation') {
            const propNames = Object.getOwnPropertyNames(
              error.graphQLErrors[0].extensions.validation
            )
            this.showSubmitMessage(
              error.graphQLErrors[0].extensions.validation[propNames[0]][0],
              'error'
            )
          } else {
            const errMessage = errorObj.message
            const errorMessageArray = errMessage.split(';')
            if (errorMessageArray.length > 1) {
              this.showSubmitMessage(errorMessageArray[1], 'error')
            } else {
              this.showSubmitMessage(errMessage, 'error')
            }
          }
        }
      } else {
        this.showSubmitMessage('Form validation failed', 'error')
      }
    },
  },
}
