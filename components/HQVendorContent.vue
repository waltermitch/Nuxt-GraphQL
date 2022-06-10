<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable :w-table="520">
        <template #header>
          <div class="table-row">
            <span>Vendor Number</span>

            <span>Vendor Name</span>

            <span>Terms</span>
          </div>
        </template>

        <template v-if="vendors" #content>
          <CustomTableRow
            v-for="vendor in vendors"
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

            <div v-if="isEdit === vendor.id" class="multiselects">
              <Multiselect
                v-if="terms"
                v-model="vendor.terms"
                :options="terms"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :show-labels="false"
                :preserve-search="true"
                placeholder="Pick some"
                label="name"
                track-by="name"
                :preselect-first="false"
              >
              </Multiselect>
            </div>
            <span v-else-if="vendor.terms">{{
              vendor.terms.map((vendor) => vendor.name).join(', ')
            }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === vendor.id"
              :is-delete-active="isDelete === vendor.id"
              @edit="edit(vendor.id)"
              @delete="deleteItem(vendor.id)"
              @cancel="cancelVendorEdit"
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

            <div class="multiselects">
              <Multiselect
                v-if="terms"
                v-model="vendorNew.terms"
                :options="terms"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :show-labels="false"
                :preserve-search="true"
                placeholder="Pick some"
                label="name"
                track-by="name"
                :preselect-first="false"
              >
              </Multiselect>
            </div>
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
import Multiselect from 'vue-multiselect'
import Vendors from '../graphql/queries/vendors.gql'
import Terms from '../graphql/queries/terms.gql'
import CreateVendor from '../graphql/mutations/vendor/createVendor.gql'
import UpdateVendor from '../graphql/mutations/vendor/updateVendor.gql'
import DeleteVendor from '../graphql/mutations/vendor/deleteVendor.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
import CustomTableRow from './CustomTableRow.vue'
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
    CustomTableAddIcon,
    Multiselect,
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
        terms: null,
      },
      vendorTerms: '',
    }
  },
  watch: {
    async isEdit(oldVal, newVal) {
      this.vendors = await this.fetchData()
    },
  },
  async destroyed() {
    this.vendors = await this.fetchData()
  },
  methods: {
    async fetchData() {
      const {
        data: { vendors },
      } = await this.$apollo.query({
        query: Vendors,
        fetchPolicy: 'no-cache',
      })

      return vendors
    },
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
            terms: {
              sync: this.vendorNew.terms.map((term) => term.id),
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
        terms: {
          sync: vendor.terms.map((term) => term.id),
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
    async cancelVendorEdit() {
      this.cancelEdit()
      this.vendors = await this.fetchData()
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
  align-items: center;
  column-gap: 30px;
  @media screen and (min-width: $md) {
    grid-template-columns: 100px repeat(2, 200px) auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px repeat(2, 120px) auto;
  }
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
