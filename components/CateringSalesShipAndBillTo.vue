<template>
  <div>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title>Ship To Name</template>

          <template #input>
            <CustomInput v-model="shipToName" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To Name</template>

          <template #input>
            <CustomInput v-model="billToName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Ship To Address</template>

          <template #input>
            <CustomInput v-model="shipToAddress" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To Address</template>

          <template #input>
            <CustomInput v-model="billToAddress" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="CreateCateringOrder">
        Save
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
import CreateCateringOrder from '../graphql/mutations/cateringOrder/createCateringOrder.gql'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { cateringSalesMixin } from '~/mixins/cateringSalesMixin'
import Me from '~/graphql/queries/me.query.gql'
import { formatDate, formatDateAndTime } from '~/helpers/helpers'
export default {
  name: 'CateringSalesShipAndBillTo',
  components: { InputRow, InputWithTitle, CustomInput, ValidationObserver },
  mixins: [formMixin, mutationMixin, cateringSalesMixin],
  data() {
    return {}
  },
  computed: {
    shipToName: {
      get() {
        return this.getShipToName
      },
      set(value) {
        this.$store.commit('cateringSales/SET_SHIP_TO_NAME', value)
      },
    },
    billToName: {
      get() {
        return this.getBillToName
      },
      set(value) {
        this.$store.commit('cateringSales/SET_BILL_TO_NAME', value)
      },
    },
    shipToAddress: {
      get() {
        return this.getShipToAddress
      },
      set(value) {
        this.$store.commit('cateringSales/SET_SHIP_TO_ADDRESS', value)
      },
    },
    billToAddress: {
      get() {
        return this.getBillToAddress
      },
      set(value) {
        this.$store.commit('cateringSales/SET_BILL_TO_ADDRESS', value)
      },
    },
  },
  methods: {
    formatDate,
    formatDateAndTime,
    async CreateCateringOrder() {
      await this.mutationAction(
        CreateCateringOrder,
        {
          cateringOrderInput: {
            description: this.getDescription,
            deliveryDate: this.formatDateAndTime(this.getDeliveryDate),
            headCount: Number(this.getHeadCount),
            items: {
              create: this.getItems.map((item) => item),
            },
            phoneNumber: this.getPhoneNumber,
            orderBy: this.getOrderBy,
            orderFor: this.getOrderFor,
            orderDate: this.formatDate(this.getOrderDate),
            isTaxable: this.getIsTaxable,
            tax: Number(this.getTax),
            shipToName: this.getShipToName,
            shipToAddress: this.getShipToAddress,
            billToName: this.getBillToName,
            billToAddress: this.getBillToAddress,
            isCashOrder: this.getIsCashOrder,
            chargeNumber: this.getChargeNumber,
          },
        },
        Me,
        'Add unit success',
        'Add unit error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons-area {
  display: flex;
  margin-top: 30px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
