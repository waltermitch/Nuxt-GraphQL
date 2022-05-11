<template>
  <PageContentWrapper>
    <div class="header">
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <CustomSelect
              v-if="units"
              :options="units.data"
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

    <ValidationObserver ref="form">
      <div>
        <div>
          <h2>Gls</h2>

          <CustomTable class="table">
            <template #header>
              <div class="table-row">
                <span>GL</span>

                <span>Sub</span>

                <span>Name</span>

                <span> Type </span>

                <span>GL ID</span>
              </div>
            </template>

            <template v-if="glAccounts" #content>
              <CustomTableRow
                v-for="glAccount in glAccounts.data"
                :key="glAccount.id"
                class="table-row"
              >
                <span>{{ glAccount.id }}</span>

                <span v-if="glAccount.child">{{ glAccount.child.id }}</span>
                <span v-else>-</span>

                <CustomInput
                  v-if="isEdit === glAccount.id"
                  v-model="glAccount.name"
                  rules="required|alpha"
                />
                <span v-else>{{ glAccount.name }}</span>

                <CustomSelect
                  v-if="glTypeCodes && isEdit === glAccount.id"
                  :options="glTypeCodes.data"
                  @input="selectTypeCode"
                />
                <span v-else>{{ glAccount.glTypeCode.id }}</span>

                <CustomInput
                  v-if="isEdit === glAccount.id && glAccount.paren"
                  v-model="glAccount.parent.id"
                  rules="required|alpha"
                />
                <span v-else-if="glAccount.parent">{{
                  glAccount.parent.id
                }}</span>
                <span v-else>-</span>

                <CustomTableIconsColumn
                  :is-edit-active="isEdit === glAccount.id"
                  :is-delete-active="isDelete === glAccount.id"
                  @edit="edit(glAccount.id)"
                  @delete="deleteItem(glAccount.id)"
                  @cancel="cancelEdit"
                  @cancel-delete="cancelDelete"
                  @confirm-edit="confirmEdit(glAccount)"
                  @confirm-delete="confirmDelete(glAccount.id)"
                />
              </CustomTableRow>

              <CustomTableRow v-if="isAdd" class="table-row">
                <span>-</span>

                <span>-</span>

                <CustomInput v-model="glAccountNew.name" rules="required" />

                <CustomSelect
                  v-if="glTypeCodes"
                  select-by="description"
                  :options="glTypeCodes.data"
                  @input="selectTypeCode"
                />

                <CustomInput v-model="glAccountNew.parent.id" />
              </CustomTableRow>

              <CustomTableRow class="table-row add-row">
                <img
                  src="~assets/images/icons/home/add.svg"
                  class="icon icon--add"
                  @click="addRow"
                />
              </CustomTableRow>
            </template>
          </CustomTable>

          <div v-if="isAdd" class="buttons-area">
            <DefaultButton @event="addGl"> Add Gl Account </DefaultButton>

            <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
          </div>
        </div>

        <div>
          <h2>Gl Types</h2>

          <CustomTable class="table">
            <template #header>
              <div class="table-row table-row--gl-type">
                <span>ID</span>

                <span>Code</span>

                <span>Description</span>
              </div>
            </template>

            <template v-if="glTypeCodes" #content>
              <CustomTableRow
                v-for="glTypeCode in glTypeCodes.data"
                :key="glTypeCode.id"
                class="table-row table-row--gl-type"
              >
                <span>{{ glTypeCode.id }}</span>

                <CustomInput
                  v-if="isEdit === glTypeCode.id"
                  v-model="glTypeCode.code"
                  rules="required"
                />
                <span v-else>{{ glTypeCode.code }}</span>

                <CustomInput
                  v-if="isEdit === glTypeCode.id"
                  v-model="glTypeCode.description"
                  rules="required"
                />
                <span v-else>{{ glTypeCode.description }}</span>

                <CustomTableIconsColumn
                  :is-edit-active="isEdit === glTypeCode.id"
                  :is-delete-active="isDelete === glTypeCode.id"
                  @edit="edit(glTypeCode.id)"
                  @delete="deleteItem(glTypeCode.id)"
                  @cancel="cancelEdit"
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

                <CustomInput v-model="glTypeCodeNew.code" rules="required" />

                <CustomInput
                  v-model="glTypeCodeNew.description"
                  rules="required"
                />
              </CustomTableRow>

              <CustomTableRow class="table-row add-row table-row--gl-type">
                <img
                  src="~assets/images/icons/home/add.svg"
                  class="icon icon--add"
                  @click="addGlTypeRow"
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

    <!-- <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span>GL</span>

          <span>Sub</span>

          <span>Name</span>

          <span>Type</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="item in unitRecords"
          :key="item.id"
          class="table-row"
        >
          <CustomSelect
            :options="item.glAccounts"
            @input="selectGlAccountUnit"
          />

          <CustomSelect
            :options="item.subAccounts"
            @input="selectSubAccountUnit"
          />

          <span>
            {{ item.name }}
          </span>

          <span>
            {{ item.type }}
          </span>
        </CustomTableRow>
      </template>
    </CustomTable> -->
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Units from '../graphql/queries/units.gql'
import GlAccounts from '../graphql/queries/glAccounts.gql'
import GlTypeCodes from '../graphql/queries/glTypeCodes.gql'
import CreateGlTypeCode from '../graphql/mutations/glTypeCode/createGlTypeCode.gql'
import UpdateGlTypeCode from '../graphql/mutations/glTypeCode/updateGlTypeCode.gql'
import DeleteGlTypeCode from '../graphql/mutations/glTypeCode/deleteGlTypeCode.gql'
import CreateGlAccount from '../graphql/mutations/glAccount/createGlAccount.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
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
      unitRecords: [
        {
          id: 0,
          glAccounts: [
            {
              id: 1,
              value: '4200',
              name: '4200',
            },
            {
              id: 2,
              value: '4300',
              name: '4300',
            },
          ],
          subAccounts: [
            {
              id: 1,
              value: '001',
              name: '001',
            },
          ],
          name: 'Sales - Cafeteria Manual',
          type: 'sales',
        },
        {
          id: 1,
          glAccounts: [
            {
              id: 1,
              value: '5000',
              name: '5000',
            },
            {
              id: 2,
              value: '5300',
              name: '5300',
            },
          ],
          subAccounts: [
            {
              id: 1,
              value: '002',
              name: '002',
            },
          ],
          name: 'Food costs - Cafeteria',
          type: 'expense',
        },
      ],
    }
  },
  methods: {
    addGlTypeRow() {
      this.isAddGlTypeCode = true
    },
    cancelAddGlTypeCode() {
      this.isAddGlTypeCode = false
    },
    selectUnit(item) {
      this.unit = item
    },
    selectTypeCode(item) {
      this.glAccountNew.typeCode = item
    },
    selectGlAccountUnit(item) {},
    selectSubAccountUnit(item) {},
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
            parent: {
              connect: this.glAccountNew.parent.id,
            },
          },
        },
        GlAccounts,
        'Add Gl Type success',
        'Add Gl Type error'
      )
      this.unit = unit
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
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: fit-content;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 80px) 200px 100px 80px 60px;
  column-gap: 30px;

  &--gl-type {
    grid-template-columns: 80px 100px 100px 60px;
  }
}

.icon {
  cursor: pointer;
}
</style>
