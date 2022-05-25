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
              v-model="state.code"
              rules="required|alpha"
              do-not-show-error-message
            />
            <span v-else>{{ state.code }}</span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model.number="state.salesTaxCafeteria"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else>{{ state.salesTaxCafeteria }}</span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model.number="state.salesTaxVending"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else> {{ state.salesTaxVending }}</span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model.number="state.salesTaxRestaurant"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else>
              {{ state.salesTaxRestaurant }}
            </span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model.number="state.salesTaxStore"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else>
              {{ state.salesTaxStore }}
            </span>

            <CustomInput
              v-if="isEdit === state.id"
              v-model.number="state.grossReceiptsTax"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else>
              {{ state.grossReceiptsTax }}
            </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === state.id"
              :is-delete-active="isDelete === state.id"
              @edit="edit(state.id)"
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
              v-model.number="stateNew.salesTaxCafeteria"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="stateNew.salesTaxVending"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="stateNew.salesTaxRestaurant"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="stateNew.salesTaxStore"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="stateNew.grossReceiptsTax"
              type="number"
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
      <DefaultButton @event="addState"> Add State </DefaultButton>

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
    }
  },
  watch: {
    async isEdit(oldVal, newVal) {
      this.states = await this.fetchData()
    },
  },
  async destroyed() {
    this.states = await this.fetchData()
  },
  methods: {
    async fetchData() {
      const {
        data: { states },
      } = await this.$apollo.query({
        query: States,
        fetchPolicy: 'no-cache',
      })

      return states
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
    async cancelStateEdit() {
      this.states = await this.fetchData()
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
