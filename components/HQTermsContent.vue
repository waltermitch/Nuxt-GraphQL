<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else :w-table="780">
        <template #header>
          <div class="table-row">
            <span> Name </span>

            <span> Due Days </span>

            <span> Disc Percent </span>

            <span> Disc Days </span>
          </div>
        </template>

        <template v-if="terms" #content>
          <CustomTableRow
            v-for="term in terms"
            :key="term.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === term.id"
              v-model="termEdit.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ term.name }}</span>

            <CustomInput
              v-if="isEdit === term.id"
              v-model="termEdit.dueDays"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ term.dueDays }}</span>

            <CustomInput
              v-if="isEdit === term.id"
              v-model="termEdit.discPercent"
              type="number"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>
              {{ term.discPercent }}%
            </span>

            <CustomInput
              v-if="isEdit === term.id"
              v-model="termEdit.discDays"
              type="number"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ term.discDays }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === term.id"
              :is-delete-active="isDelete === term.id"
              @edit="editTerm(term)"
              @delete="deleteItem(term.id)"
              @cancel="cancelTermEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(term)"
              @confirm-delete="confirmDelete(term.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="termNew.name"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="termNew.dueDays"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="termNew.discPercent"
              type="number"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="termNew.discDays"
              type="number"
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
      <DefaultButton @event="addTerm">+ Add Term </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Terms from '../graphql/queries/terms.gql'
import CreateTerm from '../graphql/mutations/term/createTerm.gql'
import UpdateTerm from '../graphql/mutations/term/updateTerm.gql'
import DeleteTerm from '../graphql/mutations/term/deleteTerm.gql'
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
  name: 'HQTermsContent',
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
    terms: {
      query: Terms,
    },
  },
  data() {
    return {
      termNew: {
        name: '',
        dueDays: '',
        discPercent: '',
        discDays: '',
      },
      termEdit: {},
    }
  },
  methods: {
    editTerm(term) {
      this.termEdit = Object.assign({}, term)
      this.edit(term.id)
    },
    addTerm() {
      this.mutationAction(
        CreateTerm,
        {
          termInput: {
            name: this.termNew.name,
            dueDays: this.termNew.dueDays,
            discPercent: +this.termNew.discPercent,
            discDays: +this.termNew.discDays,
          },
        },
        Terms,
        'Add term success',
        'Add term error'
      )
    },
    confirmEdit(term) {
      const editedTerm = {
        id: term.id,
        name: this.termEdit.name,
        dueDays: this.termEdit.dueDays,
        discPercent: +this.termEdit.discPercent,
        discDays: +this.termEdit.discDays,
      }

      this.mutationAction(
        UpdateTerm,
        {
          termInput: editedTerm,
        },
        Terms,
        'Edit term success',
        'Edit term error',
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteTerm,
        { id },
        Terms,
        'Delete term success',
        'Delete term error',
      )
    },
    cancelTermEdit() {
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
    grid-template-columns: 20% 20% 20% 20% auto;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 200px 100px 100px 100px auto;
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
