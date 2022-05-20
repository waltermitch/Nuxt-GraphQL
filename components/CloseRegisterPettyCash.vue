<template>
  <div>
    <ValidationObserver ref="form">
      <div class="input-row">
        <InputWithTitle>
          <template #title> Total Petty Cash </template>

          <template #input>
            <CustomInput v-model="totalPettyCash" rules="required|currency" />
          </template>
        </InputWithTitle>
      </div>

      <CustomTable>
        <template #header>
          <div class="table-row">
            <span>GL Account</span>

            <span>Amount</span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="item in getItems"
            :key="item.id"
            class="table-row"
          >
            <CustomSelect
              v-if="glAccounts && getIsEdit"
              :options="glAccounts.data"
              select-by="name"
              :selected-item="
                glAccounts.data.find(
                  (glAccount) => glAccount.id == item.glAccountId
                )
              "
              @input="selectGlAccount(item, $event)"
            />
            <span v-else-if="!getIsEdit">{{ item.glAccount.name }}</span>

            <CustomInput
              :value="item.amount"
              placeholder="$0.00"
              do-not-show-error-message
              :rules="{
                between: [1, `${leftToDistribute + Number(item.amount)}`],
              }"
              @input="(e) => updateItems(item, Number(e), 'amount')"
            />
            <img
              src="~assets/images/icons/home/delete.svg"
              class="icon"
              @click="deleteRow(item.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomSelect
              v-if="glAccounts"
              :options="glAccounts.data"
              select-by="name"
              @input="selectWewItemGlAccount"
            />

            <CustomInput
              v-model="newItem.amount"
              placeholder="$0.00"
              do-not-show-error-message
              :rules="{
                between: [1, `${leftToDistribute + Number(newItem.amount)}`],
              }"
            />
          </CustomTableRow>

          <CustomTableRow v-if="leftToDistribute > 0" class="table-row add-row">
            <img
              src="~assets/images/icons/home/add.svg"
              class="icon icon--add"
              @click="addRow"
            />
          </CustomTableRow>

          <div v-if="isAdd" class="buttons-area add-item-buttons">
            <DefaultButton @event="addItem"> Add Item </DefaultButton>

            <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
          </div>

          <CustomTableRow class="table-row footer">
            <span>Left To Distribute</span>

            <span>${{ leftToDistribute }}</span>
          </CustomTableRow>
        </template>
      </CustomTable>

      <div class="buttons-area">
        <DefaultButton button-color-gamma="red" @event="nextTab">
          Continue
        </DefaultButton>

        <DefaultButton
          button-color-gamma="white"
          @event="getIsEdit ? cancelEdit() : cancelCreate()"
        >
          Cancel
        </DefaultButton>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import InputWithTitle from './InputWithTitle.vue'
import GlAccounts from '~/graphql/queries/glAccounts.gql'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { closeRegisterMixin } from '~/mixins/closeRegisterMixin'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
export default {
  name: 'ClosRegisterPettyCash',
  components: {
    ValidationObserver,
    CustomTable,
    CustomTableRow,
    CustomSelect,
    CustomInput,
    InputWithTitle,
  },
  mixins: [tableActionsMixin, closeRegisterMixin, tabsViewMixin],
  apollo: {
    glAccounts: {
      query: GlAccounts,
    },
  },
  data() {
    return {
      newItem: {
        glAccount: '',
        amount: '',
      },
    }
  },
  computed: {
    leftToDistribute() {
      const totalAmount = this.getItems.reduce((prev, current) => {
        return Number(prev) + Number(current.amount)
      }, 0)

      return this.totalPettyCash - totalAmount
    },
    totalPettyCash: {
      get() {
        return this.getTotalPettyCache
      },
      set(value) {
        this.$store.commit('closeRegister/SET_TOTAL_PETTY_CACHE', value)
      },
    },
  },
  methods: {
    addItem() {
      const formValidated = this.$refs.form && this.$refs.form.validate()

      if (formValidated) {
        if (this.newItem.amount) {
          this.$store.commit('closeRegister/SET_ITEM', this.newItem)
        }

        this.isSelectedGlAccount = false

        this.isAdd = false
        this.isHide = false
        this.newItem = {
          amount: '',
          glAccount: '',
        }
      }
    },
    deleteRow(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    updateItems(item, event, itemProp) {
      this.$store.commit(
        'closeRegister/SET_ITEMS',
        this.getItems.map((vuexItem) => {
          if (vuexItem.id === item.id) {
            return {
              ...vuexItem,
              [itemProp]: event,
            }
          }

          return vuexItem
        })
      )
    },
    selectGlAccount(item, glAccount) {
      this.updateItems(item, glAccount, 'glAccount')
    },
    selectWewItemGlAccount(glAccount) {
      this.newItem.glAccount = glAccount
    },
  },
}
</script>

<style lang="scss" scoped>
.input-row {
  max-width: 240px;
  margin-bottom: 20px;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 453px 206px 20px;
  column-gap: 30px;
}

.add-row {
  height: 60px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 3;
  }
}

.footer {
  color: $night-rider;
  font-weight: 700;
  text-align: right;
  height: 60px;
}

.buttons-area {
  margin-top: 25px;
}
</style>
