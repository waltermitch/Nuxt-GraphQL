<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <CustomSelect
              v-if="units"
              :options="units.data"
              select-by="id"
              @input="selectUnit"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Name </template>

          <template #input>
            <span> {{ unit.name }}</span>
          </template>
        </InputWithTitle>
      </InputRow>

      <CustomTable :w-table="1000">
        <template #header>
          <div class="table-row">
            <span>ID</span>

            <span>Name</span>

            <span>Type</span>

            <span>Reg Bank</span>

            <span>Non-Resetable</span>

            <span>Commission</span>

            <span>Active</span>

            <span>Reset Non-Resetable</span>
          </div>
        </template>

        <template v-if="registers" #content>
          <CustomTableRow
            v-for="register in unitRegisters"
            :key="register.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === register.id"
              v-model="register.code"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>
              {{ register.code }}
            </span>

            <CustomInput
              v-if="isEdit === register.id"
              v-model="register.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>
              {{ register.name }}
            </span>

            <CustomSelect
              v-if="registerTypes && isEdit === register.id"
              :options="registerTypes.data"
              @input="selectRegisterType"
            />
            <span v-else>
              {{ register.registerType.name }}
            </span>

            <CustomInput
              v-if="isEdit === register.id"
              v-model.number="register.bank"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else> {{ register.bank }}$ </span>

            <CustomInput
              v-if="isEdit === register.id"
              v-model.number="register.nonResetable"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else> {{ register.nonResetable }}$ </span>

            <CustomInput
              v-if="isEdit === register.id"
              v-model.number="register.commission"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else> {{ register.commission }}% </span>

            <CustomRadioButton
              :is-active="register.isActive"
              :disabled="isEdit !== register.id"
              @set-is-active="setIsActive(register)"
            />

            <CustomRadioButton
              :is-active="register.resetNonResetable"
              :disabled="isEdit !== register.id"
              @set-is-active="setResetNonResetable(register)"
            />

            <CustomTableIconsColumn
              :is-edit-active="isEdit === register.id"
              :is-delete-active="isDelete === register.id"
              @edit="edit(register.id)"
              @delete="deleteItem(register.id)"
              @cancel="cancelRegisterEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(register)"
              @confirm-delete="confirmDelete(register.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="registerNew.code"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="registerNew.name"
              rules="required"
              do-not-show-error-message
            />

            <CustomSelect
              v-if="registerTypes"
              :options="registerTypes.data"
              @input="selectRegisterType"
            />

            <CustomInput
              v-model.number="registerNew.bank"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="registerNew.nonResetable"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="registerNew.commission"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomRadioButton
              :is-active="registerNew.isActive"
              @set-is-active="setIsActive"
            />

            <CustomRadioButton
              :is-active="registerNew.resetNonResetable"
              @set-is-active="setResetNonResetable"
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>

      <div v-if="isAdd" class="buttons-area">
        <DefaultButton @event="addRegister"> Add Register </DefaultButton>

        <DefaultButton @event="cancelAddRegister"> Cancel </DefaultButton>
      </div>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Units from '../graphql/queries/units.gql'
import Registers from '../graphql/queries/registers.gql'
import RegisterTypes from '../graphql/queries/registersType.gql'
import CreateRegister from '../graphql/mutations/register/createRegister.gql'
import UpdateRegister from '../graphql/mutations/register/updateRegister.gql'
import DeleteRegister from '../graphql/mutations/register/deleteRegister.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import CustomTable from './CustomTable.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQRegistersContent',
  components: {
    PageContentWrapper,
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomSelect,
    CustomInput,
    CustomTable,
    CustomRadioButton,
    CustomTableAddIcon,
  },
  mixins: [mutationMixin, tableActionsMixin],
  apollo: {
    units: {
      query: Units,
      prefetch: true,
    },
    registers: {
      query: Registers,
    },
    registerTypes: {
      query: RegisterTypes,
    },
  },
  data() {
    return {
      unit: '',
      registerNew: {
        code: '',
        name: '',
        registerType: {},
        bank: '',
        nonResetable: '',
        commission: '',
        isActive: false,
        resetNonResetable: false,
      },
    }
  },
  computed: {
    unitRegisters() {
      return this.registers.data.filter(
        (register) => register.unit.id === this.unit.id
      )
    },
  },
  watch: {
    async isEdit(oldVal, newVal) {
      this.registers.data = await this.fetchData()
    },
  },
  async destroyed() {
    this.registers.data = await this.fetchData()
  },
  methods: {
    async fetchData() {
      const {
        data: {
          registers: { data },
        },
      } = await this.$apollo.query({
        query: Registers,
        fetchPolicy: 'no-cache',
      })

      return data
    },
    selectUnit(unit) {
      this.unit = unit
    },
    selectRegisterType(type) {
      this.registerType = type
    },
    setIsActive(register) {
      if (register) {
        register.isActive = !register.isActive
      } else {
        this.registerNew.isActive = !this.registerNew.isActive
      }
    },
    setResetNonResetable(register) {
      if (register) {
        register.resetNonResetable = !register.resetNonResetable
      } else {
        this.registerNew.resetNonResetable = !this.registerNew.resetNonResetable
      }
    },
    async addRegister() {
      const unit = this.unit

      await this.mutationAction(
        CreateRegister,
        {
          registerInput: {
            unit: {
              connect: Number(this.unit.id),
            },
            ...this.registerNew,
            registerType: {
              connect: Number(this.registerType.id),
            },
          },
        },
        Registers,
        'Add register success',
        'Add register error'
      )

      this.unit = unit
    },
    async confirmEdit(register) {
      const { __typename, createdAt, updatedAt, ...registerInput } = register

      const unit = this.unit

      await this.mutationAction(
        UpdateRegister,
        {
          registerInput: {
            ...registerInput,
            registerType: {
              connect: Number(this.registerType.id),
            },
            unit: {
              connect: Number(register.unit.id),
            },
          },
        },
        Registers,
        'Edit register success',
        'Edit register error'
      )

      this.unit = unit
    },
    async confirmDelete(id) {
      const unit = this.unit

      await this.mutationAction(
        DeleteRegister,
        { id },
        Registers,
        'Delete register success',
        'Delete register error'
      )
      this.unit = unit
    },
    cancelAddRegister() {
      this.isAdd = false
      this.isHide = false
    },
    async cancelRegisterEdit() {
      this.registers.data = await this.fetchData()
      this.cancelEdit()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  @media screen and (min-width: $md) {
    grid-template-columns: 50px 150px 200px 70px 100px 85px 50px 135px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 50px 120px 120px 70px 100px 85px 50px 120px auto;
  }
  column-gap: 20px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 9;
    justify-self: end;
  }
}

.buttons-area {
  margin-top: 25px;
}
</style>
