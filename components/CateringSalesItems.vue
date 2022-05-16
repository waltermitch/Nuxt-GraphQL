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
        <CustomTableRow
          v-for="item in combinedItemsArray"
          :key="item.id"
          class="table-row"
        >
          <CustomInput
            v-model="item.quantity"
            do-not-show-error-message
            rules="required|numeric"
          />

          <CustomInput
            v-model="item.menuItem"
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

          <img src="~assets/images/icons/home/delete.svg" class="icon" />
        </CustomTableRow>

        <CustomTableRow v-if="isAdd" class="table-row">
          <CustomInput
            v-model.number="newItem.quantity"
            do-not-show-error-message
            rules="required|numeric"
          />

          <CustomInput
            v-model="newItem.menuItem"
            do-not-show-error-message
            rules="required"
          />

          <CustomInput
            v-model.number="newItem.price"
            rules="required|currency"
            do-not-show-error-message
            placeholder="$0.00"
          />

          <CustomInput
            v-model.number="newItem.ext"
            rules="required|currency"
            do-not-show-error-message
            placeholder="$0.00"
          />
        </CustomTableRow>

        <CustomTableRow class="table-row add-row">
          <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
        </CustomTableRow>

        <div v-if="isAdd" class="buttons-area add-item-buttons">
          <DefaultButton @event="addItem"> Add Item </DefaultButton>

          <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
        </div>

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
      <DefaultButton button-color-gamma="red" @event="nextTab">
        Continue
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
import { cateringSalesMixin } from '~/mixins/cateringSalesMixin'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
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
  mixins: [formMixin, tableActionsMixin, cateringSalesMixin, tabsViewMixin],
  data() {
    return {
      items: [],
      newItem: {
        quantity: '',
        menuItem: '',
        price: '',
        ext: '',
      },
    }
  },
  computed: {
    combinedItemsArray() {
      return [...this.items, ...this.getItems]
    },
    tax: {
      get() {
        return this.getTax
      },
      set(value) {
        this.$store.commit('cateringSales/SET_TAX', value)
      },
    },
  },
  methods: {
    addItem() {
      if (this.newItem.quantity) {
        this.$store.commit('cateringSales/SET_ITEMS', this.newItem)
      }

      this.isAdd = false
      this.isHide = false
      this.newItem = {
        quantity: '',
        menuItem: '',
        price: '',
        ext: '',
      }
    },
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

.add-item-buttons {
  margin-left: 25px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 5;
  }
}
</style>
