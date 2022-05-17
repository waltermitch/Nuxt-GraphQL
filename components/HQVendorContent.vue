<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <CustomTable>
        <template #header>
          <div class="table-row">
            <span>Vendor Number</span>

            <span>Vendor Name</span>

            <span>Terms</span>
          </div>
        </template>

        <template v-if="vendors" #content>
          <CustomTableRow
            v-for="vendor in vendors.data"
            :key="vendor.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === vendor.id"
              v-model="vendor.code"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ vendor.code }}</span>

            <CustomInput
              v-if="isEdit === vendor.id"
              v-model="vendor.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ vendor.name }}</span>

            <CustomSelect
              v-if="isEdit === vendor.id"
              :options="terms.data"
              :selected-item="vendor.term"
              select-by="dueDays"
              @input="selectTerm"
            />
            <span v-else>{{ vendor.term.dueDays }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === vendor.id"
              :is-delete-active="isDelete === vendor.id"
              @edit="edit(vendor.id)"
              @delete="deleteItem(vendor.id)"
              @cancel="cancelEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(vendor)"
              @confirm-delete="confirmDelete(vendor.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="vendorNew.code"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="vendorNew.name"
              rules="required"
              do-not-show-error-message
            />

            <CustomSelect
              :options="terms.data"
              select-by="dueDays"
              @input="selectTerm"
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addVendor"> Add Vendor </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Vendors from '../graphql/queries/vendors.gql'
import Terms from '../graphql/queries/terms.gql'
import CreateVendor from '../graphql/mutations/vendor/createVendor.gql'
import UpdateVendor from '../graphql/mutations/vendor/updateVendor.gql'
import DeleteVendor from '../graphql/mutations/vendor/deleteVendor.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQVendorContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomInput,
    CustomTableRow,
    CustomSelect,
    CustomTableAddIcon,
  },
  mixins: [mutationMixin, tableActionsMixin],
  apollo: {
    vendors: {
      query: Vendors,
    },
    terms: {
      query: Terms,
    },
  },
  data() {
    return {
      vendorNew: {
        code: '',
        name: '',
        term: null,
      },
    }
  },
  methods: {
    selectTerm(term) {
      this.vendorNew.term = term
    },
    addVendor() {
      this.mutationAction(
        CreateVendor,
        {
          vendorInput: {
            code: this.vendorNew.code,
            name: this.vendorNew.name,
            term: {
              connect: this.vendorNew.term.id,
            },
          },
        },
        Vendors,
        'Add vendor success',
        'Add vendor error'
      )
    },
    confirmEdit(vendor) {
      const editedVendor = {
        id: vendor.id,
        code: vendor.code,
        name: vendor.name,
        term: {
          connect: this.vendorNew.term.id,
        },
      }

      this.mutationAction(
        UpdateVendor,
        { vendorInput: editedVendor },
        Vendors,
        'Add vendor success',
        'Add vendor error'
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteVendor,
        { id },
        Vendors,
        'Add vendor success',
        'Add vendor error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px repeat(2, 200px) auto;
  column-gap: 30px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 4;
    justify-self: end;
  }
}

.buttons-area {
  margin-top: 25px;
}
</style>
