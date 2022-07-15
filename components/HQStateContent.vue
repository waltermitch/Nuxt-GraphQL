<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else class="table-full" :w-table="1100">
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
            v-for="state in states"
            :key="state.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === state.id"
              v-model="stateEdit.code"
              rules="required|alpha"
              do-not-show-error-message
            />
            <span v-else>{{ state.code }}</span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model="stateEdit.salesTaxCafeteria"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxCafeteria', true)"
            />
            <span v-else>{{ parseFloat(state.salesTaxCafeteria).toFixed(2) }}%</span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model="stateEdit.salesTaxVending"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxVending', true)"
            />
            <span v-else> {{ parseFloat(state.salesTaxVending).toFixed(2) }}%</span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model="stateEdit.salesTaxRestaurant"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxRestaurant', true)"
            />
            <span v-else>
              {{ parseFloat(state.salesTaxRestaurant).toFixed(2) }}%
            </span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model="stateEdit.salesTaxStore"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxStore', true)"
            />
            <span v-else>
              {{ parseFloat(state.salesTaxStore).toFixed(2) }}%
            </span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model="stateEdit.grossReceiptsTax"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('grossReceiptsTax', true)"
            />
            <span v-else>
              {{ parseFloat(state.grossReceiptsTax).toFixed(2) }}%
            </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === state.id"
              :is-delete-active="isDelete === state.id"
              @edit="editState(state)"
              @delete="deleteItem(state.id)"
              @cancel="cancelStateEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(state)"
              @confirm-delete="confirmDelete(state.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="stateNew.code"
              rules="required|alpha"
              do-not-show-error-message
            />

            <CustomInput
              v-model="stateNew.salesTaxCafeteria"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxCafeteria')"
            />

            <CustomInput
              v-model="stateNew.salesTaxVending"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxVending')"
            />

            <CustomInput
              v-model="stateNew.salesTaxRestaurant"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxRestaurant')"
            />

            <CustomInput
              v-model="stateNew.salesTaxStore"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('salesTaxStore')"
            />

            <CustomInput
              v-model="stateNew.grossReceiptsTax"
              type="number"
              rules="required|double"
              do-not-show-error-message
              @change="onChangeFloatValue('grossReceiptsTax')"
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addState">+ Add State </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
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
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQStateContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomInput,
    DefaultButton,
    CustomTableIconsColumn,
    CustomTableAddIcon,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin],
  apollo: {
    states: {
      query: States,
    },
  },
  data() {
    return {
      stateNew: {
        code: '',
        salesTaxCafeteria: '',
        salesTaxVending: '',
        salesTaxRestaurant: '',
        salesTaxStore: '',
        grossReceiptsTax: '',
      },
      stateEdit: {},
    }
  },
  methods: {
    onChangeFloatValue(stateProp, isEdit = false) {
      if ( isEdit ) {
        this.stateEdit[stateProp] = parseFloat(this.stateEdit[stateProp] !== '' ? this.stateEdit[stateProp] : 0).toFixed(2)
      } else {
        this.stateNew[stateProp] = parseFloat(this.stateNew[stateProp] !== '' ? this.stateNew[stateProp] : 0).toFixed(2)
      }
    },
    editState(state) {
      this.stateEdit = Object.assign({}, state)
      this.edit(state.id)
    },
    confirmEdit(state) {
      const editedState = {
        id: state.id,
        code: this.stateEdit.code,
        salesTaxCafeteria: +this.stateEdit.salesTaxCafeteria,
        salesTaxVending: +this.stateEdit.salesTaxVending,
        salesTaxRestaurant: +this.stateEdit.salesTaxRestaurant,
        salesTaxStore: +this.stateEdit.salesTaxStore,
        grossReceiptsTax: +this.stateEdit.grossReceiptsTax,
      }

      this.mutationAction(
        UpdateState,
        { stateInput: editedState },
        States,
        'Edit state success',
        'Edit state error'
      )
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
        {
          stateInput: {
            code: this.stateNew.code,
            salesTaxCafeteria: +this.stateNew.salesTaxCafeteria,
            salesTaxVending: +this.stateNew.salesTaxVending,
            salesTaxRestaurant: +this.stateNew.salesTaxRestaurant,
            salesTaxStore: +this.stateNew.salesTaxStore,
            grossReceiptsTax: +this.stateNew.grossReceiptsTax,
          },
        },
        States,
        'Add state success',
        'Add state error'
      )
    },
    cancelStateEdit() {
      this.cancelEdit()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 40px repeat(5, 150px) auto;
  column-gap: 30px;
  padding: 12px 0;
}

.row {
  padding: 16.5px 10px;
}
.icon {
  cursor: pointer;

  &--add {
    grid-column: 7;
    justify-self: end;
  }
}

.table-full {
  @media screen and (min-width: $lg) and (max-width: $xxl) {
    width: calc(100vw - 280px);
  }
}

.buttons-area {
  margin-top: 25px;
}
</style>
