<template>
  <ValidationObserver ref="form" v-slot="{ invalid, pristine }" class="content">
    <InputRow>
      <InputWithTitle>
        <template #title>New Non-Resettable</template>

        <template #input>
          <CustomInput
            v-model.number="nonResetable"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
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
            v-model.number="netOV"
            rules="currency|required"
            type="number"
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
            v-model.number="netCharge"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Tax From The Tape</template>

        <template #input>
          <CustomInput
            v-model.number="taxFromTheTape"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Net Voucher</template>

        <template #input>
          <CustomInput
            v-model.number="netVoucher"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Overring/Void Tax</template>

        <template #input>
          <CustomInput
            v-model.number="overringVoidTax"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
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
            v-model.number="chargeTax"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>- Voucher Tax</template>

        <template #input>
          <CustomInput
            v-model.number="voucherTax"
            rules="currency|required"
            placeholder="$0.00"
            type="number"
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
      <DefaultButton
        button-color-gamma="red"
        :disabled="invalid"
        @event="nextTab"
      >
        Continue
      </DefaultButton>

      <DefaultButton
        button-color-gamma="white"
        :disabled="pristine && !getIsEdit"
        @event="getIsEdit ? cancelEdit() : cancelCreate()"
      >
        Cancel
      </DefaultButton>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import InputRow from './InputRow.vue'
import CustomInput from './CustomInput'
import { closeRegisterMixin } from '~/mixins/closeRegisterMixin'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
import { meMixin } from '~/mixins/meMixin'
export default {
  name: 'SalesInfo',
  components: { ValidationObserver, InputRow, CustomInput },
  mixins: [closeRegisterMixin, tabsViewMixin, meMixin],
  computed: {
    nonResetable: {
      get() {
        return this.getNonResetable
      },
      set(value) {
        this.$store.dispatch('closeRegister/setNonResetable', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    netTotal: {
      get() {
        return this.getNetTotal
      },
      set(value) {
        this.$store.commit('closeRegister/SET_NET_TOTAL', value)
      },
    },
    lastNonResetable: {
      get() {
        return this.getLastNonResetable
      },
      set(value) {
        this.$store.commit('closeRegister/SET_LAST_NON_RESETTABLE', value)
      },
    },
    netOV: {
      get() {
        return this.getNetOV
      },
      set(value) {
        this.$store.dispatch('closeRegister/setNetOV', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    totalToDistribute: {
      get() {
        return this.getTotalToDistribute
      },
      set(value) {
        this.$store.commit('closeRegister/SET_TOTAL_TO_DISTRIBUTE', value)
      },
    },
    netCharge: {
      get() {
        return this.getNetCharge
      },
      set(value) {
        this.$store.dispatch('closeRegister/setNetCharge', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    taxFromTheTape: {
      get() {
        return this.getTaxFromTheTape
      },
      set(value) {
        this.$store.dispatch('closeRegister/setTaxFromTheTape', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    netVoucher: {
      get() {
        return this.getNetVoucher
      },
      set(value) {
        this.$store.dispatch('closeRegister/setNetVoucher', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    overringVoidTax: {
      get() {
        return this.getOverringVoidTax
      },
      set(value) {
        this.$store.dispatch('closeRegister/setOverringTax', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    netCash: {
      get() {
        return this.getNetCash
      },
      set(value) {
        this.$store.commit('closeRegister/SET_NET_CASH', value)
      },
    },
    chargeTax: {
      get() {
        return this.getChargeTax
      },
      set(value) {
        this.$store.dispatch('closeRegister/setChargeTax', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    voucherTax: {
      get() {
        return this.getVoucherTax
      },
      set(value) {
        this.$store.dispatch('closeRegister/setVoucherTax', {
          ...this.calculationVariables,
          value,
        })
      },
    },
    cashTax: {
      get() {
        return this.getCashTax
      },
      set(value) {
        this.$store.commit('closeRegister/SET_CASH_TAX', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
