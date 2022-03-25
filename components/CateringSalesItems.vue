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
          <CustomInput v-model="item.quantity" rules="required|numeric" />

          <CustomInput v-model="item.name" rules="required" />

          <CustomInput v-model="item.price" rules="required|currency" />

          <CustomInput v-model="item.ext" rules="required|currency" />
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
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
import CustomTableRow from './CustomTableRow.vue'
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'CateringSalesItems',
  components: {
    CustomTable,
    CustomInput,
    CustomTableRow,
    DefaultButton,
    ValidationObserver,
  },
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
    saveEvent() {
      this.$refs.form.reset()
      this.$refs.form.validate()
    },
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
  grid-template-columns: 207px 346px 194px 260px;
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
</style>
