<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <InputRow>
        <InputWithTitle>
          <template #title> Management Fee - Type </template>

          <template #input>
            <CustomSelect
              :options="mockedList"
              @input="selectManagementFeeType"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Management Fee - Dollar </template>

          <template #input>
            <CustomInput
              v-model="managementFeeDollar"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Management Fee - Percent </template>

          <template #input>
            <CustomInput
              v-model="managementFeePercent"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Administrative Fee - Type </template>

          <template #input>
            <CustomSelect
              :options="mockedList"
              @input="selectAdministrativeFeeType"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Administrative Fee - Dollar </template>

          <template #input>
            <CustomInput
              v-model="administrativeFeeDollar"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Administrative Fee - Percent </template>

          <template #input>
            <CustomInput
              v-model="administrativeFeePercent"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Support Fee - Type </template>

          <template #input>
            <CustomSelect :options="mockedList" @input="selectSupportFeeType" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Support Fee - Dollar </template>

          <template #input>
            <CustomInput
              v-model="supportFeeDollar"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Support Fee - Percent </template>

          <template #input>
            <CustomInput
              v-model="supportFeePercent"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Benefits Percent </template>

          <template #input>
            <CustomInput
              v-model="benefitsPercent"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Reg Tax </template>

          <template #input>
            <CustomSelect :options="mockedList" @input="selectRegTax" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Commission Percent </template>

          <template #input>
            <CustomInput
              v-model="commissionPercent"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Kronos </template>

          <template #input>
            <CustomRadioButton
              class="radio-button"
              :is-active="kronos"
              @set-is-active="setIsKronos"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Start Period </template>

          <template #input>
            <CustomSelect :options="mockedList" @input="selectStartPeriod" />
          </template>
        </InputWithTitle>
      </InputRow>

      <div class="buttons-area">
        <DefaultButton
          button-color-gamma="red"
          :disabled="invalid"
          @event="saveEvent"
        >
          Save
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
import CustomSelect from './CustomSelect.vue'
import CustomRadioButton from './CustomRadioButton.vue'
export default {
  name: 'HQUnitMaintenanceFees',
  components: {
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomInput,
    CustomSelect,
    CustomRadioButton,
  },
  mixins: [formMixin, unitMaintenanceMixin],
  data() {
    return {
      mockedList: [
        {
          id: 1,
          value: 'Lorem',
          name: 'Lorem',
        },
        {
          id: 2,
          value: 'Ipsum',
          name: 'Ipsum',
        },
      ],
    }
  },
  computed: {
    managementFeeType() {
      return this.unit.managementFeeType
    },
    managementFeeDollar: {
      get() {
        return this.unit.managementFeeDollar
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_MANAGEMENT_FEE_DOLLAR',
          value
        )
      },
    },
    managementFeePercent: {
      get() {
        return this.unit.managementFeePercent
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_MANAGEMENT_FEE_PERCENT',
          value
        )
      },
    },
    administrativeFeeType() {
      return this.unit.administrativeFeeType
    },
    administrativeFeeDollar: {
      get() {
        return this.unit.administrativeFeeDollar
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_ADMINISTRATIVE_FEE_DOLLAR',
          value
        )
      },
    },
    administrativeFeePercent: {
      get() {
        return this.unit.administrativeFeePercent
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_ADMINISTRATIVE_FEE_PERCENT',
          value
        )
      },
    },
    supportFeeDollar: {
      get() {
        return this.unit.supportFeeDollar
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_SUPPORT_FEE_DOLLAR', value)
      },
    },
    supportFeeType() {
      return this.unit.supportFeeType
    },
    supportFeePercent: {
      get() {
        return this.unit.supportFeePercent
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_SUPPORT_FEE_PERCENT',
          value
        )
      },
    },
    benefitsPercent: {
      get() {
        return this.unit.benefitsPercent
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_BENEFITS_PERCENT', value)
      },
    },
    regTax() {
      return this.unit.regTax
    },
    commissionPercent: {
      get() {
        return this.unit.commissionPercent
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_COMMISSION_PERCENT', value)
      },
    },
    kronos() {
      return this.unit.kronos
    },
    startPeriod: {
      get() {
        return this.unit.startPeriod
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_START_PERIOD', value)
      },
    },
  },
  methods: {
    selectManagementFeeType(managementFeeType) {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_MANAGEMENT_FEE_TYPE',
        managementFeeType
      )
    },
    selectAdministrativeFeeType(administrativeFeeType) {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_ADMINISTRATIVE_FEE_TYPE',
        administrativeFeeType
      )
    },
    selectSupportFeeType(supportFeeType) {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_SUPPORT_FEE_TYPE',
        supportFeeType
      )
    },
    selectRegTax(regTax) {
      this.$store.commit('unitMaintenance/SET_UNIT_REG_TAX', regTax)
    },
    setIsKronos() {
      this.$store.commit('unitMaintenance/SET_UNIT_KRONOS', !this.unit.kronos)
    },
    selectStartPeriod(startPeriod) {
      this.$store.commit('unitMaintenance/SET_UNIT_START_PERIOD', startPeriod)
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
