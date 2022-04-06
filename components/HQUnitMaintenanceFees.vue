<template>
  <div>
    <ValidationObserver ref="form">
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
      managementFeeType: '',
      managementFeeDollar: '',
      managementFeePercent: '',
      administrativeFeeType: '',
      administrativeFeeDollar: '',
      administrativeFeePercent: '',
      supportFeeDollar: '',
      supportFeeType: '',
      supportFeePercent: '',
      benefitsPercent: '',
      regTax: '',
      commissionPercent: '',
      kronos: '',
      startPeriod: '',
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
  methods: {
    selectManagementFeeType(managementFeeType) {
      this.managementFeeType = managementFeeType
    },
    selectAdministrativeFeeType(administrativeFeeType) {
      this.administrativeFeeType = administrativeFeeType
    },
    selectSupportFeeType(supportFeeType) {
      this.supportFeeType = supportFeeType
    },
    selectRegTax(regTax) {
      this.regTax = regTax
    },
    setIsKronos() {
      this.kronos = !this.kronos
    },
    selectStartPeriod(startPeriod) {
      this.startPeriod = startPeriod
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
