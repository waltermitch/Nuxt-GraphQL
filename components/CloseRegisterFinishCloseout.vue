<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <InputRow>
        <InputWithTitle>
          <template #title>Actual Cash Deposit</template>

          <template #input>
            <CustomInput
              v-model="actualCashDeposit"
              placeholder="$0.00"
              rules="required|currency"
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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

      <div class="buttons-area">
        <DefaultButton
          button-color-gamma="red"
          :disabled="invalid"
          @event="closeRegisterOrderAction"
        >
          {{ `${!getIsEdit ? 'Save' : 'Edit'}` }}
        </DefaultButton>

        <DefaultButton
          button-color-gamma="white"
          @event="getIsEdit ? cancelEdit() : cancelCreate()"
        >
          Cancel
        </DefaultButton>
      </div>
    </ValidationObserver>
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
import UpdateRegisterCloseout from '~/graphql/mutations/registerCloseout/updateRegisterCloseout'
import RegisterCloseouts from '~/graphql/queries/registerCloseouts'
import { formatDateForCloseRegisterAPI } from '~/helpers/helpers'
import { CLOSE_REGISTER } from '~/constants/closeRegister'
import Me from '~/graphql/queries/me.query.gql'
export default {
  name: 'CloseRegisterFinishCloseout',
  components: { InputRow, InputWithTitle, CustomInput, ValidationObserver },
  mixins: [formMixin, closeRegisterMixin, mutationMixin],
  apollo: {
    me: {
      query: Me,
    },
  },
  computed: {
    actualCashDeposit: {
      get() {
        return this.getActualCashDeposit
      },
      set(value) {
        this.$store.commit('closeRegister/SET_ACTUAL_CACHE_DEPOSIT', value)
      },
    },
    calculatedCashDeposit: {
      get() {
        return this.getCalculatedCashDeposit
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
            overringVoidTax: this.getOverringVoidTax,
            netCash: this.getNetCash,
            chargeTax: this.getChargeTax,
            voucherTax: this.getVoucherTax,
            cashTax: this.getCashTax,
            totalPettyCash: this.getTotalPettyCash,
            actualCashDeposit: this.getActualCashDeposit,
            calculatedCashDeposit: this.getCalculatedCashDeposit,
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
            periodEnd: this.me.selectedUnit.activePeriod.periodEnd,
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
        RegisterCloseouts,
        'Close Register success',
        'Close Register error'
      )
      this.$router.push('/home/close-register')
      // this.$store.commit('closeRegister/SET_CLOSE_REGISTER', CLOSE_REGISTER)
    },
    async UpdateCloseRegister() {
      await this.mutationAction(
        UpdateRegisterCloseout,
        {
          registerCloseoutInput: {
            id: this.getId,
            nonResetable: this.getNonResetable,
            netTotal: this.getNetTotal,
            lastNonResetable: this.getLastNonResetable,
            netOV: this.getNetOV,
            totalToDistribute: this.getTotalToDistribute,
            netCharge: this.getNetCharge,
            taxFromTheTape: this.getTaxFromTheTape,
            netVoucher: this.getNetVoucher,
            overringVoidTax: this.getOverringVoidTax,
            netCash: this.getNetCash,
            chargeTax: this.getChargeTax,
            voucherTax: this.getVoucherTax,
            cashTax: this.getCashTax,
            totalPettyCash: this.getTotalPettyCash,
            actualCashDeposit: this.getActualCashDeposit,
            calculatedCashDeposit: this.getCalculatedCashDeposit,
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
            periodEnd: this.me.selectedUnit.activePeriod.periodEnd,
            items: {
              delete: this.getDeleteItemIDs,
              update: this.getItems
                .filter((item) => item.id)
                .map((item) => {
                  return {
                    id: item.id,
                    glAccountId: Number(item.glAccount.id),
                    amount: String(item.amount),
                  }
                }),
              create: this.getItemsWithoutId.map((itm) => {
                return {
                  glAccountId: Number(itm.glAccount.id),
                  amount: itm.amount,
                }
              }),
            },
          },
        },
        RegisterCloseouts,
        'Close Register success',
        'Close Register error'
      )
      this.$router.push('/review/register-closeout')
      this.$store.commit('closeRegister/SET_IS_EDIT', false)
      this.$store.commit('closeRegister/SET_CLOSE_REGISTER', CLOSE_REGISTER)
    },
    closeRegisterOrderAction() {
      this.getIsEdit ? this.UpdateCloseRegister() : this.CreateCloseRegister()
    },
  },
}
</script>

<style lang="scss" scoped></style>
