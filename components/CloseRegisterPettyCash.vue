<template>
  <div>
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
        <CustomTableRow v-for="item in items" :key="item.id" class="table-row">
          <CustomSelect
            :options="glAccounts"
            @input="selectGLAccount(item.id, $event)"
          />

          <CustomInput
            v-model="item.amount"
            placeholder="$0.00"
            :rules="{
              between: [1, `${leftToDistribute + Number(item.amount)}`],
            }"
          />
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

        <CustomTableRow class="table-row footer">
          <span>Left To Distribute</span>

          <span>${{ leftToDistribute }}</span>
        </CustomTableRow>
      </template>
    </CustomTable>
  </div>
</template>

<script>
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import InputWithTitle from './InputWithTitle.vue'
export default {
  name: 'ClosRegisterPettyCash',
  components: {
    CustomTable,
    CustomTableRow,
    CustomSelect,
    CustomInput,
    InputWithTitle,
  },
  data() {
    return {
      totalPettyCash: '',
      items: [
        {
          id: 0,
          amount: '',
        },
      ],
      glAccounts: [
        {
          id: 0,
          name: 'Food Costs - Cafeterias',
        },
        {
          id: 1,
          name: 'Paper Costs - Cafeterias',
        },
      ],
    }
  },
  computed: {
    leftToDistribute() {
      const totalAmount = this.items.reduce((prev, current) => {
        return Number(prev) + Number(current.amount)
      }, 0)

      return this.totalPettyCash - totalAmount
    },
  },
  methods: {
    addRow() {
      this.items.push({
        id: this.items.length,
        amount: '',
      })
    },
    deleteRow(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    selectGLAccount(id, glAccount) {
      this.items = this.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            glAccount,
          }
        }

        return { ...item }
      })
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
</style>
