<template>
  <div class="content">
    <PageSubheader>
      <PageSubheaderItem>
        <template #title>398</template>

        <template #subtitle>Unit Number</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>09/21/2019</template>

        <template #subtitle>Period End</template>
      </PageSubheaderItem>
    </PageSubheader>

    <PageContentWrapper>
      <CustomTable>
        <template #header>
          <div class="table-row">
            <span>Category</span>

            <span>Name</span>

            <span>Previous Amount</span>

            <span>Current Amount</span>
          </div>
        </template>

        <template #content>
          <ValidationObserver ref="form">
            <CustomTableRow
              v-for="item in items"
              :key="item.id"
              class="table-row"
            >
              <span class="table-text">
                {{ item.category }}
              </span>

              <span class="table-text">
                {{ item.name }}
              </span>

              <span class="table-text"> ${{ item.previousAmount }} </span>

              <CustomInput
                v-model="item.currentAmount"
                rules="required|currency"
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
        <DefaultButton button-color-gamma="red" @event="saveEvent">
          Save
        </DefaultButton>

        <DefaultButton button-color-gamma="white" @event="cancelEvent"
          >Cancel</DefaultButton
        >
      </div>
    </PageContentWrapper>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
export default {
  name: 'InventoryContent',
  components: {
    PageSubheader,
    PageSubheaderItem,
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    ValidationObserver,
  },
  mixins: [formMixin],
  data() {
    return {
      totalPreviousAmount: '75.00',
      items: [
        {
          id: 0,
          category: 'Lorem ipsum',
          name: 'Lorem ipsum',
          previousAmount: '15.00',
          currentAmount: '',
        },
        {
          id: 1,
          category: 'Lorem ipsum',
          name: 'Lorem ipsum',
          previousAmount: '25.00',
          currentAmount: '',
        },
        {
          id: 2,
          category: 'Lorem ipsum',
          name: 'Lorem ipsum',
          previousAmount: '35.00',
          currentAmount: '',
        },
      ],
    }
  },
  computed: {
    totalCurrentValue() {
      return this.items.reduce((prev, current) => {
        return Number(prev) + Number(current.currentAmount)
      }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  div.subheader {
    justify-content: flex-start;

    div {
      margin-right: 120px;
    }
  }
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 207px 346px 194px 215px;
  column-gap: 20px;
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
