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
      const validate = await this.$refs.form.validate()
      const formValidated =
        this.$refs.form && validate
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
            this.showSubmitMessage(res.data[mutationName].message || errorMessage || 'Not received Error message but has an error', 'error')
            return false
          }
        } catch (error) {
          const errorObj = error.graphQLErrors[0]
          console.log('Mutation Error', errorObj);

          const extensionsErrorName = errorObj.extensions.category
          if (extensionsErrorName === 'validation') {
            const propNames = Object.getOwnPropertyNames(
              error.graphQLErrors[0].extensions.validation
            )

            let graphQLErrorMessage = error.graphQLErrors[0].extensions.validation[propNames[0]][0];

            // HQStateContent - /hq-accounting/state
            graphQLErrorMessage = graphQLErrorMessage.replace(/state code/g,'"State Code"');
            graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax cafeteria/g,'"Sales Tax - Cafeteria"');
            graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax vending/g,'"Sales Tax - Vending"');
            graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax restaurant/g,'"Sales Tax - Restaurant"');
            graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax store/g,'"Sales Tax - C Store"');
            graphQLErrorMessage = graphQLErrorMessage.replace(/gross receipts tax/g,'"Gross Receipts Tax"');

            this.showSubmitMessage(graphQLErrorMessage, 'error');
          } else {
            const errMessage = errorObj.message
            const errorMessageArray = errMessage.split(';')
            console.log(errMessage, errorMessageArray)
            if (errorMessageArray.length > 1) {
              this.showSubmitMessage(errorMessageArray[1], 'error')
            } else {
              this.showSubmitMessage(errMessage, 'error')
            }
          }
        }
        return false // return false when fail
      } else {
        let errorSelected = false;
        const errorData = {};

        const fields = this.$refs.form.fields;
        // eslint-disable-next-line no-unreachable-loop
        for ( const fieldName in fields ) {
          const field = fields[fieldName];
          if ( field.failed ) { // if has an error
            errorData.fieldName = fieldName;
            const failedRules = field.failedRules;
            // eslint-disable-next-line no-unreachable-loop
            for ( const ruleName in failedRules ) {
              errorData.ruleName = ruleName;
              errorData.errorMessage = failedRules[ruleName];
              errorSelected = true;
              break;
            }
            if ( errorSelected ) {
              break;
            }
          }
        }

        // show formatted error message
        const errorMessage = this.getFormattedErrorMessage(errorData);
        this.showSubmitMessage(errorMessage, 'error')

        return false // return false when fail
      }
    },
    getFormattedErrorMessage(errorData) {
      console.log('error data', errorData);

      const inputName = this.getInputName(errorData);

      const errorMessage = this.getErrorMessage(errorData);

      return `The "${inputName}" ${errorMessage}`;
    },
    getInputName(errorData) {
      let inputName = 'unknown';
      const fieldName = errorData.fieldName;

      // HQStateContent - /hq-accounting/state
      if ( fieldName === 'state-code' ) {
        inputName = 'State Code';
      } else if ( fieldName === 'state-salesTaxCafeteria' ) {
        inputName = 'Sales Tax - Cafeteria';
      } else if ( fieldName === 'state-salesTaxVending' ) {
        inputName = 'Sales Tax - Vending';
      } else if ( fieldName === 'state-salesTaxRestaurant' ) {
        inputName = 'Sales Tax - Restaurant';
      } else if ( fieldName === 'state-salesTaxStore' ) {
        inputName = 'Sales Tax - C Store';
      } else if ( fieldName === 'state-grossReceiptsTax' ) {
        inputName = 'Gross Receipts Tax';
      }


      /*
      // 
      if ( fieldName === '' ) {
        inputName = '';
      } else if ( fieldName === '' ) {
        inputName = '';
      }
      */

      return inputName;
    },
    getErrorMessage(errorData) {
      let errorMessage = 'unknown';
      const ruleName = errorData.ruleName;
      if ( ruleName === 'required' ) {
        errorMessage = 'is required';
      } else if ( ruleName === 'alpha' ) {
        errorMessage = 'should be alphabetic';
      }
      return errorMessage;
    }
  },
}
