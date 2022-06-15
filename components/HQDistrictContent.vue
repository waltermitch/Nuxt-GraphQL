<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else :w-table="520">
        <template #header>
          <div class="table-row">
            <span> Code </span>

            <span> Name </span>
          </div>
        </template>

        <template v-if="districts" #content>
          <CustomTableRow
            v-for="district in districts"
            :key="district.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === district.id"
              v-model="districtEdit.code"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ district.code }}</span>

            <CustomInput
              v-if="isEdit === district.id"
              v-model="districtEdit.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ district.name }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === district.id"
              :is-delete-active="isDelete === district.id"
              @edit="editDistrict(district)"
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
      },
      districtEdit: {},
    }
  },
  methods: {
    editDistrict(district) {
      this.districtEdit = Object.assign({}, district)
      this.edit(district.id)
    },
    addDistrict() {
      this.mutationAction(
        CreateDistrict,
        {
          districtInput: {
            name: this.districtNew.name,
            code: this.districtNew.code,
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
        code: this.districtEdit.code,
        name: this.districtEdit.name,
      }

      this.mutationAction(
        UpdateDistrict,
        {
          districtInput: editedDistrict,
        },
        Districts,
        'Edit district success',
        'Edit district error'
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteDistrict,
        { id },
        Districts,
        'Delete district success',
        'Delete district error'
      )
    },
    cancelDistrictEdit() {
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
    grid-template-columns: 100px 200px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px 120px auto;
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
