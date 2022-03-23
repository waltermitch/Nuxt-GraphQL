<template>
  <div class="content">
    <PageSubheader>
      <PageSubheaderItem>
        <template #title>398</template>

        <template #subtitle>Unit Number</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>09/21/2019</template>

        <template #subtitle>Period End</template>
      </PageSubheaderItem>
    </PageSubheader>

    <PageContentWrapper>
      <InputRow>
        <InputWithTitle>
          <template #title>Expense Date</template>

          <template #input>
            <CustomInput v-model="expensesDate" placeholder="mm/dd/yyyy" />
          </template>
        </InputWithTitle>

        <InputWithTitle class="radio-buttons-row">
          <template #title>Expense Type</template>

          <template #input>
            <div class="radio-buttons-area">
              <CustomRadioButton
                with-title
                border-radius="50%"
                radio-border-radius="50%"
                :is-active="expensesType === 'transfer slip'"
                @set-is-active="setExpensesType('transfer slip')"
              >
                Transfer Slip
              </CustomRadioButton>

              <CustomRadioButton
                with-title
                border-radius="50%"
                radio-border-radius="50%"
                :is-active="expensesType === 'shipping ticket'"
                @set-is-active="setExpensesType('shipping ticket')"
              >
                Shipping Ticket
              </CustomRadioButton>

              <CustomRadioButton
                with-title
                border-radius="50%"
                radio-border-radius="50%"
                :is-active="expensesType === 'other'"
                @set-is-active="setExpensesType('other')"
              >
                Other
              </CustomRadioButton>
            </div>
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>GL Account</template>

          <template #input>
            <CustomSelect :options="mockedList" @input="selectGlAccount" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Amount</template>

          <template #input>
            <CustomInput v-model="amount" placeholder="$0.00" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Comments</template>

          <template #input>
            <CustomTextarea v-model="comments" name="comments" />
          </template>
        </InputWithTitle>
      </InputRow>

      <div class="buttons-area">
        <DefaultButton button-color-gamma="red" @event="acceptEvent">
          Accept
        </DefaultButton>

        <DefaultButton button-color-gamma="white" @event="cancelEvent">
          Cancel
        </DefaultButton>
      </div>
    </PageContentWrapper>
  </div>
</template>

<script>
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTextarea from './CustomTextarea.vue'
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'ExpensesContent',
  components: {
    PageSubheader,
    PageSubheaderItem,
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomInput,
    CustomRadioButton,
    CustomSelect,
    CustomTextarea,
    DefaultButton,
  },
  data() {
    return {
      expensesDate: '',
      expensesType: '',
      glAccount: '',
      amount: '',
      comments: '',
      // TODO remove when API would be available
      mockedList: [
        {
          id: 1,
          name: 'Register #2',
        },
        {
          id: 2,
          name: 'Register #3',
        },
      ],
    }
  },
  methods: {
    setExpensesType(expensesType) {
      this.expensesType = this.expensesType === expensesType ? '' : expensesType
    },
    acceptEvent() {},
    cancelEvent() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    selectGlAccount(account) {
      this.glAccount = account
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  div.subheader {
    justify-content: flex-start;

    div {
      margin-right: 120px;
    }
  }
}

.radio-buttons {
  &-row {
    position: relative;
  }

  &-area {
    position: absolute;
    top: 30px;

    div.container {
      margin-bottom: 18px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.buttons-area {
  display: flex;
  margin-top: 30px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
