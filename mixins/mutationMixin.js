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
              graphQLErrorMessage = graphQLErrorMessage.replace(/The code/g,'The "Details -> Unit Number"');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The name/g,'The "Details -> Name" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The address/g,'The "Details -> Street Address" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The zip/g,'The "Details -> Zip Code" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The population/g,'The "Details -> Population" ');
              
              graphQLErrorMessage = graphQLErrorMessage.replace(/The sysco/g,'The "Details -> Sysco" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The manager first name/g,'The "Details -> Mgr First Name" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The manager last name/g,'The "Details -> Mgr Last Name" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The payroll password/g,'The "Details -> Password" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The email account/g,'The "Details -> Email" ');

              graphQLErrorMessage = graphQLErrorMessage.replace(/The payroll tax percent/g,'The "Financials -> Payroll Tax" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The benefits amount/g,'The "Financials -> Benefit Dollars" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The vending income/g,'The "Financials -> Vending Income" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The commission amount/g,'The "Financials -> Commission Dollars" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The vacation amount/g,'The "Financials -> Vacation Dollars" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The business insurance amount/g,'The "Financials -> Business Insurance" ');

              graphQLErrorMessage = graphQLErrorMessage.replace(/The management amount/g,'The "Financials -> Management Fee - Dollar" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The management percent/g,'The "Financials -> Management Fee - Percent" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The administrative amount/g,'The "Financials -> Administrative Fee - Dollar" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The administrative percent/g,'The "Financials -> Administrative Fee - Percent" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The support amount/g,'The "Financials -> Support Fee - Dollar" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The support percent/g,'The "Financials -> Support Fee - Percent" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The benefits percent/g,'The "Financials -> Benefits Percent" ');
              graphQLErrorMessage = graphQLErrorMessage.replace(/The commission percent/g,'The "Financials -> Commission Percent" ');
            }

            this.showSubmitMessage(graphQLErrorMessage, 'error');
          } else {
            const errMessage = errorObj.message
            const errorMessageArray = errMessage.split(';')
            console.log(errMessage, errorMessageArray)
            let error;
            if (errorMessageArray.length > 1) {
              error = errorMessageArray[1];
            } else {
              error = errMessage;
            }

            // error = error.replace(/Field "startPeriod" is not defined by type UpdateUnitInput./g, 'The ')
            error = error.replace(/Expected type Int at value.population/g,'The "Details -> Population" must be Int value');

            this.showSubmitMessage(error, 'error')
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
      // Detail Tab
      if ( fieldName === 'unit-code' ) {
        inputName = 'Details -> Unit Number';
      } else if ( fieldName === 'unit-name' ) {
        inputName = 'Details -> Name';
      } else if ( fieldName === 'unit-address' ) {
        inputName = 'Details -> Street Address';
      } else if ( fieldName === 'unit-zip' ) {
        inputName = 'Details -> Zip Code';
      } else if ( fieldName === 'unit-population' ) {
        inputName = 'Details -> Population';
      } else if ( fieldName === 'unit-sysco' ) {
        inputName = 'Details -> Sysco';
      } else if ( fieldName === 'unit-first-name' ) {
        inputName = 'Details -> Mgr First Name';
      } else if ( fieldName === 'unit-last-name' ) {
        inputName = 'Details -> Mgr Last Name';
      } else if ( fieldName === 'unit-password' ) {
        inputName = 'Details -> Password';
      } else if ( fieldName === 'unit-email' ) {
        inputName = 'Details -> Email';
      }
      // Financials Tab
      else if ( fieldName === 'unit-payrollTaxPercent' ) {
        inputName = 'Financials -> Payroll Tax';
      } else if ( fieldName === 'unit-benefitsAmount' ) {
        inputName = 'Financials -> Benefit Dollars';
      } else if ( fieldName === 'unit-vendingIncome' ) {
        inputName = 'Financials -> Vending Income';
      } else if ( fieldName === 'unit-commissionAmount' ) {
        inputName = 'Financials -> Commission Dollars';
      } else if ( fieldName === 'unit-vacationAmount' ) {
        inputName = 'Financials -> Vacation Dollars';
      } else if ( fieldName === 'unit-businessInsuranceAmount' ) {
        inputName = 'Financials -> Business Insurance';
      }
      // Fees Tab
      else if ( fieldName === 'unit-managementAmount' ) {
        inputName = 'Financials -> Management Fee - Dollar';
      } else if ( fieldName === 'unit-managementPercent' ) {
        inputName = 'Financials -> Management Fee - Percent';
      } else if ( fieldName === 'unit-administrativeAmount' ) {
        inputName = 'Financials -> Administrative Fee - Dollar';
      } else if ( fieldName === 'unit-administrativePercent' ) {
        inputName = 'Financials -> Administrative Fee - Percent';
      } else if ( fieldName === 'unit-supportAmount' ) {
        inputName = 'Financials -> Support Fee - Dollar';
      } else if ( fieldName === 'unit-supportPercent' ) {
        inputName = 'Financials -> Support Fee - Percent';
      } else if ( fieldName === 'unit-benefitsPercent' ) {
        inputName = 'Financials -> Benefits Percent';
      } else if ( fieldName === 'unit-commissionPercent' ) {
        inputName = 'Financials -> Commission Percent';
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
