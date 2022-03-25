<template>
  <div class="content">
    <InputRow>
      <InputWithTitle>
        <template #title>New Non-Resettable</template>

        <template #input>
          <CustomInput
            v-model="newNonResettable"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Total</template>

        <template #input>
          <CustomInput v-model="newTotal" readonly disabled />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Last Non-Resettable</template>

        <template #input>
          <CustomInput v-model="lastNonResettable" readonly disabled />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net O/V</template>

        <template #input>
          <CustomInput
            v-model="netOV"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Total To Distribute</template>

        <template #input>
          <CustomInput v-model="totalToDistribute" readonly disabled />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Charge</template>

        <template #input>
          <CustomInput
            v-model="netCharge"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Tax From The Tape</template>

        <template #input>
          <CustomInput
            v-model="taxFromTheTape"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Voucher</template>

        <template #input>
          <CustomInput
            v-model="netVoucher"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Overring/Void Tax</template>

        <template #input>
          <CustomInput
            v-model="overringVoidTax"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Cash</template>

        <template #input>
          <CustomInput v-model="netCash" readonly disabled />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Charge Tax</template>

        <template #input>
          <CustomInput
            v-model="chargeTax"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Voucher Tax</template>

        <template #input>
          <CustomInput
            v-model="voucherTax"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Cash Tax</template>

        <template #input>
          <CustomInput v-model="cashTax" readonly disabled />
        </template>
      </InputWithTitle>
    </InputRow>
  </div>
</template>

<script>
import InputRow from './InputRow.vue'
import CustomInput from './CustomInput'
export default {
  name: 'SalesInfo',
  components: { InputRow, CustomInput },
  data() {
    return {
      newNonResettable: '',
      newTotal: '',
      lastNonResettable: '',
      netOV: '',
      totalToDistribute: '',
      netCharge: '',
      taxFromTheTape: '',
      netVoucher: '',
      overringVoidTax: '',
      netCash: '',
      chargeTax: '',
      voucherTax: '',
      cashTax: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
