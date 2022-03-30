<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
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
          <CustomTableRow
            v-for="item in items"
            :key="item.id"
            class="table-row"
          >
            <CustomRadioButton
              :is-active="item.monthly"
              @set-is-active="setIsMonthly(item)"
            />

            <CustomSelect :options="item.glAccount" @input="selectGlAccount" />

            <CustomInput
              v-model="item.amount"
              rules="required|double|currency"
              placeholder="$0.00"
            />

            <CustomInput v-model="item.comment" rules="required" />

            <img
              src="~assets/images/icons/home/delete.svg"
              class="icon"
              @click="deleteRow(item.id)"
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
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
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
    ValidationObserver,
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
    ...mapActions({
      setShowMessage: 'formSubmissionMessage/setShowMessage',
      setMessageType: 'formSubmissionMessage/setMessageType',
    }),
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
    addRow() {
      this.items.push({
        id: this.items.length + 1,
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
      })
    },
    deleteRow(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    saveEvent() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.setShowMessage(true)
          this.setMessageType('success')
        } else {
          this.setShowMessage(true)
          this.setMessageType('error')
        }

        setTimeout(() => {
          this.setShowMessage(false)
        }, 4000)
      })
    },
    cancelEvent() {
      this.$refs.form.reset()
      Object.assign(this.$data, this.$options.data.apply(this))
      this.setShowMessage(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 150px 325px 192px 300px 20px;
  column-gap: 20px;
}

.buttons-area {
  display: flex;
  margin-top: 36px;

  button:first-child {
    margin-right: 11px;
  }
}

.add-row {
  height: 86px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 5;
  }
}
</style>
