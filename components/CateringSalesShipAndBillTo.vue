<template>
  <div>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle max-width="unset">
          <template #title>Ship To Name</template>

          <template #input>
            <CustomTextarea
              v-model="shipToName"
              rules="required"
              name="shipToName"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle max-width="unset">
          <template #title>Bill To Name</template>

          <template #input>
            <CustomTextarea
              v-model="billToName"
              rules="required"
              name="billToName"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle max-width="unset">
          <template #title>Ship To Address</template>

          <template #input>
            <CustomTextarea
              v-model="shipToAddress"
              rules="required"
              name="shipToAddress"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle max-width="unset">
          <template #title>Bill To Address</template>

          <template #input>
            <CustomTextarea
              v-model="billToAddress"
              rules="required"
              name="billToAddress"
            />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="cateringOrderAction">
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
import CreateCateringOrder from '../graphql/mutations/cateringOrder/createCateringOrder.gql'
import UpdateCateringOrder from '../graphql/mutations/cateringOrder/updateCateringOrder.gql'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomTextarea from './CustomTextarea.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { cateringSalesMixin } from '~/mixins/cateringSalesMixin'
import CateringOrders from '~/graphql/queries/cateringOrders.gql'
import { formatDate, formatDateAndTime } from '~/helpers/helpers'
import { CATERING_ORDER } from '~/constants/cateringOrder'
import { meMixin } from '~/mixins/meMixin'
export default {
  name: 'CateringSalesShipAndBillTo',
  components: {
    InputRow,
    InputWithTitle,
    CustomTextarea,
    ValidationObserver,
  },
  mixins: [formMixin, mutationMixin, cateringSalesMixin, meMixin],
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
            periodEnd: this.periodEndDate,
            headCount: Number(this.getHeadCount),
            items: {
              create: this.getItemsWithoutId.map((item) => {
                const { tempId, ...rest } = item
                return rest
              }),
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
        CateringOrders,
        'Add catering order success',
        'Add catering order error'
      )
      this.$store.commit('cateringSales/SET_CATERING_ORDER', CATERING_ORDER)
    },
    async UpdateCateringOrder() {
      await this.mutationAction(
        UpdateCateringOrder,
        {
          cateringOrderInput: {
            id: this.getId,
            description: this.getDescription,
            deliveryDate: this.formatDateAndTime(this.getDeliveryDate),
            periodEnd: this.periodEndDate,
            headCount: Number(this.getHeadCount),
            items: {
              delete: this.getDeleteItemIDs,
              update: this.getItems
                .map((item) => {
                  const { __typename, ...obj } = item

                  return obj
                })
                .filter((item) => item.id),
              create: this.getItemsWithoutId.map((item) => {
                const { tempId, ...rest } = item
                return rest
              }),
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
        CateringOrders,
        'Edit catering order success',
        'Edit catering order error'
      )
      this.$router.push('/review/catering-sales')
    },
    cateringOrderAction() {
      this.getIsEdit ? this.UpdateCateringOrder() : this.CreateCateringOrder()
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
