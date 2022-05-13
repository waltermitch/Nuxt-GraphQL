<template>
  <div>
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Amount</span>

          <span>Inventory Category</span>

          <span>GL Account</span>

          <span>Ext</span>
        </div>
      </template>

      <template #content>
        <ValidationObserver ref="form">
          <CustomTableRow
            v-for="item in items"
            :key="item.id"
            class="table-row"
          >
            <CustomInput v-model="item.amount" rules="required" />

            <CustomInput v-model="item.inventoryCategory" rules="required" />

            <CustomInput
              v-model="item.glAccount"
              rules="required|currency"
              placeholder="$0.00"
            />

            <CustomInput
              v-model="item.ext"
              rules="required|currency"
              placeholder="$0.00"
            />

            <img
              src="~assets/images/icons/home/delete.svg"
              class="icon"
              @click="deleteRow(item.id)"
            />
          </CustomTableRow>
        </ValidationObserver>

        <CustomTableRow class="table-row add-row">
          <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
        </CustomTableRow>
      </template>
    </CustomTable>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Accept
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
export default {
  name: 'PurchaseOrdersItems',
  components: {
    CustomTable,
    CustomTableRow,
    CustomInput,
    ValidationObserver,
    CustomTableAddIcon,
  },
  mixins: [formMixin, tableActionsMixin],
  data() {
    return {
      items: [
        {
          id: 0,
          amount: '',
          inventoryCategory: '',
          glAccount: '',
          ext: '',
        },
      ],
    }
  },
  methods: {
    // addRow() {
    //   this.items.push({
    //     id: this.items.length,
    //     amount: '',
    //     inventoryCategory: '',
    //     glAccount: '',
    //     ext: '',
    //   })
    // },
    deleteRow(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 206px 345px 192px 213px 20px;
  column-gap: 20px;
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

.buttons-area {
  display: flex;
  margin-top: 50px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
