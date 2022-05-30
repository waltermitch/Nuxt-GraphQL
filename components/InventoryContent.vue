<template>
  <div class="content">
    <PageSubHeaderContent />

    <LoadingBar v-if="$apollo.loading" />
    <PageContentWrapper>
      <CustomTable class="table-full" :w-table="780">
        <template #header>
          <div class="table-row">
            <span>Category</span>

            <span>Name</span>

            <span>Previous Amount</span>

            <span>Current Amount</span>
          </div>
        </template>

        <template v-if="inventoryCategories" #content>
          <ValidationObserver ref="form">
            <CustomTableRow
              v-for="item in inventoriesCopy"
              :key="item.id"
              class="table-row"
            >
              <span class="table-text">
                {{ item.id }}
              </span>

              <span class="table-text">
                {{ item.name }}
              </span>

              <span class="table-text"> ${{ item.inventoryAmount }} </span>

              <CustomInput
                v-model.number="item.newAmount"
                rules="currency"
                type="number"
                placeholder="$0.00"
                do-not-show-error-message
              />
            </CustomTableRow>

            <CustomTableRow class="table-row footer">
              <span class="table-text"> Total: </span>

              <span class="table-text">${{ totalPreviousAmount }}</span>

              <span class="table-text">${{ totalCurrentValue }}</span>
            </CustomTableRow>
          </ValidationObserver>
        </template>
      </CustomTable>

      <div class="buttons-area">
        <DefaultButton button-color-gamma="red" @event="updateInventories">
          Save
        </DefaultButton>

        <DefaultButton button-color-gamma="white" @event="cancelUpdate"
          >Cancel</DefaultButton
        >
      </div>
    </PageContentWrapper>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import PageSubHeaderContent from './PageSubHeaderContent.vue'
import InventoryCategories from '~/graphql/queries/inventoryCategories.gql'
import UpdateInventories from '~/graphql/mutations/inventoryCategories/updateInventories.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'InventoryContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    ValidationObserver,
    PageSubHeaderContent,
  },
  apollo: {
    inventoryCategories: {
      query: InventoryCategories,
    },
  },
  mixins: [formMixin, mutationMixin],
  data() {
    return {
      inventoriesCopy: [],
    }
  },
  computed: {
    totalPreviousAmount() {
      return this.inventoriesCopy.reduce((prev, current) => {
        return Number(prev) + Number(current.inventoryAmount)
      }, 0)
    },
    totalCurrentValue() {
      return this.inventoriesCopy.reduce((prev, current) => {
        return Number(prev) + Number(current.newAmount)
      }, 0)
    },
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      const {
        data: { inventoryCategories },
      } = await this.$apollo.query({
        query: InventoryCategories,
        fetchPolicy: 'no-cache',
      })

      this.inventoriesCopy = inventoryCategories.map((item) => ({
        ...item,
        newAmount: '',
      }))
    },
    async updateInventories() {
      const {
        data: { updateInventories },
      } = await this.mutationAction(
        UpdateInventories,
        {
          inventoriesInput: this.inventoriesCopy.map((item) => {
            return {
              id: item.id,
              amount: Number(item.newAmount) || Number(item.inventoryAmount),
            }
          }),
        },
        InventoryCategories,
        'Update Inventory Categories success',
        'Update Inventory Categories error'
      )

      this.inventoriesCopy = updateInventories.map((item) => ({
        ...item,
        newAmount: '',
      }))
    },
    async cancelUpdate() {
      await this.fetchData()
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  div.subheader {
    justify-content: flex-start;
    overflow: auto;
    div {
      @media screen and (min-width: $lg) {
        margin-right: 120px;
      }
      @media screen and (max-width: $lg) {
        margin-right: 30px;
      }
    }
  }
}

.table-row {
  display: grid;
  align-items: center;
  column-gap: 20px;
  @media screen and (min-width: $lg) {
    grid-template-columns: 10% 30% 30% 25%;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 120px 220px 220px 120px;
  }
}

.table-full {
  @media screen and (min-width: $lg) and (max-width: $xxl) {
    width: calc(100vw - 280px);
  }
}

.table-text {
  font-size: $font-s;
}

.buttons-area {
  margin-top: 40px;

  button:first-child {
    margin-right: 11px;
  }
}

.footer {
  height: 60px;

  span:nth-child(1) {
    grid-column: 2;
    text-align: right;
  }

  span:nth-child(2) {
    grid-column: 3;
  }

  span:nth-child(3) {
    grid-column: 4;
  }
}
</style>
