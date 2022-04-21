<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <CustomTable class="table">
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
            />
            <span v-else>{{ district.code }}</span>

            <CustomInput
              v-if="isEdit === district.id"
              v-model="district.name"
              rules="required|alpha"
            />
            <span v-else>{{ district.name }}</span>

            <CustomInput
              v-if="isEdit === district.id"
              v-model.number="district.tax"
              rules="required|double"
            />
            <span v-else>{{ addPercentSign(district.tax) }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === district.id"
              :is-delete-active="isDelete === district.id"
              @edit="edit(district.id)"
              @delete="deleteItem(district.id)"
              @cancel="cancelEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(district)"
              @confirm-delete="confirmDelete(district.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput v-model="districtNew.code" rules="required" />

            <CustomInput v-model="districtNew.name" rules="required" />

            <CustomInput
              v-model.number="districtNew.tax"
              rules="required|double"
            />
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
import { accountingMixin } from '~/mixins/accountingMixin'
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
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, accountingMixin],
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
  methods: {
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
  grid-template-columns: 100px 200px 100px 60px;
  column-gap: 30px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 4;
    justify-self: end;
  }
}
</style>
