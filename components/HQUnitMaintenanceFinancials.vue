<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
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
              :is-active="isVending"
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
              :is-active="isActive"
              @set-is-active="setIsActive"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <div class="buttons-area">
        <DefaultButton
          button-color-gamma="red"
          :disabled="invalid"
          @event="nextTab"
        >
          Continue
        </DefaultButton>

        <DefaultButton button-color-gamma="white" @event="cancel">
          Cancel
        </DefaultButton>
      </div>
    </ValidationObserver>
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
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
export default {
  name: 'HQUnitMaintenanceFinancials',
  components: {
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomInput,
    CustomRadioButton,
  },
  mixins: [formMixin, unitMaintenanceMixin, tabsViewMixin],
  computed: {
    payrollTax: {
      get() {
        return this.unit.payrollTax
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_PAYROLL_TAX', value)
      },
    },
    benefitDollars: {
      get() {
        return this.unit.benefitDollars
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_BENEFIT_DOLLARS', value)
      },
    },
    vendingIncome: {
      get() {
        return this.unit.vendingIncome
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_VENDING_INCOME', value)
      },
    },
    commissionDollars: {
      get() {
        return this.unit.commissionDollars
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_COMMISSION_DOLLARS', value)
      },
    },
    vacationDollars: {
      get() {
        return this.unit.vacationDollars
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_VACATION_DOLLARS', value)
      },
    },
    isVending() {
      return this.unit.isVending
    },
    isActive() {
      return this.unit.isActive
    },
    businessInsurance: {
      get() {
        return this.unit.businessInsurance
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_BUSINESS_INSURANCE', value)
      },
    },
  },
  methods: {
    setIsVending() {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_IS_VENDING',
        !this.unit.isVending
      )
    },
    setIsActive() {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_IS_ACTIVE',
        !this.unit.isActive
      )
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
