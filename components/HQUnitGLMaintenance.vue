<template>
  <PageContentWrapper>
    <div class="header">
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <CustomSelect
              v-if="units"
              :options="units"
              select-by="name"
              select-by-second="code"
              @input="selectUnit"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Name </template>

          <template #input>
            <CustomInput v-model="unit.name" />
          </template>
        </InputWithTitle>
      </InputRow>
    </div>

    <LoadingBar v-if="$apollo.loading" />
    <ValidationObserver v-else ref="form">
      <div>
        <div class="gl-table">
          <h2 class="table-header">Gls</h2>

          <CustomTable class="table table-gls" :w-table="1000">
            <template #header>
              <div class="table-row">
                <span>GL</span>

                <span>Sub</span>

                <span>Name</span>

                <span> Type </span>

                <span>GL ID</span>

                <span>Action</span>
              </div>
            </template>

            <template v-if="glAccounts" #content>
              <CustomTableRow
                v-for="glAccount in glAccounts.filter(
                  (account) => account.parent === null
                )"
                :key="glAccount.id"
                class="table-row"
              >
                <span v-if="selectedGlSubAccount.idToCheck === glAccount.id">{{
                  glAccountCopy.id
                }}</span>
                <span v-else>{{ glAccount.id }}</span>

                <CustomSelect
                  v-if="glAccount.child.length"
                  :options="glAccount.child"
                  select-by="id"
                  do-not-preselect
                  @input="selectSubAccountUnit(glAccount, $event)"
                />
                <span v-else>-</span>

                <CustomInput
                  v-if="editGlAccountId === glAccount.id"
                  v-model="glAccount.name"
                  rules="required"
                  do-not-show-error-message
                />
                <span v-else>{{ glAccount.name }}</span>

                <CustomSelect
                  v-if="glTypeCodes && editGlAccountId === glAccount.id"
                  select-by="description"
                  :options="glTypeCodes"
                  @input="selectTypeCode"
                />
                <span v-else>{{ glAccount.glTypeCode.description }}</span>

                <span>-</span>
                <DefaultButton
                  @event="
                    unit.glAccounts &&
                    (selectedGlSubAccount.idToCheck
                      ? unit.glAccounts.find(
                          (account) =>
                            account.id === selectedGlSubAccount.idToCheck
                        ) && selectedGlSubAccount.id === glAccount.id
                      : unit.glAccounts.find(
                          (account) => account.id === glAccount.id
                        ))
                      ? removeGlFromUnit(glAccount)
                      : addGlToUnit(glAccount)
                  "
                >
                  {{
                    unit.glAccounts &&
                    (selectedGlSubAccount.idToCheck
                      ? unit.glAccounts.find(
                          (acc) => acc.id === selectedGlSubAccount.idToCheck
                        ) && selectedGlSubAccount.id === glAccount.id
                      : unit.glAccounts.find((acc) => acc.id === glAccount.id))
                      ? 'Remove Gl From Unit'
                      : 'Add Gl to Unit'
                  }}
                </DefaultButton>

                <CustomTableIconsColumn
                  :is-edit-active="editGlAccountId === glAccount.id"
                  :is-delete-active="isDelete === glAccount.id"
                  @edit="editGlAccount(glAccount.id)"
                  @delete="deleteItem(glAccount.id)"
                  @cancel="cancelGlAccountsEdit"
                  @cancel-delete="cancelDelete"
                  @confirm-edit="confirmEdit(glAccount)"
                  @confirm-delete="confirmDelete(glAccount.id)"
                />
              </CustomTableRow>

              <CustomTableRow v-if="isAdd" class="table-row">
                <span>-</span>

                <span>-</span>

                <CustomInput
                  v-model="glAccountNew.name"
                  rules="required"
                  do-not-show-error-message
                />

                <CustomSelect
                  v-if="glTypeCodes"
                  select-by="description"
                  :options="glTypeCodes"
                  @input="selectTypeCode"
                />

                <CustomInput v-model="glAccountNew.parent.id" />
              </CustomTableRow>

              <CustomTableRow class="table-row add-row">
                <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
              </CustomTableRow>
            </template>
          </CustomTable>

          <div v-if="isAdd" class="buttons-area">
            <DefaultButton @event="addGl"> Add Gl Account </DefaultButton>

            <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
          </div>
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
                  v-model="glTypeCode.code"
                  rules="required"
                  do-not-show-error-message
                />
                <span v-else>{{ glTypeCode.code }}</span>

                <CustomInput
                  v-if="editGlTypeCodeId === glTypeCode.id"
                  v-model="glTypeCode.description"
                  rules="required"
                  do-not-show-error-message
                />
                <span v-else>{{ glTypeCode.description }}</span>

                <CustomTableIconsColumn
                  :is-edit-active="editGlTypeCodeId === glTypeCode.id"
                  :is-delete-active="isDelete === glTypeCode.id"
                  @edit="editGlTypeCode(glTypeCode.id)"
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
              Add Unit Type
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
import Units from '../graphql/queries/units.gql'
import GlAccounts from '../graphql/queries/glAccounts.gql'
import GlTypeCodes from '../graphql/queries/glTypeCodes.gql'
import UpdateUnit from '../graphql/mutations/unit/updateUnit.gql'
import CreateGlTypeCode from '../graphql/mutations/glTypeCode/createGlTypeCode.gql'
import UpdateGlTypeCode from '../graphql/mutations/glTypeCode/updateGlTypeCode.gql'
import DeleteGlTypeCode from '../graphql/mutations/glTypeCode/deleteGlTypeCode.gql'
import CreateGlAccount from '../graphql/mutations/glAccount/createGlAccount.gql'
import DeleteGlAccount from '../graphql/mutations/glAccount/deleteGlAccount.gql'
import UpdateGlAccount from '../graphql/mutations/glAccount/updateGlAccount.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
export default {
  name: 'HQUnitGLMaintenance',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputWithTitle,
    InputRow,
    CustomSelect,
    CustomInput,
    CustomTable,
    CustomTableRow,
    CustomTableAddIcon,
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
      glAccountNew: {
        name: '',
        glTypeCode: '',
        parent: {
          id: '',
        },
      },
      glTypeCodeNew: {
        code: '',
        description: '',
      },
      glAccountCopy: {
        id: '',
        name: '',
      },
      glAccountsCopy: [],
      subGlAccount: {
        id: '',
      },
      selectedGlSubAccount: {
        id: null,
      },
      isReload: false,
      isHideTypeCodes: false,
      glTypeCodesCopy: [],
      editGlTypeCodeId: '',
      editGlAccountId: '',
    }
  },
  watch: {
    async editGlTypeCodeId(oldVal, newVal) {
      this.glAccounts = await this.fetchGlAccountsData()
    },
    async editGlAccountId(oldVal, newVal) {
      this.glTypeCodes = await this.fetchData()
    },
  },
  async destroyed() {
    this.glAccounts = await this.fetchGlAccountsData()
    this.glTypeCodes = await this.fetchData()
  },
  methods: {
    async fetchGlAccountsData() {
      const {
        data: { glAccounts },
      } = await this.$apollo.query({
        query: GlAccounts,
        fetchPolicy: 'no-cache',
      })

      return glAccounts
    },
    async fetchData() {
      const {
        data: { glTypeCodes },
      } = await this.$apollo.query({
        query: GlTypeCodes,
        fetchPolicy: 'no-cache',
      })

      return glTypeCodes
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
    selectTypeCode(item) {
      if (this.selectedGlSubAccount.id) {
        this.selectedGlSubAccount.glTypeCode = item
      }

      this.glAccountNew.typeCode = item
    },
    selectSubAccountUnit(item, event) {
      if (!this.glAccountCopy.name) {
        this.glAccountCopy = { ...item }
        this.glAccountsCopy = [...this.glAccounts]
      }
      const glSubAccount = this.glAccounts.find(
        (account) => account.id === event.id
      )

      if (this.selectedGlSubAccount.idToCheck === glSubAccount.id) {
        this.glAccounts = this.glAccountsCopy
        this.glAccountCopy = {
          id: '',
          name: '',
        }
        this.selectedGlSubAccount = {
          id: null,
        }
      } else {
        this.selectedGlSubAccount = {
          ...this.glAccountCopy,
          idToCheck: event.id,
        }
        this.glAccounts = this.glAccountsCopy.map((obj) => {
          if (obj.id === item.id) {
            return {
              ...obj,
              name: event.name,
              // glTypeCode: {
              //   ...obj.glTypeCode,
              //   // id: glSubAccount.glTypeCode.id,
              //   description: glSubAccount.glTypeCode.description,
              // },
            }
          }

          return obj
        })
      }

      this.isReload = true
    },
    async addGl() {
      const unit = this.unit
      await this.mutationAction(
        CreateGlAccount,
        {
          GlAccountInput: {
            name: this.glAccountNew.name,
            glTypeCode: {
              connect: this.glAccountNew.typeCode.id,
            },
            ...(this.glAccountNew.parent.id && {
              parent: {
                connect: this.glAccountNew.parent.id,
              },
            }),
          },
        },
        GlAccounts,
        'Add Gl Account success',
        'Add Gl Account error'
      )
      this.unit = unit
    },
    async confirmEdit(glAccount) {
      const reload = this.isReload
      const unit = this.unit
      const editedGlAccount = {
        id: this.selectedGlSubAccount.idToCheck
          ? this.selectedGlSubAccount.idToCheck
          : glAccount.id,
        name: glAccount.name,
        glTypeCode: {
          connect: this.selectedGlSubAccount.idToCheck
            ? this.selectedGlSubAccount.glTypeCode.id
            : this.glAccountNew.typeCode.id,
        },
      }

      await this.mutationAction(
        UpdateGlAccount,
        {
          GlAccountInput: editedGlAccount,
        },
        GlAccounts,
        'Edit Gl Account success',
        'Edit Gl Account error'
      )
      this.unit = unit
      if (reload) {
        window.location.reload()
      }
    },
    async confirmDelete(id) {
      const unit = this.unit
      const reload = this.isReload

      await this.mutationAction(
        DeleteGlAccount,
        {
          id: this.selectedGlSubAccount.idToCheck
            ? this.selectedGlSubAccount.idToCheck
            : id,
        },
        GlAccounts,
        'Delete Gl Account success',
        'Delete Gl Account error'
      )
      this.unit = unit
      if (reload) {
        window.location.reload()
      }
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
        code: GlType.code,
        description: GlType.description,
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
    async addGlToUnit(glAccount) {
      const unit = this.unit
      const { id } = this.unit
      const reload = this.isReload

      await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            glAccounts: {
              sync: [
                ...this.unit.glAccounts.map((glAccount) => glAccount.id),
                this.selectedGlSubAccount.idToCheck
                  ? this.selectedGlSubAccount.idToCheck
                  : glAccount.id,
              ],
            },
          },
        },
        Units,
        'Add Gl account to unit success',
        'Add Gl account to unit error'
      )
      this.unit = unit
      if (reload) {
        window.location.reload()
      }
    },
    async removeGlFromUnit(glAccount) {
      const unit = this.unit
      const { id } = this.unit
      const reload = this.isReload

      await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            glAccounts: {
              disconnect: this.selectedGlSubAccount.idToCheck
                ? this.selectedGlSubAccount.idToCheck
                : glAccount.id,
            },
          },
        },
        Units,
        'Remove Gl account from unit success',
        'Remove Gl account from unit error'
      )
      this.unit = unit
      if (reload) {
        window.location.reload()
      }
    },
    editGlTypeCode(id) {
      this.editGlTypeCodeId = id
    },
    editGlAccount(id) {
      this.editGlAccountId = id
    },
    async cancelGlAccountsEdit() {
      this.glAccounts = await this.fetchGlAccountsData()
      this.isHide = false
      this.editGlAccountId = null
    },
    async cancelGlTypeCodesCopyEdit() {
      this.glTypeCodes = await this.fetchData()
      this.isHide = false
      this.editGlTypeCodeId = null
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 30px;
  @media screen and (min-width: $md) {
    grid-template-columns: repeat(2, 80px) 200px 100px 80px 150px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: repeat(2, 80px) 165px 110px 80px 130px auto;
  }
  &--gl-type {
    grid-template-columns: 80px 100px 100px auto;
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
  margin-bottom: 20px;
}

.table-header {
  margin-bottom: 8px;
}
</style>
