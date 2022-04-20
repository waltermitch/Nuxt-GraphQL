export const mutationMixin = {
  methods: {
    async mutationAction(
      mutation,
      variablesObject,
      queryToRefetch,
      successMessage,
      errorMessage
    ) {
      const formValidated = await this.$refs.form.validate()

      if (formValidated) {
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
