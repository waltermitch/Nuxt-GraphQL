<template>
  <div class="content">
    <InputRow>
      <InputWithTitle>
        <template #title>New Non-Resettable</template>

        <template #input>
          <CustomInput v-model="newNonResettable" readonly />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Total</template>

        <template #input>
          <CustomInput v-model="newTotal" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Last Non-Resettable</template>

        <template #input>
          <CustomInput v-model="lastNonResettable" readonly />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net O/V</template>

        <template #input>
          <CustomInput v-model="netOV" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Total To Distribute</template>

        <template #input>
          <CustomInput v-model="totalToDistribute" readonly />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Charge</template>

        <template #input>
          <CustomInput v-model="netCharge" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Tax From The Tape</template>

        <template #input>
          <CustomInput v-model="taxFromTheTape" readonly />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Voucher</template>

        <template #input>
          <CustomInput v-model="netVoucher" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Overring/Void Tax</template>

        <template #input>
          <CustomInput v-model="overringVoidTax" readonly />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Cash</template>

        <template #input>
          <CustomInput v-model="netCash" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Charge Tax</template>

        <template #input>
          <CustomInput v-model="chargeTax" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Voucher Tax</template>

        <template #input>
          <CustomInput v-model="voucherTax" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Cash Tax</template>

        <template #input>
          <CustomInput v-model="cashTax" readonly />
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
      newNonResettable: '$0.00',
      newTotal: '$0.00',
      lastNonResettable: '$0.00',
      netOV: '$0.00',
      totalToDistribute: '$0.00',
      netCharge: '$0.00',
      taxFromTheTape: '$0.00',
      netVoucher: '$0.00',
      overringVoidTax: '$0.00',
      netCash: '$0.00',
      chargeTax: '$0.00',
      voucherTax: '$0.00',
      cashTax: '$0.00',
    }
  },
}
</script>

<style lang="scss" scoped></style>
