<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <CustomTable :w-table="520">
        <template #header>
          <div class="table-row">
            <span> Code </span>

            <span> Name </span>

            <span>Tax </span>
          </div>
        </template>

        <template v-if="districts" #content>
          <CustomTableRow
            v-for="district in districts.data"
            :key="district.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === district.id"
              v-model="district.code"
              rules="required|alpha"
              do-not-show-error-message
            />
            <span v-else>{{ district.code }}</span>

            <CustomInput
              v-if="isEdit === district.id"
              v-model="district.name"
              rules="required|alpha"
              do-not-show-error-message
            />
            <span v-else>{{ district.name }}</span>

            <CustomInput
              v-if="isEdit === district.id"
              v-model.number="district.tax"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else>{{ addPercentSign(district.tax) }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === district.id"
              :is-delete-active="isDelete === district.id"
              @edit="edit(district.id)"
              @delete="deleteItem(district.id)"
              @cancel="cancelDistrictEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(district)"
              @confirm-delete="confirmDelete(district.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="districtNew.code"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="districtNew.name"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="districtNew.tax"
              rules="required|double"
              do-not-show-error-message
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addDistrict"> Add District </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Districts from '../graphql/queries/districts.gql'
import CreateDistrict from '../graphql/mutations/district/createDistrict.gql'
import UpdateDistrict from '../graphql/mutations/district/updateDistrict.gql'
import DeleteDistrict from '../graphql/mutations/district/deleteDistrict.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQDistrictContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomInput,
    CustomTableAddIcon,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin],
  apollo: {
    districts: {
      query: Districts,
    },
  },
  data() {
    return {
      districtNew: {
        code: '',
        name: '',
        tax: '',
      },
    }
  },
  watch: {
    async isEdit(oldVal, newVal) {
      this.districts.data = await this.fetchData()
    },
  },
  async destroyed() {
    this.districts.data = await this.fetchData()
  },
  methods: {
    async fetchData() {
      const {
        data: {
          districts: { data },
        },
      } = await this.$apollo.query({
        query: Districts,
        fetchPolicy: 'no-cache',
      })

      return data
    },
    addDistrict() {
      this.mutationAction(
        CreateDistrict,
        {
          districtInput: {
            name: this.districtNew.name,
            code: this.districtNew.code,
            tax: this.districtNew.tax,
          },
        },
        Districts,
        'Add district success',
        'Add district error'
      )
    },
    confirmEdit(district) {
      const editedDistrict = {
        id: district.id,
        code: district.code,
        name: district.name,
        tax: district.tax,
      }

      this.mutationAction(
        UpdateDistrict,
        {
          districtInput: editedDistrict,
        },
        Districts,
        'Add district success',
        'Add district error'
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteDistrict,
        { id },
        Districts,
        'Delete state success',
        'Delete state error'
      )
    },
    async cancelDistrictEdit() {
      this.districts.data = await this.fetchData()
      this.cancelEdit()
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
    grid-template-columns: 100px 200px 100px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px 120px 120px auto;
  }
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 4;
    justify-self: end;
  }
}
</style>
