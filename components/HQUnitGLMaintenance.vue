<template>
  <PageContentWrapper>
    <ValidationObserver>
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <CustomSelect :options="units" @input="selectUnit" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Name </template>

          <template #input>
            <CustomInput v-model="unit.unitName" />
          </template>
        </InputWithTitle>
      </InputRow>

      <CustomTable class="table">
        <template #header>
          <div class="table-row">
            <span>GL</span>

            <span>Sub</span>

            <span>Name</span>

            <span>Type</span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="item in unitRecords"
            :key="item.id"
            class="table-row"
          >
            <CustomSelect
              :options="item.glAccounts"
              @input="selectGlAccountUnit"
            />

            <CustomSelect
              :options="item.subAccounts"
              @input="selectSubAccountUnit"
            />

            <span>
              {{ item.name }}
            </span>

            <span>
              {{ item.type }}
            </span>
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
export default {
  name: 'HQUnitGLMaintenance',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputWithTitle,
    InputRow,
    CustomSelect,
    CustomInput,
    CustomTable,
    CustomTableRow,
  },
  mixins: [formMixin],
  data() {
    return {
      unit: '',
      units: [
        {
          id: 0,
          value: '101',
          name: '101',
          unitName: 'Drinker',
        },
        {
          id: 1,
          value: '102',
          name: '102',
          unitName: 'Biddle',
        },
      ],
      unitRecords: [
        {
          id: 0,
          glAccounts: [
            {
              id: 1,
              value: '4200',
              name: '4200',
            },
            {
              id: 2,
              value: '4300',
              name: '4300',
            },
          ],
          subAccounts: [
            {
              id: 1,
              value: '001',
              name: '001',
            },
          ],
          name: 'Sales - Cafeteria Manual',
          type: 'sales',
        },
        {
          id: 1,
          glAccounts: [
            {
              id: 1,
              value: '5000',
              name: '5000',
            },
            {
              id: 2,
              value: '5300',
              name: '5300',
            },
          ],
          subAccounts: [
            {
              id: 1,
              value: '002',
              name: '002',
            },
          ],
          name: 'Food costs - Cafeteria',
          type: 'expense',
        },
      ],
    }
  },
  methods: {
    selectUnit(item) {
      this.unit = item
    },
    selectGlAccountUnit(item) {},
    selectSubAccountUnit(item) {},
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: fit-content;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 80px 80px 300px 80px;
  column-gap: 30px;
}
</style>
