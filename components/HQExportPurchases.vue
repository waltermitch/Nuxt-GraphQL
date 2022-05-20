<template>
  <PageContentWrapper>
    <div class="input">
      <InputWithTitle>
        <template #title>Period End Date</template>

        <template #input>
          <CustomSelect :options="mockedData" @input="selectPeriodEndDate" />
        </template>
      </InputWithTitle>
    </div>

    <CustomTable>
      <template #header>
        <div class="table-row">
          <CustomRadioButton
            :is-active="selectAllUnits"
            @set-is-active="setSelectAllUnits()"
          />

          <span> Select </span>

          <span> Unit </span>
        </div>
      </template>

      <template #content>
        <CustomTableRow v-for="item in items" :key="item.id" class="table-row">
          <CustomRadioButton
            :is-active="item.selected"
            @set-is-active="selectItem(item)"
          />

          <span>
            {{ item.unit }}
          </span>

          <span>
            {{ item.name }}
          </span>
        </CustomTableRow>
      </template>
    </CustomTable>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="exportPurchases">
        export purchases
      </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomRadioButton from './CustomRadioButton.vue'
export default {
  name: 'HQExportPurchases',
  components: {
    InputWithTitle,
    CustomSelect,
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomRadioButton,
  },
  data() {
    return {
      periodEndDate: '',
      selectAllUnits: false,
      mockedData: [
        {
          id: 1,
          value: '4/22/2022',
          name: '4/22/2022',
        },
      ],
      items: [
        {
          id: 1,
          unit: 107,
          name: 'Finnegan',
        },
        {
          id: 2,
          unit: 109,
          name: "David's Bridal, Inc.",
        },
      ],
    }
  },
  watch: {
    items() {
      if (this.items.every((item) => item.selected)) {
        this.selectAllUnits = true
      }
    },
  },
  methods: {
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    setSelectAllUnits() {
      this.items = this.items.map((item) => {
        return {
          ...item,
          selected: !this.selectAllUnits,
        }
      })
      this.selectAllUnits = !this.selectAllUnits
    },
    selectItem(unit) {
      this.selectAllUnits = false
      this.items = this.items.map((item) => {
        if (unit.id === item.id) {
          return {
            ...item,
            selected: !item.selected,
          }
        }

        return item
      })
    },
    exportPurchases() {
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 20px;
  @media screen and (min-width: $md) {
    grid-template-columns: 40px 150px 320px;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 40px 120px 120px;
  }
}

.input {
  margin-bottom: 30px;
}

.buttons-area {
  margin-top: 32px;
}
</style>
