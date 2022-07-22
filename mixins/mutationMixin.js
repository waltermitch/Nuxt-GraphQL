import { formMixin } from '~/mixins/formMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'

export const mutationMixin = {
  mixins: [submitMessagesMixin, formMixin],
  methods: {
    async mutationAction(
      mutation,
      variablesObject,
      queryToRefetch,
      successMessage,
      errorMessage,
      variables,
      doNotClearState
    ) {
      const formValidated =
        this.$refs.form && (await this.$refs.form.validate())

      if (formValidated || !this.$refs.form) {
        try {
          // if I send the Query as null it doesn't run any query after mutation
          const res = await this.$apollo.mutate(queryToRefetch ? {
            mutation,
            variables: variablesObject,
            refetchQueries: [{ query: queryToRefetch, variables }],
          } : {
            mutation,
            variables: variablesObject,
          })
          if (!doNotClearState) {
            this.clearState()
          }

          // get the mutation name from the response
          let mutationName
          for ( const x in res.data ) {
            mutationName = x
          }

          // check if it has the error which is sent by developer
          if ( res.data[mutationName].status !== false && res.data[mutationName].status !== 'error' && res.data[mutationName].status !== 'ERROR' ) {
            this.showSubmitMessage(successMessage, 'success')
            return res
          } else {
            this.showSubmitMessage(res.data[mutationName].message || 'Not received Error message but has an error', 'error')
            return false
          }
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
        return false // return false when fail
      } else {
        this.showSubmitMessage('Form validation failed', 'error')
        return false // return false when fail
      }
    },
  },
}
