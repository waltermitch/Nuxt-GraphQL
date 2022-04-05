<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title> Primary Unit </template>

          <template #input>
            <CustomSelect
              :options="primaryUnitsList"
              :error="selectError"
              @input="selectPrimaryUnit"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Name </template>

          <template #input>
            <CustomInput v-model="unitName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <CustomTable class="table">
        <template #header>
          <div class="table-row">
            <span> Reset </span>

            <span> Register Id </span>

            <span> Name </span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="item in items"
            :key="item.id"
            class="table-row"
          >
            <CustomRadioButton
              :is-active="item.isReset"
              @set-is-active="setIsReset(item)"
            />

            <span>
              {{ item.registerId }}
            </span>

            <span>
              {{ item.name }}
            </span>
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div class="button-area">
      <DefaultButton button-color-gamma="red" @event="sendUpdate">
        Send Update
      </DefaultButton>
    </div>
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
import CustomRadioButton from './CustomRadioButton.vue'
import CustomTableRow from './CustomTableRow.vue'
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'HQSendUnitUpdateContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomSelect,
    CustomInput,
    CustomTable,
    CustomRadioButton,
    CustomTableRow,
    DefaultButton,
  },
  mixins: [formMixin],
  data() {
    return {
      primaryUnit: '',
      unitName: '',
      selectError: false,
      primaryUnitsList: [
        {
          id: 0,
          value: '105',
          name: '105',
        },
      ],
      items: [
        {
          id: 0,
          registerId: 'REG #1',
          name: 'Register #1',
        },
        {
          id: 1,
          registerId: 'REG #2',
          name: 'Register #2',
        },
      ],
    }
  },
  methods: {
    selectPrimaryUnit(unit) {
      this.primaryUnit = unit
    },
    setIsReset(registerItem) {
      this.items = this.items.map((item) => {
        if (registerItem.id === item.id) {
          return {
            ...item,
            isReset: !item.isReset,
          }
        }

        return item
      })
    },
    sendUpdate() {
      if (!this.primaryUnit) {
        this.selectError = true
      }

      this.saveEvent()
    },
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
  grid-template-columns: 50px 150px 200px;
  column-gap: 20px;
}

.button-area {
  margin-top: 36px;
}
</style>
