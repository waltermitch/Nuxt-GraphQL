<template>
  <PageContentWrapper>
    <InputWithTitle>
      <template #title> Period End Date </template>

      <template #input>
        <CustomSelect :list="mockedList" placeholder="mm/dd/yyyy" />
      </template>
    </InputWithTitle>

    <div class="table">
      <CustomTable>
        <template #header>
          <div class="table-row">
            <span> PO </span>

            <span> Purchase Date </span>

            <span> Invoice Num </span>

            <span> Vendor Num </span>

            <span> Total </span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="item in items"
            :key="item.id"
            class="table-row table-content-row"
          >
            <span>{{ item.po }}</span>

            <span>{{ item.purchaseDate }}</span>

            <span>{{ item.invoiceNum }}</span>

            <span>{{ item.vendorNum }}</span>

            <span>{{ item.total }}</span>

            <div>
              <img
                class="icon"
                src="~assets/images/icons/review/edit.svg"
                alt=""
              />

              <img
                class="icon"
                src="~assets/images/icons/review/trash-can.svg"
                alt=""
              />
            </div>
          </CustomTableRow>
        </template>
      </CustomTable>
    </div>
  </PageContentWrapper>
</template>

<script>
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
export default {
  name: 'WeeklyPurchasesContent',
  components: { InputWithTitle, CustomSelect, CustomTable, CustomTableRow },
  data() {
    return {
      mockedList: [
        {
          id: 1,
          name: '22/02/2022',
        },
        {
          id: 2,
          name: '22/04/2022',
        },
      ],
      items: [
        {
          id: 0,
          po: 123,
          purchaseDate: 'mm/dd/yyyy',
          invoiceNum: '123',
          vendorNum: '123',
          total: '$0.00',
        },
        {
          id: 1,
          po: 123,
          purchaseDate: 'mm/dd/yyyy',
          invoiceNum: '123',
          vendorNum: '123',
          total: '$0.00',
        },
        {
          id: 2,
          po: 123,
          purchaseDate: 'mm/dd/yyyy',
          invoiceNum: '123',
          vendorNum: '123',
          total: '$0.00',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 30px;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 166px 326px 144px 170px 90px 68px;
  column-gap: 20px;
}

.table-content-row {
  height: 60px;
}

.icon {
  margin-right: 15px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
}
</style>
