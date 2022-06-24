<template>
  <LoadingBar v-if="$apollo.loading" />
  <PageContentWrapper v-else>
    <div class="header">
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <multiselect
              v-if="units"
              v-model="unit"
              :options="units"
              :custom-label="nameWithId"
              placeholder="Select one"
              track-by="name"
              :preselect-first="false"
              :show-labels="false"
              :disabled="isAttachGlAccounts"
            ></multiselect>
          </template>
        </InputWithTitle>

        <InputWithTitle v-if="unit">
          <template #title> Name </template>

          <template #input>
            <CustomInput v-model="unit.name" readonly disabled />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow v-if="isAttachGlAccounts">
        <InputWithTitle>
          <template #title> GL Account </template>

          <template #input>
            <multiselect
              v-if="glAccounts"
              v-model="glAccount"
              :options="glAccounts"
              :custom-label="nameWithId"
              placeholder="Select one"
              track-by="name"
              :preselect-first="false"
              :show-labels="false"
            ></multiselect>
          </template>
        </InputWithTitle>

        <InputWithTitle v-if="glAccount && glAccount.child">
          <template #title> GL Sub Account </template>

          <template #input>
            <multiselect
              v-if="glAccount && !glAccount.parent"
              v-model="glSubAccount"
              :options="glAccount.child"
              :custom-label="nameWithId"
              placeholder="Select one"
              track-by="name"
              :preselect-first="false"
              :show-labels="false"
            ></multiselect>
          </template>
        </InputWithTitle>
      </InputRow>
    </div>

    <DefaultButton
      :disabled="!unit"
      @event="isAttachGlAccounts ? addGlToUnit() : showAttachGlAccounts()"
    >
      Attach new GL account
    </DefaultButton>
    <DefaultButton v-if="isAttachGlAccounts" @event="cancelAttach">
      Cancel
    </DefaultButton>

    <ValidationObserver v-if="!isAttachGlAccounts" ref="form">
      <div>
        <div class="gl-table">
          <h2
            v-if="unit.glAccounts && unit.glAccounts.length"
            class="table-header"
          >
            Gl Accounts
          </h2>
          <h2 v-else class="table-header">Please, attach new GL Account</h2>

          <CustomTable
            v-if="unit.glAccounts && unit.glAccounts.length"
            class="table table-gls"
            :w-table="1000"
          >
            <template #header>
              <div class="table-row">
                <span>ID</span>

                <span>GL account ID - GL account Name</span>

                <span>GL sub account ID - GL sub account Name</span>

                <span> Type </span>

                <span>Action</span>
              </div>
            </template>

            <template v-if="glAccounts" #content>
              <CustomTableRow
                v-for="glAcc in unit.glAccounts"
                :key="glAcc.id"
                class="table-row"
              >
                <span>{{ glAcc.id }}</span>

                <span v-if="!glAcc.parent">{{
                  `${glAcc.id} - ${glAcc.name}`
                }}</span>
                <span v-else></span>

                <div v-if="glAcc.parent">
                  {{ `${glAcc.id} - ${glAcc.name}` }}
                </div>
                <div v-else></div>

                <span v-if="glAcc.parent">{{
                  glAcc.parent.glTypeCode && glAcc.parent.glTypeCode.description
                }}</span>
                <span v-else-if="!glAcc.parent">{{
                  glAcc.glTypeCode && glAcc.glTypeCode.description
                }}</span>

                <CustomTableIconsColumn
                  :is-delete-active="isDelete === `${glAcc.id}-GL`"
                  :show-edit="false"
                  @delete="deleteItem(`${glAcc.id}-GL`)"
                  @cancel-delete="cancelDelete"
                  @confirm-delete="removeGlFromUnit(glAcc)"
                />
              </CustomTableRow>
            </template>
          </CustomTable>
        </div>

        <div>
          <h2 class="table-header">Gl Types</h2>

          <CustomTable class="table table-gls" :w-table="600">
            <template #header>
              <div class="table-row table-row--gl-type">
                <span>ID</span>

                <span>Code</span>

                <span>Description</span>
              </div>
            </template>

            <template v-if="glTypeCodes" #content>
              <CustomTableRow
                v-for="glTypeCode in glTypeCodes"
                :key="glTypeCode.id"
                class="table-row table-row--gl-type"
              >
                <span>{{ glTypeCode.id }}</span>

                <CustomInput
                  v-if="editGlTypeCodeId === glTypeCode.id"
                  v-model="glTypeCodeEdit.code"
                  rules="required"
                  do-not-show-error-message
                />
                <span v-else>{{ glTypeCode.code }}</span>

                <CustomInput
                  v-if="editGlTypeCodeId === glTypeCode.id"
                  v-model="glTypeCodeEdit.description"
                  rules="required"
                  do-not-show-error-message
                />
                <span v-else>{{ glTypeCode.description }}</span>

                <CustomTableIconsColumn
                  :is-edit-active="editGlTypeCodeId === glTypeCode.id"
                  :is-delete-active="isDelete === glTypeCode.id"
                  @edit="editGlTypeCode(glTypeCode)"
                  @delete="deleteItem(glTypeCode.id)"
                  @cancel="cancelGlTypeCodesCopyEdit"
                  @cancel-delete="cancelDelete"
                  @confirm-edit="confirmEditGlTypeCode(glTypeCode)"
                  @confirm-delete="confirmDeleteGlTypeCode(glTypeCode.id)"
                />
              </CustomTableRow>

              <CustomTableRow
                v-if="isAddGlTypeCode"
                class="table-row table-row--gl-type"
              >
                <span>-</span>

                <CustomInput
                  v-model="glTypeCodeNew.code"
                  rules="required"
                  do-not-show-error-message
                />

                <CustomInput
                  v-model="glTypeCodeNew.description"
                  rules="required"
                  do-not-show-error-message
                />
              </CustomTableRow>

              <CustomTableRow class="table-row add-row table-row--gl-type">
                <CustomTableAddIcon
                  :is-hide="isHideTypeCodes"
                  @add-row="addGlTypeRow"
                />
              </CustomTableRow>
            </template>
          </CustomTable>

          <div v-if="isAddGlTypeCode" class="buttons-area">
            <DefaultButton @event="createGlTypeCode">
              + Add Unit Type
            </DefaultButton>

            <DefaultButton @event="cancelAddGlTypeCode"> Cancel </DefaultButton>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Multiselect from 'vue-multiselect'
