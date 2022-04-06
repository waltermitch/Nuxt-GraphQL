<template>
  <div>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title> Payroll Tax </template>

          <template #input>
            <CustomInput
              v-model="payrollTax"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Benefit Dollars </template>

          <template #input>
            <CustomInput
              v-model="benefitDollars"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Vending Income </template>

          <template #input>
            <CustomInput
              v-model="vendingIncome"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Commission Dollars </template>

          <template #input>
            <CustomInput
              v-model="commissionDollars"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Vacation Dollars </template>

          <template #input>
            <CustomInput
              v-model="vacationDollars"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Vending </template>

          <template #input>
            <CustomRadioButton
              class="radio-button"
              :is-active="vending"
              @set-is-active="setIsVending"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Business Insurance </template>

          <template #input>
            <CustomInput
              v-model="businessInsurance"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Active </template>

          <template #input>
            <CustomRadioButton
              class="radio-button"
              :is-active="active"
              @set-is-active="setIsActive"
            />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Save
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancel">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import { unitMaintenanceMixin } from '../mixins/unitMaintenanceMixin'
import InputRow from './InputRow.vue'
import CustomInput from './CustomInput.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomRadioButton from './CustomRadioButton.vue'
export default {
  name: 'HQUnitMaintenanceFinancials',
  components: {
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomInput,
    CustomRadioButton,
  },
  mixins: [formMixin, unitMaintenanceMixin],
  data() {
    return {
      payrollTax: '',
      benefitDollars: '',
      vendingIncome: '',
      commissionDollars: '',
      vacationDollars: '',
      vending: '',
      active: '',
      businessInsurance: '',
    }
  },
  methods: {
    setIsVending() {
      this.vending = !this.vending
    },
    setIsActive() {
      this.active = !this.active
    },
  },
}
</script>

<style lang="scss" scoped>
.radio-button {
  display: flex;
  align-items: center;
  height: 42px;
}

.buttons-area {
  display: flex;
  margin-top: 50px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
