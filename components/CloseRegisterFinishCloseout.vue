<template>
  <div>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title>Actual Cash Deposit</template>

          <template #input>
            <CustomInput
              v-model="actualCashDeposit"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Calculated Cash Deposit</template>

          <template #input>
            <CustomInput
              v-model="calculatedCashDeposit"
              placeholder="$0.00"
              disabled
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Over/Short</template>

          <template #input>
            <CustomInput v-model="overShort" placeholder="$0.00" disabled />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Customer Count - Breakfast</template>

          <template #input>
            <CustomInput
              v-model="customerCountBreakfast"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Net Sales - Breakfast</template>

          <template #input>
            <CustomInput
              v-model="netSalesBreakfast"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Customer Count - Lunch</template>

          <template #input>
            <CustomInput
              v-model="customerCountLunch"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Net Sales - Lunch</template>

          <template #input>
            <CustomInput
              v-model="netSalesLunch"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Customer Count - Dinner</template>

          <template #input>
            <CustomInput
              v-model="customerCountDinner"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Net Sales - Dinner</template>

          <template #input>
            <CustomInput
              v-model="netSalesDinner"
              placeholder="$0.00"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Customer Count - Totals</template>

          <template #input>
            <CustomInput
              v-model="customerCountTotals"
              placeholder="$0.00"
              disabled
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Net Sales - Totals</template>

          <template #input>
            <CustomInput
              v-model="netSalesTotals"
              placeholder="$0.00"
              disabled
            />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

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
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'CloseRegisterFinishCloseout',
  components: { InputRow, InputWithTitle, CustomInput, ValidationObserver },
  mixins: [formMixin],
  data() {
    return {
      actualCashDeposit: '',
      calculatedCashDeposit: '',
      overShort: '',
      customerCountBreakfast: '',
      customerCountLunch: '',
      netSalesBreakfast: '',
      netSalesLunch: '',
      customerCountDinner: '',
      netSalesDinner: '',
      customerCountTotals: '',
      netSalesTotals: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