import Units from '../graphql/queries/units.gql'
import GlAccounts from '../graphql/queries/glAccounts.gql'
import GlTypeCodes from '../graphql/queries/glTypeCodes.gql'
import UpdateUnit from '../graphql/mutations/unit/updateUnit.gql'
import CreateGlTypeCode from '../graphql/mutations/glTypeCode/createGlTypeCode.gql'
import UpdateGlTypeCode from '../graphql/mutations/glTypeCode/updateGlTypeCode.gql'
import DeleteGlTypeCode from '../graphql/mutations/glTypeCode/deleteGlTypeCode.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import DefaultButton from './DefaultButton.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
export default {
  name: 'HQUnitGLMaintenance',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputWithTitle,
    InputRow,
    CustomInput,
    CustomTable,
    CustomTableRow,
    CustomTableAddIcon,
    DefaultButton,
    Multiselect,
  },
  apollo: {
    units: {
      query: Units,
    },
    glAccounts: {
      query: GlAccounts,
    },
    glTypeCodes: {
      query: GlTypeCodes,
    },
  },
  mixins: [mutationMixin, tableActionsMixin],
  data() {
    return {
      unit: '',
      isAddGlTypeCode: false,
      glTypeCodeNew: {
        code: '',
        description: '',
      },
      isHideTypeCodes: false,
      editGlTypeCodeId: '',
      glAccount: '',
      glSubAccount: '',
      isAttachGlAccounts: false,
      glTypeCodeEdit: false,
    }
  },
  watch: {
    glAccount() {
      this.glSubAccount = ''
    },
  },
  methods: {
    nameWithId({ name, id }) {
      console.log('name-id', name+' - '+id);
      console.log('here', this.units);
      console.log('this',this);
      return `${id} — ${name}`
    },
    showAttachGlAccounts() {
      this.isAttachGlAccounts = true
    },
    cancelAttach() {
      this.isAttachGlAccounts = false
    },
    addGlTypeRow() {
      this.isAddGlTypeCode = true
      this.isHideTypeCodes = true
    },
    cancelAddGlTypeCode() {
      this.isAddGlTypeCode = false
      this.isHideTypeCodes = false
    },
    selectUnit(item) {
      this.unit = item
    },
    async createGlTypeCode() {
      const unit = this.unit
      await this.mutationAction(
        CreateGlTypeCode,
        {
          GlTypeCodeInput: {
            code: this.glTypeCodeNew.code,
            description: this.glTypeCodeNew.description,
          },
        },
        GlTypeCodes,
        'Add Gl Type success',
        'Add Gl Type error'
      )
      this.unit = unit
    },
    async confirmEditGlTypeCode(GlType) {
      const unit = this.unit
      const editedUnitType = {
        id: GlType.id,
        code: this.glTypeCodeEdit.code,
        description: this.glTypeCodeEdit.description,
      }

      await this.mutationAction(
        UpdateGlTypeCode,
        {
          GlTypeCodeInput: editedUnitType,
        },
        GlTypeCodes,
        'Edit Gl Type success',
        'Edit Gl Type error'
      )
      this.unit = unit
    },
    async confirmDeleteGlTypeCode(id) {
      const unit = this.unit

      await this.mutationAction(
        DeleteGlTypeCode,
        { id },
        GlTypeCodes,
        'Delete Gl Type success',
        'Delete Gl Type error'
      )
      this.unit = unit
    },
    async addGlToUnit() {
      const { id } = this.unit

      const {
        data: { updateUnit },
      } = await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            glAccounts: {
              sync: this.glSubAccount
                ? [
                    ...this.unit.glAccounts.map((glAccount) => glAccount.id),
                    this.glAccount.id,
                    this.glSubAccount.id,
                  ]
                : [
                    ...this.unit.glAccounts.map((glAccount) => glAccount.id),
                    this.glAccount.id,
                  ],
            },
          },
        },
        Units,
        'Add Gl account to unit success',
        'Add Gl account to unit error'
      )

      if (updateUnit) {
        this.unit = updateUnit
        this.cancelAttach()
      }
    },
    async removeGlFromUnit(glAccount) {
      const { id } = this.unit

      const {
        data: { updateUnit },
      } = await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            glAccounts: {
              disconnect: glAccount.id,
            },
          },
        },
        Units,
        'Remove Gl account from unit success',
        'Remove Gl account from unit error'
      )

      if (updateUnit) {
        this.unit = updateUnit
      }
    },
    editGlTypeCode(glTypeCode) {
      this.glTypeCodeEdit = Object.assign({}, glTypeCode)
      this.editGlTypeCodeId = glTypeCode.id
    },
    cancelGlTypeCodesCopyEdit() {
      this.isHide = false
      this.editGlTypeCodeId = null
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.input {
  &-row--offset {
    display: flex;
    margin: 0 -15px;
  }

  &-col {
    min-width: 240px;
    padding: 0 15px;
  }
}

.mb-20 {
  margin-bottom: 20px;
}

.multiselect__tags {
  border: 1px solid gainsboro;
  border-radius: 3px;
}

.multiselect__option {
  padding: 10px 16px 10px 8px;
  color: #000;
  font-size: 14px;
  background: #fff;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  color: #fff;
  background-color: #b01d22;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: rgba(#b01d22, 0.6);
}

.multiselect__tag {
  background-color: #b01d22;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background-color: #b01d22;
}

.multiselect__tag-icon:after {
  color: #fff;
}

.multiselect__select:before {
  border: none;
  width: 24px;
  height: 24px;
  background: url(assets/images/icons/chevron-down.svg);
  display: block;
  top: 0;
}
</style>
<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: flex-start;
  column-gap: 30px;
  padding: 12px 0;
  @media screen and (min-width: $md) {
    grid-template-columns: 5% repeat(2, 25%) 20% auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 80px 165px 165px 150px auto;
  }
  &--gl-type {
    grid-template-columns: 5% repeat(2, 25%) auto;
  }
}

.row {
  padding: 6px 10px;
  align-items: center;

  span {
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  div {
    span {
      min-height: auto;
      padding-bottom: 10px;
    }
  }
}

.table-gls {
  @media screen and (min-width: $lg) and (max-width: $xxl) {
    width: calc(100vw - 280px);
  }
}

.icon {
  cursor: pointer;
}

.gl-table {
  margin: 20px 0;
}

.table-header {
  margin-bottom: 8px;
}
</style>
