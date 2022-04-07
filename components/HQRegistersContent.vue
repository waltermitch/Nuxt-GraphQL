<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <CustomSelect :options="mockedUnits" @input="selectUnit" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Name </template>

          <template #input>
            <CustomInput v-model="unitName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <CustomTable>
        <template #header>
          <div class="table-row">
            <span>ID</span>

            <span>Name</span>

            <span>Type</span>

            <span>Reg Bank</span>

            <span>Non-Resettable</span>

            <span>Commission</span>

            <span>Active</span>

            <span>Reset Non-Resettable</span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="item in units"
            :key="item.id"
            class="table-row"
          >
            <span>
              {{ item.unitID }}
            </span>

            <span>
              {{ item.name }}
            </span>

            <CustomSelect :options="item.type" @input="selectUnitsType" />

            <span>
              {{ item.regBank }}
            </span>

            <span>
              {{ item.nonResettable }}
            </span>

            <span>
              {{ item.commission }}
            </span>

            <CustomRadioButton
              :is-active="item.active"
              @set-is-active="setIsActive(item)"
            />

            <CustomRadioButton
              :is-active="item.resetNonResettable"
              @set-is-active="setResetNonResettable(item)"
            />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import CustomTable from './CustomTable.vue'
import CustomRadioButton from './CustomRadioButton.vue'
export default {
  name: 'HQRegistersContent',
  components: {
    PageContentWrapper,
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomSelect,
    CustomInput,
    CustomTable,
    CustomRadioButton,
  },
  data() {
    return {
      unit: '',
      unitName: '',
      mockedUnits: [
        {
          id: 0,
          value: 101,
          name: '101',
        },
        {
          id: 1,
          value: 102,
          name: '102',
        },
      ],
      units: [
        {
          id: 0,
          unitID: '#001',
          name: 'Register #001',
          type: [
            {
              id: 0,
              value: 'cafeteria',
              name: 'Cafeteria',
            },
          ],
          regBank: '$250.00',
          nonResettable: '$822.34',
          commission: '0%',
          active: true,
          resetNonResettable: false,
        },
        {
          id: 1,
          unitID: '#002',
          name: 'Register #002',
          type: [
            {
              id: 0,
              value: 'cafeteria',
              name: 'Cafeteria',
            },
          ],
          regBank: '$250.00',
          nonResettable: '$822.34',
          commission: '0%',
          active: true,
          resetNonResettable: false,
        },
        {
          id: 2,
          unitID: '#003',
          name: 'Register #003',
          type: [
            {
              id: 0,
              value: 'cafeteria',
              name: 'Cafeteria',
            },
          ],
          regBank: '$250.00',
          nonResettable: '$822.34',
          commission: '0%',
          active: true,
          resetNonResettable: false,
        },
      ],
    }
  },
  methods: {
    selectUnit(unit) {
      this.unit = unit
    },
    selectUnitsType(item) {},
    setIsActive(item) {
      this.units = this.units.map((unit) => {
        if (item.id === unit.id) {
          return {
            ...unit,
            active: !unit.active,
          }
        }

        return unit
      })
    },
    setResetNonResettable(item) {
      this.units = this.units.map((unit) => {
        if (item.id === unit.id) {
          return {
            ...unit,
            resetNonResettable: !unit.resetNonResettable,
          }
        }

        return unit
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 35px 150px 200px repeat(2, 120px) 85px 60px 150px;
  column-gap: 20px;
}
</style>
