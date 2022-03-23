<template>
  <PageContentWrapper>
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Monthly</span>

          <span>GL Account</span>

          <span>Amount</span>

          <span>Comments</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow v-for="item in items" :key="item.id" class="table-row">
          <CustomRadioButton
            :is-active="item.monthly"
            @set-is-active="setIsMonthly(item)"
          />

          <CustomSelect :options="item.glAccount" @input="selectGlAccount" />

          <CustomInput v-model="item.amount" />

          <CustomInput v-model="item.comment" />
        </CustomTableRow>
      </template>
    </CustomTable>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Save
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'FixedExpensesContent',
  components: {
    PageContentWrapper,
    CustomTableRow,
    CustomRadioButton,
    CustomSelect,
    CustomInput,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          monthly: true,
          glAccount: [
            {
              id: 1,
              name: 'Register #2',
            },
            {
              id: 2,
              name: 'Register #3',
            },
          ],
          amount: '',
          comment: 'Lorem ipsum',
        },
        {
          id: 2,
          monthly: false,
          glAccount: [
            {
              id: 1,
              name: 'Register #2',
            },
            {
              id: 2,
              name: 'Register #3',
            },
          ],
          amount: '',
          comment: 'Lorem ipsum',
        },
        {
          id: 3,
          monthly: false,
          glAccount: [
            {
              id: 1,
              name: 'Register #2',
            },
            {
              id: 2,
              name: 'Register #3',
            },
          ],
          amount: '',
          comment: '',
        },
      ],
    }
  },
  methods: {
    setIsMonthly(expensesItem) {
      // TODO refactor this methods when API would be available
      this.items = this.items.map((item) => {
        if (expensesItem.id === item.id) {
          return {
            ...item,
            monthly: !item.monthly,
          }
        }

        return {
          ...item,
        }
      })
    },
    selectGlAccount(item) {
      // TODO refactor this methods when API would be available
      this.items = this.items.map((listItem) => {
        listItem.glAccount = listItem.glAccount.map((account) => {
          if (account.id === item.id) {
            if (account.selected) {
              return {
                ...item,
                selected: null,
              }
            }

            return { ...item }
          }

          return { ...account }
        })

        return {
          ...listItem,
        }
      })
    },
    saveEvent() {},
    cancelEvent() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 150px 345px 192px 310px;
  column-gap: 20px;
}

.buttons-area {
  display: flex;
  margin-top: 36px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
