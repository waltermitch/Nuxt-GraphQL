<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else :w-table="780">
        <template #header>
          <div class="table-row">
            <span> Code </span>

            <span> Description </span>
          </div>
        </template>

        <template v-if="calculationCodes" #content>
          <CustomTableRow
            v-for="calculationCode in calculationCodes"
            :key="calculationCode.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === calculationCode.id"
              v-model="calculationCodeEdit.code"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ calculationCode.code }}</span>

            <CustomInput
              v-if="isEdit === calculationCode.id"
              v-model="calculationCodeEdit.description"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ calculationCode.description }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === calculationCode.id"
              :is-delete-active="isDelete === calculationCode.id"
              @edit="editCalculationCode(calculationCode)"
              @delete="deleteItem(calculationCode.id)"
              @cancel="cancelCalculationCodeEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(calculationCode)"
              @confirm-delete="confirmDelete(calculationCode.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="calculationCodeNew.code"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="calculationCodeNew.description"
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
      <DefaultButton @event="addCalculationCode">+ Add CalculationCode </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import CalculationCodes from '../graphql/queries/calculationCodes.gql'
import CreateCalculationCode from '../graphql/mutations/calculationCode/createCalculationCode.gql'
import UpdateCalculationCode from '../graphql/mutations/calculationCode/updateCalculationCode.gql'
import DeleteCalculationCode from '../graphql/mutations/calculationCode/deleteCalculationCode.gql'
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
  name: 'HQCalculationCodesContent',
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
    calculationCodes: {
      query: CalculationCodes,
    },
  },
  data() {
    return {
      calculationCodeNew: {
        code: '',
        description: '',
      },
      calculationCodeEdit: {},
    }
  },
  methods: {
    editCalculationCode(calculationCode) {
      this.calculationCodeEdit = Object.assign({}, calculationCode)
      this.edit(calculationCode.id)
    },
    addCalculationCode() {
      this.mutationAction(
        CreateCalculationCode,
        {
          calculationCodeInput: {
            code: this.calculationCodeNew.code,
            description: this.calculationCodeNew.description,
          },
        },
        CalculationCodes,
        'Add calculationCode success',
        'Add calculationCode error'
      )
    },
    confirmEdit(calculationCode) {
      const editedCalculationCode = {
        id: calculationCode.id,
        code: this.calculationCodeEdit.code,
        description: this.calculationCodeEdit.description,
      }

      this.mutationAction(
        UpdateCalculationCode,
        {
          calculationCodeInput: editedCalculationCode,
        },
        CalculationCodes,
        'Edit calculationCode success',
        'Edit calculationCode error',
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteCalculationCode,
        { id },
        CalculationCodes,
        'Delete calculationCode success',
        'Delete calculationCode error',
      )
    },
    cancelCalculationCodeEdit() {
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
  padding: 12px 0;
  @media screen and (min-width: $lg) {
    grid-template-columns: 40% 40% auto;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 200px 200px auto;
  }
}

.row {
  padding: 16.5px 10px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 4;
    justify-self: end;
  }
}

.icon--add {
  grid-column: 5;
}
</style>
