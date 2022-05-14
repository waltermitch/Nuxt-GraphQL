<template>
  <ValidationObserver ref="form">
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Quantity</span>

          <span>Menu Item</span>

          <span>Unit Price</span>

          <span>Ext</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow v-for="item in items" :key="item.id" class="table-row">
          <CustomInput
            v-model="item.quantity"
            do-not-show-error-message
            rules="required|numeric"
          />

          <CustomInput
            v-model="item.name"
            do-not-show-error-message
            rules="required"
          />

          <CustomInput
            v-model="item.price"
            rules="required|currency"
            do-not-show-error-message
            placeholder="$0.00"
          />

          <CustomInput
            v-model="item.ext"
            rules="required|currency"
            do-not-show-error-message
            placeholder="$0.00"
          />

          <img
            src="~assets/images/icons/home/delete.svg"
            class="icon"
            @click="deleteRow(item.id)"
          />
        </CustomTableRow>

        <CustomTableRow class="table-row add-row">
          <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
        </CustomTableRow>

        <CustomTableRow class="table-footer table-row">
          <span class="table-footer-caption">Price</span>

          <span class="table-footer-item">$0.00</span>
        </CustomTableRow>

        <CustomTableRow class="table-footer table-row">
          <span class="table-footer-caption">Tax</span>

          <CustomInput
            v-model="tax"
            placeholder="$0.00"
            do-not-show-error-message
            rules="required|currency"
          />
        </CustomTableRow>

        <CustomTableRow class="table-footer table-row">
          <span class="table-footer-caption">Total</span>

          <span class="table-footer-item">$0.00</span>
        </CustomTableRow>
      </template>
    </CustomTable>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Save
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent"
        >Cancel</DefaultButton
      >
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
import CustomTableRow from './CustomTableRow.vue'
import DefaultButton from './DefaultButton.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
export default {
  name: 'CateringSalesItems',
  components: {
    CustomTable,
    CustomInput,
    CustomTableRow,
    DefaultButton,
    ValidationObserver,
    CustomTableAddIcon,
  },
  mixins: [formMixin, tableActionsMixin],
  data() {
    return {
      items: [
        {
          id: 0,
          quantity: 1,
          name: 'Item Name',
          price: '$0.00',
          ext: '$0.00',
        },
        {
          id: 1,
          quantity: '',
          name: '',
          price: '',
          ext: '',
        },
        {
          id: 2,
          quantity: '',
          name: '',
          price: '',
          ext: '',
        },
      ],
      tax: '',
    }
  },
  methods: {
    deleteRow(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    // addRow() {
    //   this.items.push({
    //     id: this.items.length,
    //     amount: '',
    //     name: '',
    //     price: '',
    //     ext: '',
    //   })
    // },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 207px 326px 194px 230px 20px;
  column-gap: 20px;
}

.table-footer {
  height: 63px;

  &:last-child {
    border: none;
  }

  &-caption {
    grid-column: 3;
  }

  &-item {
    grid-column: 4;
  }
}

.buttons-area {
  margin-top: 40px;

  button:first-child {
    margin-right: 11px;
  }
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 5;
  }
}
</style>
