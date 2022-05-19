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
      <DefaultButton button-color-gamma="red" @event="closeRegisterOrderAction">
        {{ `${!getIsEdit ? 'Save' : 'Edit'}` }}
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
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import { closeRegisterMixin } from '~/mixins/closeRegisterMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import CreateRegisterCloseout from '~/graphql/mutations/registerCloseout/createRegisterCloseout'
import { formatDateForCloseRegisterAPI } from '~/helpers/helpers'
export default {
  name: 'CloseRegisterFinishCloseout',
  components: { InputRow, InputWithTitle, CustomInput, ValidationObserver },
  mixins: [formMixin, closeRegisterMixin, mutationMixin],
  computed: {
    actualCashDeposit: {
      get() {
        return this.getActualCacheDeposit
      },
      set(value) {
        this.$store.commit('closeRegister/SET_ACTUAL_CACHE_DEPOSIT', value)
      },
    },
    calculatedCashDeposit: {
      get() {
        return this.getCalculatedCacheDeposit
      },
      set(value) {
        this.$store.commit('closeRegister/SET_CALCULATED_CACHE_DEPOSIT', value)
      },
    },
    overShort: {
      get() {
        return this.getOverShort
      },
      set(value) {
        this.$store.commit('closeRegister/SET_OVER_SHORT', value)
      },
    },
    customerCountBreakfast: {
      get() {
        return this.getCustomerCountBreakfast
      },
      set(value) {
        this.$store.commit('closeRegister/SET_CUSTOMER_COUNT_BREAKFAST', value)
      },
    },
    customerCountLunch: {
      get() {
        return this.getCustomerCountLunch
      },
      set(value) {
        this.$store.commit('closeRegister/SET_CUSTOMER_COUNT_LUNCH', value)
      },
    },
    netSalesBreakfast: {
      get() {
        return this.getNetSalesBreakfast
      },
      set(value) {
        this.$store.commit('closeRegister/SET_NET_SALES_BREAKFAST', value)
      },
    },
    netSalesLunch: {
      get() {
        return this.getNetSalesLunch
      },
      set(value) {
        this.$store.commit('closeRegister/SET_NET_SALES_LUNCH', value)
      },
    },
    customerCountDinner: {
      get() {
        return this.getCustomerCountDinner
      },
      set(value) {
        this.$store.commit('closeRegister/SET_CUSTOMER_COUNT_DINNER', value)
      },
    },
    netSalesDinner: {
      get() {
        return this.getNetSalesDinner
      },
      set(value) {
        this.$store.commit('closeRegister/SET_NET_SALES_DINNER', value)
      },
    },
    customerCountTotals: {
      get() {
        return this.getCustomerCountTotals
      },
      set(value) {
        this.$store.commit('closeRegister/SET_CUSTOMER_COUNT_TOTALS', value)
      },
    },
    netSalesTotals: {
      get() {
        return this.getNetSalesTotals
      },
      set(value) {
        this.$store.commit('closeRegister/SET_NET_SALES_TOTALS', value)
      },
    },
  },
  methods: {
    formatDateForCloseRegisterAPI,
    async CreateCloseRegister() {
      await this.mutationAction(
        CreateRegisterCloseout,
        {
          registerCloseoutInput: {
            nonResetable: this.getNonResetable,
            netTotal: this.getNetTotal,
            lastNonResetable: this.getLastNonResetable,
            netOV: this.getNetOV,
            totalToDistribute: this.getTotalToDistribute,
            netCharge: this.getNetCharge,
            taxFromTheTape: this.getTaxFromTheTape,
            netVoucher: this.getNetVoucher,
            overringTax: this.getOverringTax,
            netCash: this.getNetCash,
            chargeTax: this.getChargeTax,
            voucherTax: this.getVoucherTax,
            cashTax: this.getCashTax,
            totalPettyCache: this.getTotalPettyCache,
            actualCacheDeposit: this.getActualCacheDeposit,
            calculatedCacheDeposit: this.getCalculatedCacheDeposit,
            overShort: this.getOverShort,
            customerCountBreakfast: this.getCustomerCountBreakfast,
            netSalesBreakfast: this.getNetSalesBreakfast,
            customerCountLunch: this.getCustomerCountLunch,
            netSalesLunch: this.getNetSalesLunch,
            customerCountDinner: this.getCustomerCountDinner,
            netSalesDinner: this.getNetSalesDinner,
            customerCountTotals: this.getCustomerCountTotals,
            netSalesTotals: this.getNetSalesTotals,
            closeDate: this.formatDateForCloseRegisterAPI(new Date()),
            // TODO ADD When PeriodEnd API will be ready
            periodEnd: this.formatDateForCloseRegisterAPI(new Date()),
            items: {
              create: this.getItems.map((item) => {
                return {
                  glAccountId: Number(item.glAccount.id),
                  amount: item.amount,
                }
              }),
            },
            register: {
              connect: this.getRegister.id,
            },
          },
        },
        'Close Register success',
        'Close Register error'
      )
    },
    UpdateCloseRegister() {},
    closeRegisterOrderAction() {
      this.getIsEdit ? this.UpdateCloseRegister() : this.CreateCloseRegister()
    },
  },
}
</script>

<style lang="scss" scoped></style>
