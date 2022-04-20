<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <CustomTable class="table">
        <template #header>
          <div class="table-row">
            <span>State</span>

            <span>Sales Tax - Cafeteria</span>

            <span>Sales Tax - Vending</span>

            <span>Sales Tax - Restaurant</span>

            <span>Sales Tax - C Store</span>

            <span>Gross Receipts Tax</span>
          </div>
        </template>

        <template v-if="states" #content>
          <CustomTableRow
            v-for="state in states.data"
            :key="state.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEditState === state.id"
              v-model="state.code"
              rules="required|alpha"
            />
            <span v-else>{{ state.code }}</span>

            <CustomInput
              v-if="isEditState === state.id"
              v-model.number="state.salesTaxCafeteria"
              type="number"
              rules="required|double"
            />
            <span v-else>{{ addPercentSign(state.salesTaxCafeteria) }}</span>

            <CustomInput
              v-if="isEditState === state.id"
              v-model.number="state.salesTaxVending"
              type="number"
              rules="required|double"
            />
            <span v-else> {{ addPercentSign(state.salesTaxVending) }}</span>

            <CustomInput
              v-if="isEditState === state.id"
              v-model.number="state.salesTaxRestaurant"
              type="number"
              rules="required|double"
            />
            <span v-else>
              {{ addPercentSign(state.salesTaxRestaurant) }}
            </span>

            <CustomInput
              v-if="isEditState === state.id"
              v-model.number="state.salesTaxStore"
              type="number"
              rules="required|double"
            />
            <span v-else>
              {{ addPercentSign(state.salesTaxStore) }}
            </span>

            <CustomInput
              v-if="isEditState === state.id"
              v-model.number="state.grossReceiptsTax"
              type="number"
              rules="required|double"
            />
            <span v-else>
              {{ addPercentSign(state.grossReceiptsTax) }}
            </span>

            <CustomTableIconsColumn
              :is-edit-active="isEditState === state.id"
              :is-delete-active="isDeleteState === state.id"
              @edit="editState(state.id)"
              @delete="deleteState(state.id)"
              @cancel="cancelEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(state)"
              @confirm-delete="confirmDelete(state.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAddState" class="table-row">
            <CustomInput v-model="stateNew.code" rules="required|alpha" />

            <CustomInput
              v-model.number="stateNew.salesTaxCafeteria"
              type="number"
              rules="required|double"
            />

            <CustomInput
              v-model.number="stateNew.salesTaxVending"
              type="number"
              rules="required|double"
            />

            <CustomInput
              v-model.number="stateNew.salesTaxRestaurant"
              type="number"
              rules="required|double"
            />

            <CustomInput
              v-model.number="stateNew.salesTaxStore"
              type="number"
              rules="required|double"
            />

            <CustomInput
              v-model.number="stateNew.grossReceiptsTax"
              type="number"
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

    <div v-if="isAddState" class="buttons-area">
      <DefaultButton @event="addState"> Add State </DefaultButton>

      <DefaultButton @event="cancel"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import States from '../graphql/queries/states.gql'
import CreateState from '../graphql/mutations/state/createState.gql'
import UpdateState from '../graphql/mutations/state/updateState.gql'
import DeleteState from '../graphql/mutations/state/deleteState.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
import DefaultButton from './DefaultButton.vue'
import CustomTableIconsColumn from './CustomTableIconsColumn.vue'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import { addPercentSign } from '~/helpers/helpers'
export default {
  name: 'HQStateContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomInput,
    DefaultButton,
    CustomTableIconsColumn,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin],
  apollo: {
    states: {
      query: States,
    },
  },
  data() {
    return {
      isAddState: false,
      isEditState: false,
      isDeleteState: false,
      stateNew: {
        code: '',
        salesTaxCafeteria: '',
        salesTaxVending: '',
        salesTaxRestaurant: '',
        salesTaxStore: '',
        grossReceiptsTax: '',
      },
    }
  },
  methods: {
    addPercentSign,
    addRow() {
      this.isAddState = true
    },
    editState(stateID) {
      this.isEditState = stateID
    },
    cancelEdit() {
      this.isEditState = null
    },
    confirmEdit(state) {
      const editedState = {
        id: state.id,
        code: state.code,
        salesTaxCafeteria: state.salesTaxCafeteria,
        salesTaxVending: state.salesTaxVending,
        salesTaxRestaurant: state.salesTaxRestaurant,
        salesTaxStore: state.salesTaxStore,
        grossReceiptsTax: state.grossReceiptsTax,
      }

      this.mutationAction(
        UpdateState,
        { stateInput: editedState },
        States,
        'Edit state success',
        'Edit state error'
      )
    },
    deleteState(stateID) {
      this.isDeleteState = stateID
    },
    cancelDelete() {
      this.isDeleteState = null
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteState,
        { id },
        States,
        'Delete state success',
        'Delete state error'
      )
    },
    addState() {
      this.mutationAction(
        CreateState,
        { stateInput: this.stateNew },
        States,
        'Add state success',
        'Add state error'
      )
    },
    cancel() {
      this.addState = false
      this.clearState()
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
  grid-template-columns: 40px repeat(5, 150px) 60px;
  column-gap: 30px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 7;
    justify-self: end;
  }
}

.buttons-area {
  margin-top: 25px;
}
</style>
