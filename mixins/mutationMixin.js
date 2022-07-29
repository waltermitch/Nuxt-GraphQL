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
      // const validate = await this.$refs.form.validate()
      const formValidated =
        this.$refs.form && await this.$refs.form.validate()
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
            console.log('Mutation Error1', res.data[mutationName].message);

            let error = res.data[mutationName].message;
            if ( error !== undefined ) {
              // HQRoles-Create,Edit - /hq-accounting/roles
              if ( error.includes('roleName') === true ) {
                error = error.replace(/roleName/g,'"Role Name"');
              }
            } else {
              // HQUsers-Create,Edit - /hq-accounting/users
              // eslint-disable-next-line no-lonely-if
              if ( mutationName === 'createUser' ) {
                error = "Please select the units for the user.";
              }
            }

            this.showSubmitMessage(error || errorMessage || 'Not received Error message but has an error', 'error')
            return false
          }
        } catch (error) {
          console.log('Mutation Error2', error);
          const errorObj = error.graphQLErrors[0];

          const extensionsErrorName = errorObj.extensions.category
          if (extensionsErrorName === 'validation') {
            const propNames = Object.getOwnPropertyNames(
              error.graphQLErrors[0].extensions.validation
            )

            let graphQLErrorMessage = error.graphQLErrors[0].extensions.validation[propNames[0]][0];
            
            console.log('Error at', graphQLErrorMessage);
            
            // HQStateContent - /hq-accounting/state
            if ( propNames[0].includes('stateInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/code/g,'"State Code"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax cafeteria/g,'"Sales Tax - Cafeteria"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax vending/g,'"Sales Tax - Vending"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax restaurant/g,'"Sales Tax - Restaurant"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/sales tax store/g,'"Sales Tax - C Store"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/gross receipts tax/g,'"Gross Receipts Tax"');
            }
            
            // HQCountyContent - /hq-accounting/county
            if ( propNames[0].includes('countyInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/name/g,'"County Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/tax/g,'"County Tax"');
            }

            // HQCityContent - /hq-accounting/city
            if ( propNames[0].includes('cityInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/name/g,'"City Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/tax/g,'"City Sales Tax"');
            }

            // HQDistrictContent - /hq-accounting/district
            if ( propNames[0].includes('districtInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/name/g,'"District Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/code/g,'"District Code"');
            }

            // HQVendorContent - /hq-accounting/vendor
            if ( propNames[0].includes('vendorInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/name/g,'"Vendor Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/code/g,'"Vendor Number"');
            }

            // HQRoles-Create,Edit - /hq-accounting/roles
            if ( propNames[0].includes('roleInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/role input.role name/g,'"Role Name"');
            }

            // HQUsers-Create,Edit - /hq-accounting/users
            if ( propNames[0].includes('userInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/first name/g,'"User First Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/last name/g,'"User Last Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The email must/g,'The "User Email" must');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The email has/g,'The "User Email" has');
            }

            // HQPeriodsContent - /hq-accounting/periods
            if ( propNames[0].includes('periodInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/period-end/g,'"Period End"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/year/g,'"Period Year"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/month/g,'"Period Month"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/week/g,'"Period Week"');
            }

            // HQInventoryCategoriesContent - /hq-accounting/inventory-categories
            if ( propNames[0].includes('inventoryCategoryInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/name/g,'"InventoryCategory Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/vending/g,'"InventoryCategory Vending"');
            }

            // HQTermsContent - /hq-accounting/terms
            if ( propNames[0].includes('termInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/name/g,'"Term Name"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/disc percent/g,'"Term Disc Percent"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/disc days/g,'"Term Disc Days"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/due days/g,'"Term Due Days"');
            }

            // HQCalculationCodesContent - /hq-accounting/calculation-codes
            if ( propNames[0].includes('calculationCodeInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/The calculation code input.code /g,'The "CalculationCode Code" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The calculation code input.description /g,'The "CalculationCode Description" ');
            }

            // HQUnitsTableContent,HQUnitMaintenance - Detail, Financials, Fees - /hq-unit-setup/unit-info
            if ( propNames[0].includes('unitInput') === true ) {
              graphQLErrorMessage = graphQLErrorMessage.replace(/a/g,'The "CalculationCode Code" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/a/g,'The "CalculationCode Description" ');
            }

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

      // HQCountyContent - /hq-accounting/county
      if ( fieldName === 'county-name' ) {
        inputName = 'County Name';
      } else if ( fieldName === 'county-tax' ) {
        inputName = 'County Tax';
      }

      // HQCityContent - /hq-accounting/city
      if ( fieldName === 'city-name' ) {
        inputName = 'City Name';
      } else if ( fieldName === 'city-tax' ) {
        inputName = 'City Sales Tax';
      }

      // HQDistrictContent - /hq-accounting/district
      if ( fieldName === 'district-name' ) {
        inputName = 'District Name';
      } else if ( fieldName === 'district-code' ) {
        inputName = 'District Code';
      }

      // HQVendorContent - /hq-accounting/vendor
      if ( fieldName === 'vendor-name' ) {
        inputName = 'Vendor Name';
      } else if ( fieldName === 'vendor-code' ) {
        inputName = 'Vendor Number';
      }

      // HQRoles-Create,Edit - /hq-accounting/roles
      if ( fieldName === 'role-name' ) {
        inputName = 'Role Name';
      }

      // HQUsers-Create,Edit - /hq-accounting/users
      if ( fieldName === 'user-first-name' ) {
        inputName = 'User First Name';
      } else if ( fieldName === 'user-email' ) {
        inputName = 'User Email';
      } else if ( fieldName === 'user-password' ) {
        inputName = 'User Password';
      }

      // HQPeriodsContent - /hq-accounting/periods
      if ( fieldName === 'period-end' ) {
        inputName = 'Period End';
      } else if ( fieldName === 'period-year' ) {
        inputName = 'Period Year';
      } else if ( fieldName === 'period-month' ) {
        inputName = 'Period Month';
      } else if ( fieldName === 'period-week' ) {
        inputName = 'Period Week';
      }

      // HQExpenseTypesContent - /hq-accounting/expense-types
      if ( fieldName === 'expenseType-type' ) {
        inputName = 'ExpenseType Name';
      } else if ( fieldName === 'expenseType-description' ) {
        inputName = 'ExpenseType Description';
      }

      // HQInventoryCategoriesContent - /hq-accounting/inventory-categories
      if ( fieldName === 'inventoryCategory-name' ) {
        inputName = 'InventoryCategory Name';
      } else if ( fieldName === 'inventoryCategory-vending' ) {
        inputName = 'InventoryCategory Vending';
      }

      // HQTermsContent - /hq-accounting/terms
      if ( fieldName === 'term-name' ) {
        inputName = 'Term Name';
      } else if ( fieldName === 'term-dueDays' ) {
        inputName = 'Term Due Days';
      } else if ( fieldName === 'term-discPercent' ) {
        inputName = 'Term Disc Percent';
      } else if ( fieldName === 'term-discDays' ) {
        inputName = 'Term Disc Days';
      }

      // HQCalculationCodesContent - /hq-accounting/calculation-codes
      if ( fieldName === 'calculationCode-code' ) {
        inputName = 'CalculationCode Code';
      } else if ( fieldName === 'calculationCode-description' ) {
        inputName = 'CalculationCode Description';
      }

      // HQUnitsTableContent,HQUnitMaintenance - Detail, Financials, Fees - /hq-unit-setup/unit-info
      if ( fieldName === '' ) {
        inputName = '';
      } else if ( fieldName === '' ) {
        inputName = '';
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
      } else if ( ruleName === 'date' ) {
        errorMessage = 'must be in mm/dd/yyyy format';
      } else if ( ruleName === 'numeric' ) {
        errorMessage = 'must be numeric';
      } else if ( ruleName === 'between' ) {
        errorMessage = 'must be between 0 and 100'
      }
      return errorMessage;
    }
  },
}
