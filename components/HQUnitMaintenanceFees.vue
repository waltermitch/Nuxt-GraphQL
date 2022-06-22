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
              v-model="managementAmount"
              type="number"
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
              v-model="managementPercent"
              type="number"
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
              v-model="administrativeAmount"
              type="number"
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
              v-model="administrativePercent"
              type="number"
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
              v-model="supportAmount"
              type="number"
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
              v-model="supportPercent"
              type="number"
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
              type="number"
              rules="required"
              placeholder="0%"
            />
          </template>
        </InputWithTitle>

        <!-- TODO Need more information on reg tax field-->
        <!-- <InputWithTitle>
          <template #title> Reg Tax </template>

          <template #input>
            <CustomSelect :options="mockedList" @input="selectRegTax" />
          </template>
        </InputWithTitle> -->
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Commission Percent </template>

          <template #input>
            <CustomInput
              v-model="commissionPercent"
              type="number"
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
              :is-active="isKronos"
              @set-is-active="setIsKronos"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <div class="buttons-area">
        <DefaultButton
          button-color-gamma="red"
          :disabled="invalid"
          @event="unitID ? updateUnit() : addUnit()"
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
import { unitMaintenanceMixin } from '../mixins/unitMaintenanceMixin'
import CreateUnit from '../graphql/mutations/unit/createUnit.gql'
import UpdateUnit from '../graphql/mutations/unit/updateUnit.gql'
import Units from '../graphql/queries/units.gql'
import InputRow from './InputRow.vue'
import CustomInput from './CustomInput.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { UNIT } from '~/constants/unit'
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
  mixins: [unitMaintenanceMixin, mutationMixin],
  data() {
    // TODO Remove mocked data
    return {
      mockedList: [
        {
          id: 1,
          value: 'DolarsPerWeek',
          name: 'DolarsPerWeek',
        },
        {
          id: 2,
          value: 'DolarsPerWeek',
          name: 'DolarsPerWeek',
        },
      ],
    }
  },
  computed: {
    managementFeeType() {
      return this.unit.managementFeeType
    },
    managementAmount: {
      get() {
        return this.unit.managementAmount
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_MANAGEMENT_FEE_DOLLAR',
          value
        )
      },
    },
    managementPercent: {
      get() {
        return this.unit.managementPercent
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
    administrativeAmount: {
      get() {
        return this.unit.administrativeAmount
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_ADMINISTRATIVE_FEE_DOLLAR',
          value
        )
      },
    },
    administrativePercent: {
      get() {
        return this.unit.administrativePercent
      },
      set(value) {
        this.$store.commit(
          'unitMaintenance/SET_UNIT_ADMINISTRATIVE_FEE_PERCENT',
          value
        )
      },
    },
    supportAmount: {
      get() {
        return this.unit.supportAmount
      },
      set(value) {
        this.$store.commit('unitMaintenance/SET_UNIT_SUPPORT_FEE_DOLLAR', value)
      },
    },
    supportFeeType() {
      return this.unit.supportFeeType
    },
    supportPercent: {
      get() {
        return this.unit.supportPercent
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
    isKronos() {
      return this.unit.isKronos
    },
  },
  methods: {
    selectManagementFeeType(managementFeeType) {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_MANAGEMENT_FEE_TYPE',
        managementFeeType.value
      )
    },
    selectAdministrativeFeeType(administrativeFeeType) {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_ADMINISTRATIVE_FEE_TYPE',
        administrativeFeeType.value
      )
    },
    selectSupportFeeType(supportFeeType) {
      this.$store.commit(
        'unitMaintenance/SET_UNIT_SUPPORT_FEE_TYPE',
        supportFeeType.value
      )
    },
    selectRegTax(regTax) {
      this.$store.commit('unitMaintenance/SET_UNIT_REG_TAX', regTax)
    },
    setIsKronos() {
      this.$store.commit('unitMaintenance/SET_UNIT_KRONOS', !this.unit.isKronos)
    },
    async addUnit() {
      // eslint-disable-next-line no-unused-vars
      const { state, users, ...unitInput } = this.unit
      const res = await this.mutationAction(
        CreateUnit,
        {
          unitInput: {
            ...unitInput,
            payrollTaxPercent: +this.unit.payrollTaxPercent,
            benefitsAmount: +this.unit.benefitsAmount,
            vendingIncome: +this.unit.vendingIncome,
            commissionAmount: +this.unit.commissionAmount,
            vacationAmount: +this.unit.vacationAmount,
            businessInsuranceAmount: +this.unit.businessInsuranceAmount,
            managementAmount: +this.unit.managementAmount,
            managementPercent: +this.unit.managementPercent,
            administrativeAmount: +this.unit.administrativeAmount,
            administrativePercent: +this.unit.administrativePercent,
            supportAmount: +this.unit.supportAmount,
            supportPercent: +this.unit.supportPercent,
            benefitsPercent: +this.unit.benefitsPercent,
            commissionPercent: +this.unit.commissionPercent,
            district: {
              connect: Number(this.unit.district.id),
            },
            county: {
              connect: Number(this.unit.county.id),
            },
            city: {
              connect: Number(this.unit.city.id),
            },
            users: {
              sync: users.map((user) => Number(user.id)),
            },
          },
        },
        Units,
        'Add unit success',
        'Add unit error'
      )
      if (res) {
        this.hideAddUnit()
        this.setUnitID(null)
        this.$store.dispatch('unitMaintenance/setUnit', { ...UNIT })
      }
    },
    async updateUnit() {
      if (this.unitID) {
        const {
          state,
          users,
          __typename,
          unitType,
          glAccounts,
          vendors,
          activePeriod,
          periods,
          ...unitInput
        } = this.unit
        const res = await this.mutationAction(
          UpdateUnit,
          {
            unitInput: {
              ...unitInput,
              payrollTaxPercent: +this.unit.payrollTaxPercent,
              benefitsAmount: +this.unit.benefitsAmount,
              vendingIncome: +this.unit.vendingIncome,
              commissionAmount: +this.unit.commissionAmount,
              vacationAmount: +this.unit.vacationAmount,
              businessInsuranceAmount: +this.unit.businessInsuranceAmount,
              managementAmount: +this.unit.managementAmount,
              managementPercent: +this.unit.managementPercent,
              administrativeAmount: +this.unit.administrativeAmount,
              administrativePercent: +this.unit.administrativePercent,
              supportAmount: +this.unit.supportAmount,
              supportPercent: +this.unit.supportPercent,
              benefitsPercent: +this.unit.benefitsPercent,
              commissionPercent: +this.unit.commissionPercent,
              district: {
                connect: Number(this.unit.district.id),
              },
              county: {
                connect: Number(this.unit.county.id),
              },
              city: {
                connect: Number(this.unit.city.id),
              },
              users: {
                sync: users.map((user) => user.id),
              },
            },
          },
          Units,
          'Edit unit success',
          'Edit unit error'
        )
        if (res) {
          this.hideAddUnit()
          this.setUnitID(null)
          this.$store.dispatch('unitMaintenance/setUnit', UNIT)
        }
      }
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
