<template>
  <div class="content">
    <InputRow>
      <InputWithTitle>
        <template #title>New Non-Resettable</template>

        <template #input>
          <CustomInput
            v-model="nonResetable"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Total</template>

        <!-- TODO PECZIS Calculations-->
        <template #input>
          <CustomInput v-model="netTotal" readonly disabled />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Last Non-Resettable</template>

        <!-- TODO PECZIS Calculations-->
        <template #input>
          <CustomInput v-model="lastNonResetable" readonly disabled />
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

        <!-- TODO PECZIS Calculations-->
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
            v-model="overringTax"
            rules="currency|required"
            placeholder="$0.00"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Cash</template>

        <!-- TODO PECZIS Calculations-->
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

        <!-- TODO PECZIS Calculations-->
        <template #input>
          <CustomInput v-model="cashTax" readonly disabled />
        </template>
      </InputWithTitle>
    </InputRow>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="nextTab">
        Continue
      </DefaultButton>

      <DefaultButton
        button-color-gamma="white"
        @event="getIsEdit ? cancelEdit() : cancelCreate()"
      >
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import InputRow from './InputRow.vue'
import CustomInput from './CustomInput'
import { closeRegisterMixin } from '~/mixins/closeRegisterMixin'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
export default {
  name: 'SalesInfo',
  components: { InputRow, CustomInput },
  mixins: [closeRegisterMixin, tabsViewMixin],
  computed: {
    nonResetable: {
      get() {
        return this.getNonResetable
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_NON_RESETABLE', value)
      },
    },
    netTotal: {
      get() {
        return this.getNetTotal
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_NET_TOTAL', value)
      },
    },
    lastNonResetable: {
      get() {
        return this.getLastNonResetable
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_LAST_NON_RESETABLE', value)
      },
    },
    netOV: {
      get() {
        return this.getNetOV
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_NET_OV', value)
      },
    },
    totalToDistribute: {
      get() {
        return this.getTotalToDistribute
      },
      set(value) {
        return this.$store.commit(
          'closeRegister/SET_TOTAL_TO_DISTRIBUTE',
          value
        )
      },
    },
    netCharge: {
      get() {
        return this.getNetCharge
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_NET_CHARGE', value)
      },
    },
    taxFromTheTape: {
      get() {
        return this.getTaxFromTheTape
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_TAX_FROM_THE_TAPE', value)
      },
    },
    netVoucher: {
      get() {
        return this.getNetVoucher
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_NET_VOUCHER', value)
      },
    },
    overringTax: {
      get() {
        return this.getOverringTax
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_OVERRING_TAX', value)
      },
    },
    netCash: {
      get() {
        return this.getNetCash
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_NET_CASH', value)
      },
    },
    chargeTax: {
      get() {
        return this.getChargeTax
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_CHARGE_TAX', value)
      },
    },
    voucherTax: {
      get() {
        return this.getVoucherTax
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_VOUCHER_TAX', value)
      },
    },
    cashTax: {
      get() {
        return this.getCashTax
      },
      set(value) {
        return this.$store.commit('closeRegister/SET_CASH_TAX', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
